var _ = require('lodash');
function Label(text, properties) {
	properties = _.assign({
		height: 0,
		size: .70,
		hover: .30,

		curveSegments: 0,

		bevelThickness: .02,
		bevelSize: .015,
		bevelSegments: 3,
		bevelEnabled: false,

		font: "cranberry gin", // helvetiker, optimer, gentilis, droid sans, droid serif
		weight: "normal", // normal bold
		style: "normal", // normal italic

		material: 0,
		extrudeMaterial: 1
	}, properties || {});


	if(!properties.material) {
		properties.material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			emissive: 0xffffff,
			lights: false,
			fog: false
		});
	}

	if(!properties.bgMaterial) {
		properties.bgMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			emissive: 0xffffff,
			lights: false,
			fog: false,
			transparent: true,
			opacity: 0.2
		});
	}

	var textGeo = new THREE.TextGeometry( text, properties);

	textGeo.computeBoundingBox();
	textGeo.computeVertexNormals();
	THREE.Mesh.call(this, textGeo, properties.material);
	
	if(properties.bg === true) {
		properties.bg = new THREE.Mesh(planeGeom, properties.bgMaterial);
		this.add(properties.bg);
	}
	if(properties.bg) {
		var textBounds = textGeo.boundingBox;
		var planeWidth = textBounds.max.x - textBounds.min.x;
		var planeHeight = textBounds.max.y - textBounds.min.y;
		var planeGeom = new THREE.PlaneGeometry(planeWidth, planeHeight);
		properties.bg.position.x = textBounds.min.x + planeWidth * .5;
		properties.bg.position.y = textBounds.min.y + planeHeight * .5;
	}
	


	var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );


	this.position.x = centerOffset;
	this.position.z = 0;

}

Label.prototype = Object.create(THREE.Mesh.prototype);

module.exports = Label;