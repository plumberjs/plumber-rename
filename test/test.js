require('should');

var runOperation = require('plumber-util-test').runOperation;

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

  // TODO: bring back this behaviour
  // it('should throw an exception if passed more than one resource', function(){
  //   (function() {
  //     runOperation(rename('one'), [createResource(), createResource()]).resources.toArray(function(){});
  //   }).should.throw('Cannot rename multiple resources to one');
  // });

  it('should return no resource if no resource is passed', function(done){
    runOperation(rename('one'), []).resources.toArray(function(renamedResources) {
      renamedResources.length.should.equal(0);
      done();
    });
  });

  it('should return the same resource with a new name', function(done){
    var resource = createResource({path: 'path/to/file.js'});
    runOperation(rename('one'), [resource]).resources.toArray(function(renamedResources) {
      // TODO: check other props
      // TODO: fix extension?
      renamedResources.length.should.equal(1);
      // renamedResources[0].path().should.equal('one.js');
      // renamedResources[0].filename().should.equal('one.js');
      done();
    });
  });
});
