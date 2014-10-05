var globalize = require('globalizejs');
var ThreejsLabel = {
	sampleFunction: function(){
		console.log("sample core function!");
	},
	utils: require('./utils'),
	label: require('./label'),
	view: require('./view')
};
globalize('ThreejsLabel', ThreejsLabel);
module.exports = ThreejsLabel;