# @vikrai/vikrai

This is the core package for the VikrAI commerce platform. VikrAI is an open-source platform that provides the building blocks for creating custom commerce applications without reinventing core commerce logic.

## Installation

Since this package is published to the GitHub npm registry, you'll need to configure npm to use the GitHub registry for the @vikrai scope:

1. Create or edit an `.npmrc` file in your project root:

```
@vikrai:registry=https://npm.pkg.github.com
```

2. Authenticate with GitHub:

```bash
npm login --registry=https://npm.pkg.github.com --scope=@vikrai
```

3. Install the package:

```bash
npm install @vikrai/vikrai
```

## Usage

```javascript
import { VikrAI } from '@vikrai/vikrai';

const vikrai = new VikrAI({
  // Configuration options
});

// Use VikrAI's commerce functionalities
```

## Documentation

For full documentation, visit [docs.vikrai.com](https://docs.vikrai.com/).

## License

MIT 