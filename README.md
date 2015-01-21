# utc2locale

[![NPM version](https://badge.fury.io/js/utc2locale.png)](http://badge.fury.io/js/utc2locale)

Streaming approach from Date#toUTCString() to Date#toLocaleString().

## Install

```
$ npm install -g utc2locale
```

## Usage

### Run derectly

```
$ tail -f /path/to/your/log | utc2locale
```

or

```
utc2locale </path/to/your/log
```

### Use with nodejs

```js
var utc2locale = require('utc2locale');
fileStream.pipe(utc2locale).pipe(process.stdout);
```
