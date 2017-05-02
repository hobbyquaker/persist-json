var ppath = require('persist-path');
var rand = Math.random().toString(36).slice(2);
var name = 'persist-json-test-' + rand;
var path = ppath(name);

var should = require('should');

console.log('test path:', path);

var pjson;

describe('instantiate', function () {
    it('should instantiate without error', function () {
        pjson = require('./index.js')(name);
    });
});

describe('synchronously save and load', function () {
    it('should synchronously save data', function () {
        should(pjson.save('sync', {a: true})).equal(undefined);
    });
    it('should synchronously load data', function () {
        should(pjson.load('sync', {a: true})).deepEqual({a: true});
    });
});

describe('asynchronously save and load', function () {
    it('should asynchronously save data', function (done) {
        pjson.save('async', {a: true}, done);
    });
    it('should asynchronously load data', function () {
        pjson.load('async', {a: true}, function (err, res) {
            res.should.deepEqual({a: true});
            done(err);
        });
    });
});

describe('error handling', function () {
    it('should return undefined if synchronously trying to load non existing file', function () {
        should(pjson.load('missing')).equal(undefined);
    });
    it('should callback with error if asynchronously trying to load non existing file', function (done) {
        pjson.load('missing', function (err, data) {
            done(!err);
        });
    });
});
