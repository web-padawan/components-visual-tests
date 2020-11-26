export function isW3C(capabilities){
  // Only browserVersion is mandatory, platformName is optional
  return Boolean(capabilities.browserVersion)
}
