type ApiType = "store" | "admin" | "combined"

type CircularReferenceSchema = Record<string, string[]>

type CircularReferenceConfig = {
  decorators: {
    "vikrai/circular-patch": {
      schemas: CircularReferenceSchema
    }
  }
}

