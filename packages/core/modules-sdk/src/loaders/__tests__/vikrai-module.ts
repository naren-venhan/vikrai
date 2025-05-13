import { InternalModuleDeclaration } from "@vikrai/types"
import { MODULE_SCOPE } from "../../types"

import { asValue } from "awilix"
import { vikraiModule } from "../../vikrai-module"

const mockRegistervikraiModule = jest.fn().mockImplementation(() => {
  return {
    moduleKey: {
      definition: {
        key: "moduleKey",
      },
      moduleDeclaration: {
        scope: MODULE_SCOPE.INTERNAL,
      },
    },
  }
})

const mockModuleLoader = jest.fn().mockImplementation(({ container }) => {
  container.register({
    moduleKey: asValue({}),
  })
  return Promise.resolve({})
})

jest.mock("./../../loaders", () => ({
  registervikraiModule: jest
    .fn()
    .mockImplementation((...args) => mockRegistervikraiModule()),
  moduleLoader: jest
    .fn()
    .mockImplementation((...args) => mockModuleLoader.apply(this, args)),
}))

describe("vikrai Modules", () => {
  beforeEach(() => {
    vikraiModule.clearInstances()
    jest.resetModules()
    jest.clearAllMocks()
  })

  it("should create singleton instances", async () => {
    await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        options: {
          abc: 123,
        },
      } as InternalModuleDeclaration,
    })

    expect(mockRegistervikraiModule).toBeCalledTimes(1)
    expect(mockModuleLoader).toBeCalledTimes(1)

    await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        options: {
          abc: 123,
        },
      } as InternalModuleDeclaration,
    })

    await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        options: {
          different_options: "abc",
        },
      } as InternalModuleDeclaration,
    })

    expect(mockRegistervikraiModule).toBeCalledTimes(2)
    expect(mockModuleLoader).toBeCalledTimes(2)
  })

  it("should prevent the module being loaded multiple times under concurrent requests", async () => {
    const load: any = []

    for (let i = 5; i--; ) {
      load.push(
        vikraiModule.bootstrap({
          moduleKey: "moduleKey",
          defaultPath: "@path",
          declaration: {
            scope: MODULE_SCOPE.INTERNAL,
            resolve: "@path",
            options: {
              abc: 123,
            },
          } as InternalModuleDeclaration,
        })
      )
    }

    const intances = Promise.all(load)

    expect(mockRegistervikraiModule).toBeCalledTimes(1)
    expect(mockModuleLoader).toBeCalledTimes(1)
    expect(intances[(await intances).length - 1]).toBe(intances[0])
  })

  it("getModuleInstance should return the first instance of the module if there is none flagged as 'main'", async () => {
    const moduleA = await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        options: {
          abc: 123,
        },
      } as InternalModuleDeclaration,
    })

    await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        options: {
          different_options: "abc",
        },
      } as InternalModuleDeclaration,
    })

    expect(vikraiModule.getModuleInstance("moduleKey")).toEqual(moduleA)
  })

  it("should return the module flagged as 'main' when multiple instances are available", async () => {
    await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        options: {
          abc: 123,
        },
      } as InternalModuleDeclaration,
    })

    const moduleB = await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        main: true,
        options: {
          different_options: "abc",
        },
      } as InternalModuleDeclaration,
    })

    expect(vikraiModule.getModuleInstance("moduleKey")).toEqual(moduleB)
  })

  it("should retrieve the module by their given alias", async () => {
    const moduleA = await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        alias: "mod_A",
        options: {
          abc: 123,
        },
      } as InternalModuleDeclaration,
    })

    const moduleB = await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        main: true,
        alias: "mod_B",
        options: {
          different_options: "abc",
        },
      } as InternalModuleDeclaration,
    })

    const moduleC = await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        alias: "mod_C",
        options: {
          moduleC: true,
        },
      } as InternalModuleDeclaration,
    })

    // main
    expect(vikraiModule.getModuleInstance("moduleKey")).toEqual(moduleB)

    expect(vikraiModule.getModuleInstance("moduleKey", "mod_A")).toEqual(
      moduleA
    )
    expect(vikraiModule.getModuleInstance("moduleKey", "mod_B")).toEqual(
      moduleB
    )
    expect(vikraiModule.getModuleInstance("moduleKey", "mod_C")).toEqual(
      moduleC
    )
  })

  it("should prevent two main modules being set as 'main'", async () => {
    await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        alias: "mod_A",
        options: {
          abc: 123,
        },
      } as InternalModuleDeclaration,
    })

    await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        main: true,
        alias: "mod_B",
        options: {
          different_options: "abc",
        },
      } as InternalModuleDeclaration,
    })

    const moduleC = vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        main: true,
        alias: "mod_C",
        options: {
          moduleC: true,
        },
      } as InternalModuleDeclaration,
    })

    await expect(moduleC).rejects.toThrow(
      "Module moduleKey already have a 'main' registered."
    )
  })

  it("should prevent the same alias be used for different instances of the same module", async () => {
    await vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        alias: "module_alias",
        options: {
          different_options: "abc",
        },
      } as InternalModuleDeclaration,
    })

    const moduleC = vikraiModule.bootstrap({
      moduleKey: "moduleKey",
      defaultPath: "@path",
      declaration: {
        scope: MODULE_SCOPE.INTERNAL,
        resolve: "@path",
        alias: "module_alias",
        options: {
          moduleC: true,
        },
      } as InternalModuleDeclaration,
    })

    await expect(moduleC).rejects.toThrow(
      "Module moduleKey already registed as 'module_alias'. Please choose a different alias."
    )
  })
})

