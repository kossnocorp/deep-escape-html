# deep-escape-html

Deeply escape object's string properties for use in HTML.
Build on top [escape-html](https://www.npmjs.com/package/escape-html).

## Example

``` js
var escape = require('deep-escape-html')
var html = escape({a: "<script>alert('PWNED')</script>", {b: ['<div></div>', 1, true, false]}})
// -> {a: '&lt;script&gt;alert(&#39;PWNED&#39;)&lt;/script&gt;', {b: ['&lt;div&gt;&lt;/div&gt;', 1, true, false]}}
```

## License

MIT

