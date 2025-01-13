/**
 * 路径匹配器
 * @param {string} pattern
 * @param {string} path
 * @returns {boolean} 路径匹配器
 */
export function isPathMatch(pattern, path) {
  const regexPattern = pattern.replace(/\//g, '\\/').replace(/\*\*/g, '.*').replace(/\*/g, '[^\\/]*')
  const regex = new RegExp(`^${regexPattern}$`)
  return regex.test(path)
}

/**
 * 判断value字符串是否为空
 * @param {string} value
 * @returns {boolean} 判断value字符串是否为空
 */
export function isEmpty(value) {
  if (value == null || value == '' || value == undefined || value == 'undefined') {
    return true
  }
  return false
}

/**
 * 判断url是否是http或https
 * @param {string} url
 * @returns {boolean} 判断url是否是http或https
 */
export function isHttp(url) {
  return url.includes('http://') || url.includes('https://')
}

/**
 * @param {string} path
 * @returns {boolean} 判断path是否为外链
 */
export function isExternal(path) {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {boolean} 是用户名
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.includes(str.trim())
}

/**
 * @param {string} url
 * @returns {boolean} 是否是url
 */
export function validURL(url) {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d?)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:\d+)*(\/($|[\w.,?'\\+&%$#=~-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {boolean} 是小写
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {boolean} 是大写
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {boolean} 是字母
 */
export function validAlphabets(str) {
  const reg = /^[A-Z]+$/i
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {boolean} 是否是合法的邮箱
 */
export function validEmail(email) {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {boolean} 是字符串
 */
export function isString(str) {
  return typeof str === 'string' || str instanceof String
}

/**
 * @param {Array} arg
 * @returns {boolean} 是数组
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
