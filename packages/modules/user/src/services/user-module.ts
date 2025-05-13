import {
  Context,
  DAL,
  InferEntityType,
  InternalModuleDeclaration,
  ModulesSdkTypes,
  UserTypes,
} from "@vikrai/framework/types"
import {
  arrayDifference,
  CommonEvents,
  EmitEvents,
  generateEntityId,
  InjectManager,
  InjectTransactionManager,
  vikraiContext,
  vikraiError,
  vikraiService,
  moduleEventBuilderFactory,
  Modules,
  UserEvents,
} from "@vikrai/framework/utils"
import jwt, { JwtPayload } from "jsonwebtoken"
import crypto from "node:crypto"

import { Invite, User } from "@models"

type InjectedDependencies = {
  baseRepository: DAL.RepositoryService
  userService: ModulesSdkTypes.IvikraiInternalService<any>
  inviteService: ModulesSdkTypes.IvikraiInternalService<any>
}

const DEFAULT_VALID_INVITE_DURATION_SECONDS = 60 * 60 * 24
export default class UserModuleService
  extends vikraiService<{
    User: {
      dto: UserTypes.UserDTO
    }
    Invite: {
      dto: UserTypes.InviteDTO
    }
  }>({ User, Invite })
  implements UserTypes.IUserModuleService
{
  protected baseRepository_: DAL.RepositoryService

  protected readonly userService_: ModulesSdkTypes.IvikraiInternalService<
    InferEntityType<typeof User>
  >
  protected readonly inviteService_: ModulesSdkTypes.IvikraiInternalService<
    InferEntityType<typeof Invite>
  >
  protected readonly config: { jwtSecret: string; expiresIn: number }

  constructor(
    { userService, inviteService, baseRepository }: InjectedDependencies,
    protected readonly moduleDeclaration: InternalModuleDeclaration
  ) {
    // @ts-ignore
    super(...arguments)

    this.baseRepository_ = baseRepository
    this.userService_ = userService
    this.inviteService_ = inviteService
    this.config = {
      jwtSecret: moduleDeclaration["jwt_secret"],
      expiresIn:
        parseInt(moduleDeclaration["valid_duration"]) ||
        DEFAULT_VALID_INVITE_DURATION_SECONDS,
    }

    if (!this.config.jwtSecret) {
      throw new vikraiError(
        vikraiError.Types.INVALID_DATA,
        "No jwt_secret was provided in the UserModule's options. Please add one."
      )
    }
  }

  @InjectTransactionManager()
  async validateInviteToken(
    token: string,
    @vikraiContext() sharedContext: Context = {}
  ): Promise<UserTypes.InviteDTO> {
    const jwtSecret = this.moduleDeclaration["jwt_secret"]
    const decoded: JwtPayload = jwt.verify(token, jwtSecret, { complete: true })

    const invite = await this.inviteService_.retrieve(
      decoded.payload.id,
      {},
      sharedContext
    )

    if (invite.expires_at < new Date()) {
      throw new vikraiError(
        vikraiError.Types.INVALID_DATA,
        "The invite has expired"
      )
    }

    return await this.baseRepository_.serialize<UserTypes.InviteDTO>(invite, {
      populate: true,
    })
  }

  @InjectManager()
  @EmitEvents()
  async refreshInviteTokens(
    inviteIds: string[],
    @vikraiContext() sharedContext: Context = {}
  ): Promise<UserTypes.InviteDTO[]> {
    const invites = await this.refreshInviteTokens_(inviteIds, sharedContext)

    moduleEventBuilderFactory({
      eventName: UserEvents.INVITE_TOKEN_GENERATED,
      source: Modules.USER,
      action: "token_generated",
      object: "invite",
    })({
      data: invites,
      sharedContext,
    })

    return await this.baseRepository_.serialize<UserTypes.InviteDTO[]>(
      invites,
      {
        populate: true,
      }
    )
  }

  @InjectTransactionManager()
  async refreshInviteTokens_(
    inviteIds: string[],
    @vikraiContext() sharedContext: Context = {}
  ) {
    const [invites, count] = await this.inviteService_.listAndCount(
      { id: inviteIds },
      {},
      sharedContext
    )

    if (count !== inviteIds.length) {
      const missing = arrayDifference(
        inviteIds,
        invites.map((invite) => invite.id)
      )

      if (missing.length > 0) {
        throw new vikraiError(
          vikraiError.Types.INVALID_DATA,
          `The following invites do not exist: ${missing.join(", ")}`
        )
      }
    }

    const updates = invites.map((invite) => {
      return {
        id: invite.id,
        expires_at: new Date(Date.now() + this.config.expiresIn * 1000),
        token: this.generateToken({ id: invite.id, email: invite.email }),
      }
    })

    return await this.inviteService_.update(updates, sharedContext)
  }

  // @ts-expect-error
  createUsers(
    data: UserTypes.CreateUserDTO[],
    sharedContext?: Context
  ): Promise<UserTypes.UserDTO[]>
  // @ts-expect-error
  createUsers(
    data: UserTypes.CreateUserDTO,
    sharedContext?: Context
  ): Promise<UserTypes.UserDTO>

  @InjectManager()
  @EmitEvents()
  // @ts-expect-error
  async createUsers(
    data: UserTypes.CreateUserDTO[] | UserTypes.CreateUserDTO,
    @vikraiContext() sharedContext: Context = {}
  ): Promise<UserTypes.UserDTO | UserTypes.UserDTO[]> {
    const input = Array.isArray(data) ? data : [data]

    const users = await this.userService_.create(input, sharedContext)

    const serializedUsers = await this.baseRepository_.serialize<
      UserTypes.UserDTO[] | UserTypes.UserDTO
    >(users, {
      populate: true,
    })

    moduleEventBuilderFactory({
      eventName: UserEvents.USER_CREATED,
      source: Modules.USER,
      action: CommonEvents.CREATED,
      object: "user",
    })({
      data: serializedUsers,
      sharedContext,
    })

    return Array.isArray(data) ? serializedUsers : serializedUsers[0]
  }

  // @ts-expect-error
  updateUsers(
    data: UserTypes.UpdateUserDTO[],
    sharedContext?: Context
  ): Promise<UserTypes.UserDTO[]>
  // @ts-expect-error
  updateUsers(
    data: UserTypes.UpdateUserDTO,
    sharedContext?: Context
  ): Promise<UserTypes.UserDTO>

  @InjectManager()
  @EmitEvents()
  // @ts-expect-error
  async updateUsers(
    data: UserTypes.UpdateUserDTO | UserTypes.UpdateUserDTO[],
    @vikraiContext() sharedContext: Context = {}
  ): Promise<UserTypes.UserDTO | UserTypes.UserDTO[]> {
    const input = Array.isArray(data) ? data : [data]

    const updatedUsers = await this.userService_.update(input, sharedContext)

    const serializedUsers = await this.baseRepository_.serialize<
      UserTypes.UserDTO[]
    >(updatedUsers, {
      populate: true,
    })

    moduleEventBuilderFactory({
      eventName: UserEvents.USER_UPDATED,
      source: Modules.USER,
      action: CommonEvents.UPDATED,
      object: "user",
    })({
      data: serializedUsers,
      sharedContext,
    })

    return Array.isArray(data) ? serializedUsers : serializedUsers[0]
  }

  // @ts-expect-error
  createInvites(
    data: UserTypes.CreateInviteDTO[],
    sharedContext?: Context
  ): Promise<UserTypes.InviteDTO[]>
  // @ts-expect-error
  createInvites(
    data: UserTypes.CreateInviteDTO,
    sharedContext?: Context
  ): Promise<UserTypes.InviteDTO>

  @InjectManager()
  @EmitEvents()
  // @ts-expect-error
  async createInvites(
    data: UserTypes.CreateInviteDTO[] | UserTypes.CreateInviteDTO,
    @vikraiContext() sharedContext: Context = {}
  ): Promise<UserTypes.InviteDTO | UserTypes.InviteDTO[]> {
    const input = Array.isArray(data) ? data : [data]

    const invites = await this.createInvites_(input, sharedContext)

    const serializedInvites = await this.baseRepository_.serialize<
      UserTypes.InviteDTO[] | UserTypes.InviteDTO
    >(invites, {
      populate: true,
    })

    moduleEventBuilderFactory({
      eventName: UserEvents.INVITE_CREATED,
      source: Modules.USER,
      action: CommonEvents.CREATED,
      object: "invite",
    })({
      data: serializedInvites,
      sharedContext,
    })

    moduleEventBuilderFactory({
      eventName: UserEvents.INVITE_TOKEN_GENERATED,
      source: Modules.USER,
      action: "token_generated",
      object: "invite",
    })({
      data: serializedInvites,
      sharedContext,
    })

    return Array.isArray(data) ? serializedInvites : serializedInvites[0]
  }

  @InjectTransactionManager()
  private async createInvites_(
    data: UserTypes.CreateInviteDTO[],
    @vikraiContext() sharedContext: Context = {}
  ): Promise<InferEntityType<typeof Invite>[]> {
    const alreadyExistingUsers = await this.listUsers({
      email: data.map((d) => d.email),
    })

    if (alreadyExistingUsers.length) {
      throw new vikraiError(
        vikraiError.Types.INVALID_DATA,
        `User account for following email(s) already exist: ${alreadyExistingUsers
          .map((u) => u.email)
          .join(", ")}`
      )
    }

    const toCreate = data.map((invite) => {
      const id = generateEntityId((invite as { id?: string }).id, "invite")
      return {
        ...invite,
        id,
        expires_at: new Date(Date.now() + this.config.expiresIn * 1000),
        token: this.generateToken({ id, email: invite.email }),
      }
    })

    return await this.inviteService_.create(toCreate, sharedContext)
  }

  // @ts-ignore
  updateInvites(
    data: UserTypes.UpdateInviteDTO[],
    sharedContext?: Context
  ): Promise<UserTypes.InviteDTO[]>
  // @ts-expect-error
  updateInvites(
    data: UserTypes.UpdateInviteDTO,
    sharedContext?: Context
  ): Promise<UserTypes.InviteDTO>

  @InjectManager()
  @EmitEvents()
  // @ts-expect-error
  async updateInvites(
    data: UserTypes.UpdateInviteDTO | UserTypes.UpdateInviteDTO[],
    @vikraiContext() sharedContext: Context = {}
  ): Promise<UserTypes.InviteDTO | UserTypes.InviteDTO[]> {
    const input = Array.isArray(data) ? data : [data]

    const updatedInvites = await this.inviteService_.update(
      input,
      sharedContext
    )

    const serializedInvites = await this.baseRepository_.serialize<
      UserTypes.InviteDTO[]
    >(updatedInvites, {
      populate: true,
    })

    moduleEventBuilderFactory({
      eventName: UserEvents.INVITE_UPDATED,
      source: Modules.USER,
      action: CommonEvents.UPDATED,
      object: "invite",
    })({
      data: serializedInvites,
      sharedContext,
    })

    return Array.isArray(data) ? serializedInvites : serializedInvites[0]
  }

  private generateToken(data: any): string {
    const jwtSecret: string = this.moduleDeclaration["jwt_secret"]
    return jwt.sign(data, jwtSecret, {
      jwtid: crypto.randomUUID(),
      expiresIn: this.config.expiresIn,
    })
  }
}

