import { FormattingOptionsType } from "types"

const vikraiOptions: FormattingOptionsType = {
  "^vikrai/": {
    maxLevel: 2,
  },
  "^vikrai/classes/vikrai\\.(Store*|Admin*)": {
    reflectionGroups: {
      Constructors: false,
    },
  },
}

export default vikraiOptions

