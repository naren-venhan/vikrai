# VikrAI Commerce Platform

VikrAI is a composable commerce platform that provides the building blocks for crafting flexible and custom e-commerce experiences.

## Features

- **Modular Architecture** - Use only what you need
- **Headless by Design** - Build your own frontend or use our dashboard
- **API-First** - RESTful APIs for all commerce functionality
- **Extendable** - Easily add custom functionality with plugins
- **Developer Friendly** - Typescript throughout, great DX
- **Open Source** - MIT licensed

## Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database

### Installation

```bash
# Using npm
npm install -g @vikrai/cli

# Create a new VikrAI project
vikrai new my-store

# Change directory to the new project
cd my-store

# Start development server
vikrai develop
```

## Project Structure

The VikrAI repository is a monorepo managed with Yarn workspaces. Here's an overview of the main packages:

- `packages/vikrai` - Core commerce functionality
- `packages/admin` - Admin dashboard UI
- `packages/modules/*` - Commerce modules like cart, payment, etc.
- `packages/core/*` - Core utilities and shared functionality
- `packages/cli/*` - Command-line tools

## Contributing

We welcome and appreciate contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, the development process, and our code of conduct.

## Documentation

For detailed documentation, visit [docs.vikrai.com](https://docs.vikrai.com).

## Support

For questions and support, join our [Discord community](https://discord.gg/vikrai).

## License

VikrAI is [MIT licensed](LICENSE).

