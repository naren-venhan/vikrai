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
    describe("POST /admin/customers/:id", () => {
      let appContainer
      let customerModuleService: ICustomerModuleService

      beforeAll(async () => {
        appContainer = getContainer()
        customerModuleService = appContainer.resolve(Modules.CUSTOMER)
      })

      beforeEach(async () => {
        await createAdminUser(dbConnection, adminHeaders, appContainer)
      })

      it("should update a customer", async () => {
        const customer = await customerModuleService.createCustomers({
          first_name: "John",
          last_name: "Doe",
        })

        const response = await api.post(
          `/admin/customers/${customer.id}`,
          {
            first_name: "Jane",
          },
          adminHeaders
        )

        expect(response.status).toEqual(200)
        expect(response.data.customer).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            first_name: "Jane",
            last_name: "Doe",
          })
        )
      })
    })
  },
})

