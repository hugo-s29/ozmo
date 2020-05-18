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
import ozmo from 'ozmo'

const text = `` // ozmo code in text variable
const result = ozmo(text)
console.log(JSON.stringify(result))
```
