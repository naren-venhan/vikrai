import { FormattingOptionsType } from "types"
import baseSectionsOptions from "../base-section-options.js"

const vikraiConfigOptions: FormattingOptionsType = {
  "^vikrai_config": {
    expandMembers: true,
  },
  "^vikrai_config/.*ConfigModule": {
    frontmatterData: {
      slug: "/references/vikrai-config",
    },
    reflectionDescription: `In this document, you’ll learn how to create a file service in the vikrai application and the methods you must implement in it.`,
    reflectionTitle: {
      fullReplacement: "Configure vikrai Backend",
    },
    expandMembers: true,
    expandProperties: true,
    sections: {
      ...baseSectionsOptions,
      member_declaration_title: false,
      member_declaration_children: true,
      member_declaration_typeDeclaration: false,
      member_declaration_signatures: false,
    },
  },
}

export default vikraiConfigOptions

