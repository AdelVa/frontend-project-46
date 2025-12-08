import yaml from 'js-yaml'

const parseFile = (fileData, fileExt) => {
  switch (fileExt) {
    case 'json':
      return JSON.parse(fileData)
    case 'yml':
      return yaml.load(fileData)
    case 'yaml':
      return yaml.load(fileData)
    default:
      throw new Error(`Unexpected out of range value - ${fileExt}`)
  }
}

export default parseFile
