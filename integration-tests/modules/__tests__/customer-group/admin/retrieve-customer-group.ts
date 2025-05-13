import { ICustomerModuleService } from "@vikrai/types"
import { Modules } from "@vikrai/utils"
import { vikraiIntegrationTestRunner } from "@vikrai/test-utils"
import { createAdminUser } from "../../../../helpers/create-admin-user"

jest.setTimeout(50000)

const env = { vikrai_FF_vikrai_V2: true }
const adminHeaders = {
  headers: { "x-vikrai-access-token": "test_token" },
}

vikraiIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api }) => {
    describe("GET /admin/customer-groups/:id", () => {
      let appContainer
      let customerModuleService: ICustomerModuleService

      beforeAll(async () => {
        appContainer = getContainer()
        customerModuleService = appContainer.resolve(Modules.CUSTOMER)
      })

      beforeEach(async () => {
        await createAdminUser(dbConnection, adminHeaders, appContainer)
      })

      it("should retrieve customer group", async () => {
        const group = await customerModuleService.createCustomerGroups({
          name: "Test",
        })

        const response = await api.get(
          `/admin/customer-groups/${group.id}`,
          adminHeaders
        )

        expect(response.status).toEqual(200)
        expect(response.data.customer_group).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            name: "Test",
          })
        )
      })
    })
  },
})

