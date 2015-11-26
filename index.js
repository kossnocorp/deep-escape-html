var escape = require('escape-html')

module.exports = function deepEscapeHtml(object, matchHtmlRegExp) {
  if (typeof object == 'string') {
    return escape(object, matchHtmlRegExp)
  } else if (object && object.push) { // this is an array
    var newObject = []
    for (var index = 0; index < object.length; index++) {
      newObject.push(deepEscapeHtml(object[index], matchHtmlRegExp))
    }
    return newObject
  } else if (object && typeof object == 'object') { // this is an object
    var newObject = {}
    for (var key in object) {
      newObject[key] = deepEscapeHtml(object[key], matchHtmlRegExp)
    }
    return newObject
  } else {
    return object
  }
}
