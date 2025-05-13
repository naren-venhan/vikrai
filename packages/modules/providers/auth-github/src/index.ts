import { ModuleProvider, Modules } from "@vikrai/framework/utils"
import { GithubAuthService } from "./services/github"

const services = [GithubAuthService]

export default ModuleProvider(Modules.AUTH, {
  services,
})

