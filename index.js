module.exports = function(newName) {
    if (typeof newName !== 'string') {
        throw new Error('plumber-rename needs a new name as argument');
    }

    return function(resources) {
        if (resources.length > 1) {
            throw new Error('Cannot rename multiple resources to ' + newName);
        }

        return [resources[0].withFileName(newName)];
    };
};
