var bunyan = require('./bunyan');

function formatRecordToKeyValue(rec) {
	var key;
	var msg = '';

	for (key in rec) {
		var encodedValue;
		msg += '"' + key + '"=';
		encodedValue = JSON.stringify(rec[key], bunyan.safeCycles());
		if (key === 'err') {
			// Reencode errors so that they are correctly escaped for key-value
			encodedValue = JSON.stringify(encodedValue);
		}
		msg += encodedValue + ' ';
	}
	return msg.trim();
}

module.exports = formatRecordToKeyValue;
