import { vikraiIntegrationTestRunner } from "@vikrai/test-utils"
import { vikraiApp } from "@vikrai/modules-sdk"
import { IProductModuleService } from "@vikrai/types"
import { Modules } from "@vikrai/utils"

jest.setTimeout(30000)

vikraiIntegrationTestRunner({
  testSuite: ({ dbConfig: { clientUrl } }) => {
    describe("Standalone Modules", () => {
      beforeAll(async () => {
        process.env.DATABASE_URL = clientUrl
      })

      afterAll(async () => {
        process.env.DATABASE_URL = undefined
      })

      it("Should migrate database and initialize Product module using connection string from environment variable ", async function () {
        const { modules, runMigrations } = await vikraiApp({
          modulesConfig: {
            [Modules.PRODUCT]: true,
          },
        })

        await runMigrations()

        const product = modules[
          Modules.PRODUCT
        ] as unknown as IProductModuleService

        const productList = await product.listProducts()

        expect(productList).toEqual(expect.arrayContaining([]))
      })
    })
  },
})

