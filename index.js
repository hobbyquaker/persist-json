var fs = require('fs');
var ppath = require('persist-path');
var mkdirp = require('mkdirp');

function Pjson(folder) {
    if (!(this instanceof Pjson)) {
        return new Pjson(folder);
    }
    if (typeof folder !== 'string' || folder === '') {
        throw new Error('param folder missing');
    }
    this.folder = folder;
    var p = ppath(folder);
    mkdirp(p);
}

Pjson.prototype.save = function (file, content, cb) {
    if (typeof file !== 'string' || file === '') {
        throw new Error('param file missing');
    }
    var json = JSON.stringify(content, null, '  ');
    file = ppath(this.folder, file);
    if (typeof cb === 'function') {
        fs.writeFile(file, json, cb);
    } else {
        return fs.writeFileSync(file, json);
    }
};

Pjson.prototype.load = function (file, cb) {
    if (typeof file !== 'string' || file === '') {
        throw new Error('param file missing');
    }
    var f = ppath(this.folder, file);
    if (typeof cb === 'function') {
        fs.readFile(f, function (err, res) {
            if (err) {
                cb(err);
            } else {
                try {
                    var obj = JSON.parse(res);
                    cb(null, obj);
                } catch (err) {
                    cb(err);
                }
            }
        });
    } else {
        try {
            return JSON.parse(fs.readFileSync(f));
        } catch (err) {
            return undefined;
        }
    }
};

module.exports = Pjson;
