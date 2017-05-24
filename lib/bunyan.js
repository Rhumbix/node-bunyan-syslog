// Harcoded from https://github.com/trentm/node-bunyan so this module
// can have minimal dependencies

var bunyan = {
	FATAL: 60,
	ERROR: 50,
	WARN:  40,
	INFO:  30,
	DEBUG: 20,
	TRACE: 10,

	safeCycles: function safeCycles() {
		var seen = [];
		function bunyanCycles(k, v) {
			if (!v || typeof (v) !== 'object') {
				return (v);
			}
			if (seen.indexOf(v) !== -1) {
				return ('[Circular]');
			}
			seen.push(v);
			return (v);
		}

		return (bunyanCycles);
	}
};

module.exports = bunyan;