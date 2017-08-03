var fs = require('fs');
var newNames = null;

fs.readFile('./data.txt', { encoding: 'utf-8' }, function(err, data) {
	newNames = data.split('\r');

	fs.readdir('./', function(err, files) {
		var _name = '';

		for(var i = 0; i < files.length; i++) {
			console.log(files[i])
			_name = getNewName(files[i]);
			console.log(_name);
			if (_name) {
				fs.rename('./'+ files[i], './'+ _name + '.m4a', (err)=> {
					console.log(err);
				});
			}
		}
	});
});

function getNewName(oldName) {
	var tmp = '';
	for (var i = 0; i < newNames.length; i++) {
		tmp = newNames[i].split('@');
		if (tmp[0].replace(/^\s+/, '') == oldName) {
			return tmp[1];
		}
	}

	return null;
}
