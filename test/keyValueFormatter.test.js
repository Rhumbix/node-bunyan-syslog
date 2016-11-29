var test = require('tap').test;
var keyValueFormatter = require('../lib/keyValueFormatter');


test('write nothing for empty objects', function(t){
	var val = keyValueFormatter({});
	t.equal(val, '');
	t.end();
});


test('format simple object to key=value', function(t){
	var val = keyValueFormatter({key:'value'});
	t.equal(val, '"key"="value"');
	t.end();
});

test('format simple object with multiple properties to key=value', function(t){
	var val = keyValueFormatter({key:'value', otherKey:'otherValue'});
	t.equal(val, '"key"="value" "otherKey"="otherValue"');
	t.end();
});

test('format object with an err property to key=value with escaping', function(t){
	// Error object as it is sent by bunyan
	var errorObject = {
		message: "error is mandatory",
		name: "Error",
		stack: "Error: error is mandatory\n" +
		"    at checkParams \n" +
		"    at Promise.apply \n" +
		"    at Promise.promise.promiseDispatch\n" +
		"    at runSingle\n" +
		"    at flush\n" +
		"    at _combinedTickCallback\n" +
		"    at process._tickCallback"
	};
	var errorObjectStringified = '"{\\\"message\\\":\\\"error is mandatory\\\",\\\"name\\\":\\\"Error\\\",\\\"stack\\\":\\\"Error: error is mandatory\\\\n    at checkParams \\\\n    at Promise.apply \\\\n    at Promise.promise.promiseDispatch\\\\n    at runSingle\\\\n    at flush\\\\n    at _combinedTickCallback\\\\n    at process._tickCallback\\\"}"';

	var val = keyValueFormatter({key:'value', err: errorObject});
	t.equal(val, '"key"="value" "err"=' + errorObjectStringified);
	t.end();
});