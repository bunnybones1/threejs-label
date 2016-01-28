var defaults = require('lodash.defaults');
function Label(text, properties) {
	properties = properties || {};
	properties = defaults(properties, {
		height: 0,
		size: 16,
		hover: 0.30,

		curveSegments: 0,

		bevelThickness: 0.02,
		bevelSize: 0.015,
		bevelSegments: 3,
		bevelEnabled: false,

		// font: "cranberry gin", // helvetiker, optimer, gentilis, droid sans, droid serif
		font: "systematic j", // helvetiker, optimer, gentilis, droid sans, droid serif
		weight: "normal", // normal bold
		style: "normal", // normal italic

		material: 0,
		extrudeMaterial: 1,
		alignX: 0.5,
		alignY: 0.5
	});


	if(!properties.material) {
		properties.material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			emissive: 0xffffff,
			lights: false,
			fog: false,
			// wireframe: true
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

	function generateBG() {
		if(properties.bg === true) {
			properties.bg = new THREE.Mesh(planeGeom, properties.bgMaterial);
			this.add(properties.bg);
		}
		if(properties.bg) {
			var textBounds = this.textMesh.geometry.boundingBox;
			var planeWidth = textBounds.max.x - textBounds.min.x;
			var planeHeight = textBounds.max.y - textBounds.min.y;
			var planeGeom = new THREE.PlaneGeometry(planeWidth, planeHeight);
			properties.bg.position.x = textBounds.min.x + planeWidth * .5;
			properties.bg.position.y = textBounds.min.y + planeHeight * .5;
		}
	}

	Object.defineProperty(this, 'text', {
		set: function(value) {
			if(value === this._text) return;
			this._text = value;
			if(this.textMesh) {
				this.remove(this.textMesh);
				this.textMesh.geometry.dispose();
			}

			var textGeo = new THREE.TextGeometry(value, properties);
			this.textMesh = new THREE.Mesh(textGeo, properties.material);
			this.add(this.textMesh);
			this.textMesh.rotation.x = Math.PI;
			textGeo.computeBoundingBox();
			textGeo.computeVertexNormals();
			generateBG.call(this);
		},
		get: function() {
			return this._text;
		}
	})
	THREE.Object3D.call(this);
	this.text = text;

}

Label.prototype = Object.create(THREE.Object3D.prototype);

module.exports = Label;