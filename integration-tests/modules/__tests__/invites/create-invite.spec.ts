import { createAdminUser } from "../../../helpers/create-admin-user"
import { vikraiIntegrationTestRunner } from "@vikrai/test-utils"

jest.setTimeout(50000)

const env = { vikrai_FF_vikrai_V2: true }
const adminHeaders = {
  headers: { "x-vikrai-access-token": "test_token" },
}

vikraiIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api }) => {
    describe("POST /admin/invites", () => {
      beforeEach(async () => {
        await createAdminUser(dbConnection, adminHeaders, getContainer())
      })

      it("create an invite", async () => {
        const body = {
          email: "test_member@test.com",
        }

        const response = await api.post(`/admin/invites`, body, adminHeaders)

        expect(response.status).toEqual(200)
        expect(response.data).toEqual({
          invite: expect.objectContaining(body),
        })
      })
    })
  },
})

