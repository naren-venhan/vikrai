import { GraphQLUtils } from "@vikrai/utils"

export function getEntitiesMap(loadedSchema): Map<string, any> {
  const defaultvikraiSchema = `
    scalar DateTime
    scalar JSON
  `
  const { schema } = GraphQLUtils.cleanGraphQLSchema(
    defaultvikraiSchema + loadedSchema
  )
  const mergedSchema = GraphQLUtils.mergeTypeDefs(schema)
  return GraphQLUtils.makeExecutableSchema({
    typeDefs: mergedSchema,
  }).getTypeMap() as any
}

