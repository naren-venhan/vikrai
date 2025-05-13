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
    describe("GET /admin/invites", () => {
      let appContainer
      let userModuleService: IUserModuleService

      beforeAll(async () => {
        appContainer = getContainer()
        userModuleService = appContainer.resolve(Modules.USER)
      })

      beforeEach(async () => {
        await createAdminUser(dbConnection, adminHeaders, appContainer)
      })

      it("should list invites", async () => {
        await userModuleService.createInvites({
          email: "potential_member@test.com",
          token: "test",
          expires_at: new Date(),
        })

        const response = await api.get(`/admin/invites`, adminHeaders)

        expect(response.status).toEqual(200)
        expect(response.data).toEqual({
          invites: [
            expect.objectContaining({ email: "potential_member@test.com" }),
          ],
          count: 1,
          offset: 0,
          limit: 50,
        })
      })
    })
  },
})

