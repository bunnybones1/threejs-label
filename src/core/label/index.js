var _ = require('lodash');
function Label(text, properties, material, camera, bg) {
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
	}, {} || properties);


	var textGeo = new THREE.TextGeometry( text, properties);

	textGeo.computeBoundingBox();
	textGeo.computeVertexNormals();

	material = material || new THREE.MeshBasicMaterial({
		color: 0xffffff,
		emissive: 0xffffff,
		lights: false,
		fog: false
	});

	var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

	THREE.Mesh.call(this, textGeo, material);

	this.position.x = centerOffset;
	this.position.z = 0;

	if(bg) {
		if(bg === true) {
			var textBounds = textGeo.boundingBox;
			var planeWidth = textBounds.max.x - textBounds.min.x;
			var planeHeight = textBounds.max.y - textBounds.min.y;
			var planeGeom = new THREE.PlaneGeometry(planeWidth, planeHeight);
			var bgMaterial = new THREE.MeshBasicMaterial({
				color: 0xffffff,
				emissive: 0xffffff,
				lights: false,
				fog: false,
				transparent: true,
				opacity: 0.2
			})
			bg = new THREE.Mesh(planeGeom, bgMaterial);
		}
		this.add(bg);
		bg.position.x = textBounds.min.x + planeWidth * .5;
		bg.position.y = textBounds.min.y + planeHeight * .5;
	}
}

Label.prototype = Object.create(THREE.Mesh.prototype);

module.exports = Label;