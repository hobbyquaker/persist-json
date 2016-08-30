var pjson = require('./index.js')('ppath-test');

// sync
pjson.save('settings.json', {'test': 'sync'});
console.log(pjson.load('settings.json'));

// async
pjson.save('settings.json', {'test': 'async'}, function (err, res) {
    if (err) throw err;
    pjson.load('settings.json', function (err, res) {
        if (err) throw err;
        console.log(res);
    });
});
