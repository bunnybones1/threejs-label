var globalize = require('globalizejs');
var ThreejsLabel = {
	examples: {
		SampleExample: require('./SampleExample')
	}
};
globalize('ThreejsLabel', ThreejsLabel);
module.exports = ThreejsLabel;