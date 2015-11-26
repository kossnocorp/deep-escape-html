var assert = require('power-assert')
var deepEscapeHtml = require('.')

describe('deepEscapeHtml', function() {
  context('when string is passed', function() {
    it('escapes the string', function() {
      assert.equal(
        deepEscapeHtml("<script>alert('PWNED')</script>"),
        '&lt;script&gt;alert(&#39;PWNED&#39;)&lt;/script&gt;'
      )
    })
  })

  context('when array is passed', function() {
    it('escapes each string in the array', function() {
      assert.deepEqual(
         deepEscapeHtml([
           "<script>alert('PWNED')</script>",
           'test',
           '<div></div>',
         ]),
        [
          '&lt;script&gt;alert(&#39;PWNED&#39;)&lt;/script&gt;',
          'test',
          '&lt;div&gt;&lt;/div&gt;'
        ]
      )
    })

    it('keeps non strings/objects/arrays as is', function() {
      assert.deepEqual(
        deepEscapeHtml([42, true, false, null, undefined, Infinity]),
        [42, true, false, null, undefined, Infinity]
      )
    })

    it('clones the array', function() {
      const array = [1, 2, 3]
      const newArray = deepEscapeHtml(array)
      assert(array !== newArray)
    })

    it('escapes strings in nested arrays', function() {
      assert.deepEqual(
        deepEscapeHtml([["<script>alert('PWNED')</script>"]]),
        [['&lt;script&gt;alert(&#39;PWNED&#39;)&lt;/script&gt;']]
      )
    })

    it('escapes strings in nested objects', function() {
      assert.deepEqual(
        deepEscapeHtml([{a: "<script>alert('PWNED')</script>"}]),
        [{a: '&lt;script&gt;alert(&#39;PWNED&#39;)&lt;/script&gt;'}]
      )
    })
  })

  context('when object is passed', function() {
    it('escapes each string in the array', function() {
      assert.deepEqual(
        deepEscapeHtml({
          a: "<script>alert('PWNED')</script>",
          b: 'test',
          c: '<div></div>',
        }),
        {
          a: '&lt;script&gt;alert(&#39;PWNED&#39;)&lt;/script&gt;',
          b: 'test',
          c: '&lt;div&gt;&lt;/div&gt;'
        }
      )
    })

    it('keeps non strings/objects/arrays as is', function() {
      assert.deepEqual(
        deepEscapeHtml({ a: 42, b: true, c: false, d: null, e: undefined, f: Infinity}),
        { a: 42, b: true, c: false, d: null, e: undefined, f: Infinity}
      )
    })

    it('clones the object', function() {
      const object = {a: 1, b: 2, c: 3}
      const newObject = deepEscapeHtml(object)
      assert(object !== newObject)
    })

    it('escapes strings in nested objects', function() {
      assert.deepEqual(
        deepEscapeHtml({a: {b: "<script>alert('PWNED')</script>"} }),
        {a: {b: '&lt;script&gt;alert(&#39;PWNED&#39;)&lt;/script&gt;'}}
      )
    })

    it('escapes strings in nested arrays', function() {
      assert.deepEqual(
        deepEscapeHtml({a: ["<script>alert('PWNED')</script>"] }),
        {a: ['&lt;script&gt;alert(&#39;PWNED&#39;)&lt;/script&gt;']}
      )
    })
  })

  context('when non string/object/array is passed', function() {
    it('keeps it as is', function() {
      assert(deepEscapeHtml(42) == 42)
      assert(deepEscapeHtml(true) == true)
      assert(deepEscapeHtml(false) == false)
      assert(deepEscapeHtml(null) == null)
      assert(deepEscapeHtml(undefined) == undefined)
      assert(deepEscapeHtml(Infinity) == Infinity)
    })
  })

  context('then custom matchHtmlRegExp is passed', function() {
    it('allows to override default matching rule', function() {
      assert(deepEscapeHtml("Sasha's", /[<>]/) == "Sasha's")
    })
  })
})
