var escape = require('escape-html')

module.exports = function deepEscapeHtml(object, html5) {
  if (typeof object == 'string') {
    return escape(object, html5)
  } else if (object && object.push) { // this is an array
    var newObject = []
    for (var index = 0; index < object.length; index++) {
      newObject.push(deepEscapeHtml(object[index], html5))
    }
    return newObject
  } else if (object && typeof object == 'object') { // this is an object
    var newObject = {}
    for (var key in object) {
      newObject[key] = deepEscapeHtml(object[key], html5)
    }
    return newObject
  } else {
    return object
  }
}
