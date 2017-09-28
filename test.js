/* global describe, it */

var fs = require('fs');
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
    it('should throw an error if instantiating without name', function () {
        (function () {
            require('./index.js')();
        }).should.throw();
    });
    it('should throw an error if instantiating with invalid name', function () {
        (function () {
            require('./index.js')('');
        }).should.throw();
    });
    it('should throw an error if instantiating with invalid name', function () {
        (function () {
            require('./index.js')(false);
        }).should.throw();
    });
});

describe('synchronously save and load', function () {
    it('should synchronously save data', function () {
        should(pjson.save('sync', {a: true})).equal(undefined);
    });
    it('should synchronously load data', function () {
        should(pjson.load('sync')).deepEqual({a: true});
    });
});

describe('asynchronously save and load', function () {
    it('should asynchronously save data', function (done) {
        pjson.save('async', {a: true}, done);
    });
    it('should asynchronously load data', function () {
        setTimeout(() => {
            pjson.load('async', function (err, res) {
                res.should.deepEqual({a: true});
                done(err);
            });
        }, 1000);
    });
    it('should asynchronously load data', function () {
        pjson.load('async', function (err, res) {
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
    it('should throw an error when calling load with missing filename', function () {
        (function () {
            pjson.load();
        }).should.throw();
    });
    it('should throw an error when calling save with missing filename', function () {
        (function () {
            pjson.save();
        }).should.throw();
    });
    it('should throw an error when calling load with empty filename', function () {
        (function () {
            pjson.load('');
        }).should.throw();
    });
    it('should throw an error when calling save with empty filename', function () {
        (function () {
            pjson.save('');
        }).should.throw();
    });
    it('should return undefined if synchronously trying to load invalid file', function () {
        fs.writeFileSync(path + '/invalid', 'this-is-not-json');
        should(pjson.load('invalid')).equal(undefined);
    });
    it('should callback with error if asynchronously trying to load invalid file', function (done) {
        pjson.load('invalid', function (err, data) {
            done(!err);
        });
    });
});

describe('instantiate with option secure: true', function () {
    it('should instantiate without error', function () {
        pjson = require('./index.js')(name, {secure: true});
    });
});

describe('synchronously secure save and load', function () {
    it('should synchronously save data', function () {
        should(pjson.save('sync2', {a: true})).equal(undefined);
    });
    it('should synchronously load data', function () {
        should(pjson.load('sync2')).deepEqual({a: true});
    });
    it('should synchronously save data', function () {
        should(pjson.save('sync2', {b: true})).equal(undefined);
    });
    it('should synchronously load data', function () {
        should(pjson.load('sync2')).deepEqual({b: true});
    });
    it('should synchronously save data', function () {
        should(pjson.save('sync2', {c: true})).equal(undefined);
    });
    it('should synchronously load data', function () {
        should(pjson.load('sync2')).deepEqual({c: true});
    });
});

describe('asynchronously secure save and load', function () {
    it('should asynchronously save data', function (done) {
        pjson.save('sasync2', {a: true}, () => {
            done();
        });
    });
    it('should asynchronously load data', function () {
        setTimeout(() => {
            pjson.load('sasync2', function (err, res) {
                res.should.deepEqual({a: true});
                done(err);
            });
        }, 1000);
    });
    it('should asynchronously save data', function (done) {
        pjson.save('async3', {b: true}, () => {
            done();
        });
    });
    it('should asynchronously load data', function () {
        setTimeout(() => {
            pjson.load('async3', function (err, res) {
                res.should.deepEqual({b: true});
                done(err);
            });
        }, 1000);
    });
    it('should asynchronously save data', function (done) {
        pjson.save('async3', {c: true}, () => {
            done();
        });
    });
    it('should asynchronously load data', function () {
        setTimeout(() => {
            pjson.load('async3', function (err, res) {
                res.should.deepEqual({c: true});
                done(err);
            });
        }, 1000);
    });
});

describe('error handling secure', function () {
    it('should return undefined if synchronously trying to load non existing file', function () {
        should(pjson.load('missing')).equal(undefined);
    });
    it('should callback with error if asynchronously trying to load non existing file', function (done) {
        pjson.load('missing', function (err, data) {
            done(!err);
        });
    });
    it('should throw an error when calling load with missing filename', function () {
        (function () {
            pjson.load();
        }).should.throw();
    });
    it('should throw an error when calling save with missing filename', function () {
        (function () {
            pjson.save();
        }).should.throw();
    });
    it('should throw an error when calling load with empty filename', function () {
        (function () {
            pjson.load('');
        }).should.throw();
    });
    it('should throw an error when calling save with empty filename', function () {
        (function () {
            pjson.save('');
        }).should.throw();
    });
    it('should return undefined if synchronously trying to load invalid file', function () {
        fs.writeFileSync(path + '/invalid', 'this-is-not-json');
        should(pjson.load('invalid')).equal(undefined);
    });
    it('should callback with error if asynchronously trying to load invalid file', function (done) {
        pjson.load('invalid', function (err, data) {
            done(!err);
        });
    });
});
