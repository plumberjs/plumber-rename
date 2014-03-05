var operation = require('plumber').operation;

module.exports = function(newName) {
    if (typeof newName !== 'string') {
        throw new Error('plumber-rename needs a new name as argument');
    }

    return operation(function(resources) {
        // FIXME: how to do this on the stream?
        // if (resources.length > 1) {
        //     throw new Error('Cannot rename multiple resources to ' + newName);
        // }
        return resources.map(function(resource) {
            return resource.withFileName(newName);
        });
    });
};
