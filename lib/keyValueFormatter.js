var bunyan = require('./bunyan');

function formatRecordToKeyValue(rec) {
	var key;
	var messages = [];

	for (key in rec) {
		if (rec[key]) {
			var encodedValue = JSON.stringify(rec[key], bunyan.safeCycles());
			if (key === 'err') {
				// Reencode errors so that they are correctly escaped for key-value
				encodedValue = JSON.stringify(encodedValue);
			}
			messages.push('"' + key + '"=' + encodedValue);
		}
	}
	return messages.join(' ');
}

module.exports = formatRecordToKeyValue;
