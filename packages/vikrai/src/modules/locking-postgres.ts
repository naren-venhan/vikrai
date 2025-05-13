import PostgresLockingProvider from "@vikrai/locking-postgres"

export * from "@vikrai/locking-postgres"

export default PostgresLockingProvider
export const discoveryPath = require.resolve("@vikrai/locking-postgres")

