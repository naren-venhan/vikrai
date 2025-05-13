import { vikraiService, Module } from "@vikrai/framework/utils"

export default Module("module1", {
  service: class Module1Service extends vikraiService({}) {},
})

