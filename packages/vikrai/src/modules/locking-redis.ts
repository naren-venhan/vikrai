import RedisLockingProvider from "@vikrai/locking-redis"

export * from "@vikrai/locking-redis"

export default RedisLockingProvider
export const discoveryPath = require.resolve("@vikrai/locking-redis")

