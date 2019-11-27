const clearURL = str => {
  var reg = new RegExp('<.[^<>]*>', 'gi')
  str = str.replace(reg, '')
  str = str.replace(/[ ]/g, '-')
  str = str.replace(/[!,;:.%§@#€$%^&'"`*()[\]]/g, '-')

  str = str.toLowerCase()
  return str
}

export default clearURL
