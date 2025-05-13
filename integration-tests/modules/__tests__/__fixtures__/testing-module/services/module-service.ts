import { IModuleService } from "@vikrai/types"
import { vikraiContext } from "@vikrai/utils"

// @ts-expect-error
export class ModuleService implements IModuleService {
  public property = "value"
  public dynProperty

  constructor() {
    this.dynProperty = {
      key: "key value",
    }
  }
  async methodName(input, @vikraiContext() context) {
    return input + " called"
  }
}

