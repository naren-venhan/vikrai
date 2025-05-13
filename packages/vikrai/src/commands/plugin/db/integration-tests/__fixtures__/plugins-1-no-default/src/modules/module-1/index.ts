import { vikraiService, Module } from "@vikrai/framework/utils"

export const module1 = Module("module1", {
  service: class Module1Service extends vikraiService({}) {},
})

