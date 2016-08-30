# persist-json

[![License][mit-badge]][mit-url]
[![NPM version](https://badge.fury.io/js/persist-json.svg)](http://badge.fury.io/js/persist-json)
[![Dependency Status](https://img.shields.io/gemnasium/hobbyquaker/persist-json.svg?maxAge=2592000)](https://gemnasium.com/github.com/hobbyquaker/persist-json)

> Persist an object as plain JSON file

## Usage

```npm install persist-json```

```Javascript
var pjson = require('persist-json')('project-name');
```

The path where the JSON file will be stored is determinated by the [persist-path](https://github.com/hobbyquaker/persist-path) module.

## Methods

Both methods save and load can be used either asynchronous (by providing a callback as last param) or synchronous.
On asynchronous usage the callback is called with the params of `fs.writeFileSync` respectively `fs.readFileSync`.

#### *undefined* save( *string* filename , *object* content [, *function* callback ] )

#### *object|undefined* load( *string* filename [, *function* callback ] )

See [test.js](test.js) for usage examples.


# License

MIT (c) 2016 [Sebastian Raff](https://github.com/hobbyquaker)

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat
[mit-url]: LICENSE

