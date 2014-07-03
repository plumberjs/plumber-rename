require('should');

var runAndCompleteWith = require('plumber-util-test').runAndCompleteWith;

var Resource = require('plumber').Resource;

var rename = require('..');

function createResource(params) {
  return new Resource(params);
}

function resourcesError() {
  chai.assert(false, "error in resources observable");
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
    runAndCompleteWith(rename('one'), [], function(renamedResources) {
      renamedResources.length.should.equal(0);
    }, resourcesError, done);
  });

  it('should return the same resource with a new name', function(done){
    var resource = createResource({path: 'path/to/file.js', type: 'javascript'});
    runAndCompleteWith(rename('one'), [resource], function(renamedResources) {
      // TODO: check other props, incl path?
      // renamedResources[0].path().absolute().should.equal('path/to/one.js');
      renamedResources.length.should.equal(1);
      renamedResources[0].filename().should.equal('one.js');
    }, resourcesError, done);
  });
});
