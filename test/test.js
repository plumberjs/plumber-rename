require('should');

var Resource = require('plumber').Resource;

var rename = require('..');

function createResource(params) {
  return new Resource(params);
}

describe('rename', function(){
  it('should be a function', function(){
    rename.should.be.type('function');
  });

  it('should throw an exception if no name is provided', function(){
    (function() {
      rename();
    }).should.throw('plumber-rename needs a new name as argument');
  });

  it('should throw an exception if a non-string name is provided', function(){
    (function() {
      rename(null);
    }).should.throw('plumber-rename needs a new name as argument');

    (function() {
      rename(1);
    }).should.throw('plumber-rename needs a new name as argument');

    (function() {
      rename([]);
    }).should.throw('plumber-rename needs a new name as argument');

    (function() {
      rename({});
    }).should.throw('plumber-rename needs a new name as argument');
  });

  it('should return a function if a name is provided', function(){
    rename('name').should.be.type('function');
  });

  it('should throw an exception if passed more than one resource', function(){
    (function() {
      rename('one')([createResource(), createResource()]);
    }).should.throw('Cannot rename multiple resources to one');
  });

  it('should return the same resource with a new name', function(){
    var resource = createResource({path: 'path/to/file.js'});
    var renamedResources = rename('one')([resource]);

    // TODO: check other props
    // TODO: fix extension?
    renamedResources.length.should.equal(1);
    // renamedResources[0].path().should.equal('one.js');
    // renamedResources[0].filename().should.equal('one.js');
  });
});
