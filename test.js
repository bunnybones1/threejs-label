var loadandrunscripts = require('loadandrunscripts');
loadandrunscripts([
	"lib/typeface.js",
],
onReadyTypeFace);

function onReadyTypeFace(){
	loadandrunscripts([
		"bower_components/three.js/three.js",
	], function() {
		loadandrunscripts([
			"lib/cranberry_gin_regular.typeface.js",
			"lib/systematic_j_cool.typeface.js",
		], onReady);
	});
}


function onReady() {
	var View = require('threejs-managed-view').View;
	var Label = require('./index');
	//all you really need
	var view = new View({
		camera: new THREE.OrthographicCamera(-10, 10, 10, -10, -1000, 1000)
	});
	var label = new Label(
		'Hello World!', 
		{
			bg: true
		}
	);
	view.scene.add(label);
	label.position.set(100, 100, 0);

	//on every frame
	view.renderManager.onEnterFrame.add(function() {
		label.text = 'Test:' + Math.random();
	})
}
