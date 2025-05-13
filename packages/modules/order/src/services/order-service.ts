import {
  Context,
  DAL,
  FindConfig,
  InferEntityType,
  OrderTypes,
  RepositoryService,
} from "@vikrai/framework/types"
import {
  InjectManager,
  vikraiContext,
  vikraiError,
  ModulesSdkUtils,
} from "@vikrai/framework/utils"
import { Order } from "@models"

type InjectedDependencies = {
  orderRepository: DAL.RepositoryService
}

export default class OrderService extends ModulesSdkUtils.vikraiInternalService<
  InjectedDependencies,
  InferEntityType<typeof Order>
>(Order) {
  protected readonly orderRepository_: RepositoryService<
    InferEntityType<typeof Order>
  >

  constructor(container: InjectedDependencies) {
    // @ts-ignore
    super(...arguments)
    this.orderRepository_ = container.orderRepository
  }

  @InjectManager("orderRepository_")
  async retrieveOrderVersion<TEntityMethod = OrderTypes.OrderDTO>(
    id: string,
    version: number,
    config: FindConfig<TEntityMethod> = {},
    @vikraiContext() sharedContext: Context = {}
  ): Promise<typeof Order> {
    const queryConfig = ModulesSdkUtils.buildQuery<typeof Order>(
      { id, items: { version } },
      { ...config, take: 1 } as any
    )
    const [result] = await this.orderRepository_.find(
      queryConfig,
      sharedContext
    )

    if (!result) {
      throw new vikraiError(
        vikraiError.Types.NOT_FOUND,
        `Order with id: "${id}" and version: "${version}" not found`
      )
    }

    return result
  }
}

