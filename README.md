# O5

A polyfill for ECMAScript 5+ / Harmony object descriptor functionality.

## Example

```javascript
var O5 = require("./[where-you-put-it]/O5");

var thing = O5.defineProperties( {}, {
    "foo": {
        set: function () {
            return "YOU SET ME TO '" + this.value + "' LAST";
        }
    },
    "bar": {
        writable: false,        // cannot write/set
        get: function () {
            return "I AM " + this.value + " WHEN GETTED";
        }
    },
    "vanilla": {},    // uses defaults
    "classic": {
        value: [3,2,1]
    }
});
```

The default descriptor looks like this:

```javascript
{
    writable: true,
    configurable: true,
    enumerable: true,
    value: undefined,
    get: function () {
        return this.value;    // gets the raw value property
    },
    set: function (value) {
        return value;    // return value assigned to property
    }
}
```

## License

MIT/X11

Copyright (C) 2012 Anders D. Johnson <AndersDJohnson@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
