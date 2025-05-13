import { IUserModuleService } from "@vikrai/types"
import { Modules } from "@vikrai/utils"
import { vikraiIntegrationTestRunner } from "@vikrai/test-utils"
import { createAdminUser } from "../../../helpers/create-admin-user"

jest.setTimeout(50000)

const env = { vikrai_FF_vikrai_V2: true }
const adminHeaders = {
  headers: { "x-vikrai-access-token": "test_token" },
}

vikraiIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api }) => {
    describe("GET /admin/invites/:id", () => {
      let appContainer
      let userModuleService: IUserModuleService

      beforeAll(async () => {
        appContainer = getContainer()
        userModuleService = appContainer.resolve(Modules.USER)
      })

      beforeEach(async () => {
        await createAdminUser(dbConnection, adminHeaders, appContainer)
      })

      it("should retrieve a single invite", async () => {
        const invite = await userModuleService.createInvites({
          email: "potential_member@test.com",
        })

        const response = await api.get(
          `/admin/invites/${invite.id}`,
          adminHeaders
        )

        expect(response.status).toEqual(200)
        expect(response.data.invite).toEqual(
          expect.objectContaining({ email: "potential_member@test.com" })
        )
      })
    })
  },
})

