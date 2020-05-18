# Ozmo compiler

Ozmo markup language compiler

## Code

```
@image test.png
text, lots of text
@video movie.mp3


@h1 A title

#code js
console.log('it works :) !');
#end
```

## Compile to JSON

```javascript
import ozmo from 'ozmo-compile'

const text = `` // ozmo code in text variable
const result = ozmo(text)
console.log(JSON.stringify(result))
```

## React integration

see [Ozmo React library](https://github.com/hugo-s29/ozmo-react)
