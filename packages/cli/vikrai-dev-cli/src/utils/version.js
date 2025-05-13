exports.getVersionInfo = () => {
  const { version: devCliVersion } = require(`../../package.json`)
  return `vikrai Dev CLI version: ${devCliVersion}`
}

