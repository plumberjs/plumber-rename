plumber-rename [![Build Status](https://travis-ci.org/plumberjs/plumber-rename.png?branch=master)](https://travis-ci.org/plumberjs/plumber-rename)
==============

Rename operation for [Plumber](https://github.com/plumberjs/plumber) pipelines.

## Example

    var rename = require('plumber-rename');

    module.exports = function(pipelines) {

        pipelines['compile'] = [
            glob('main.js'),
            rename('app'), // => now as `app.js'
            // ... more pipeline operations
        ];

    };


## API

### `rename(newName)`

Rename the input resource to the given `newName`.

If more than one resource is passed to `rename`, the operation will fail with an error.

Note: the `newName` should **not** include the file extension. The extension is managed and added automatically.
