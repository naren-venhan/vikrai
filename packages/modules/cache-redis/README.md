# vikrai Cache Redis

Use Redis as a vikrai cache store.

## Installation

```
yarn add @vikrai/cache-redis
```

## Options

```
   {
      ttl?: number                // Time to keep data in cache (in seconds)

      redisUrl?: string           // Redis instance connection string

      redisOptions?: RedisOptions // Redis client options

      namespace?: string          // Prefix for event keys (the default is `vikrai:`)
  }
```

### Other caching modules

- [vikrai Cache In-Memory](../cache-inmemory/README.md)

