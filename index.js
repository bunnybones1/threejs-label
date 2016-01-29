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

		color: 0xffffff,
		bg: false,
		bgColor: 0x7f7f7f,
		bgAlpha: 0.5,
		bgMargin: 10,

		// font: 'cranberry gin', // helvetiker, optimer, gentilis, droid sans, droid serif
		font: 'systematic j', // helvetiker, optimer, gentilis, droid sans, droid serif
		weight: 'normal', // normal bold
		style: 'normal', // normal italic

		material: 0,
		extrudeMaterial: 1,
		alignX: 0,
		alignY: 0.5
	});


	if(!properties.material) {
		properties.material = new THREE.MeshBasicMaterial({
			color: properties.color
		});
	}

	if(!properties.bgMaterial && properties.bg) {
		properties.bgMaterial = new THREE.MeshBasicMaterial({
			color: properties.bgColor,
			transparent: true,
			opacity: 0.5,
			side: THREE.DoubleSide
		});
	}

	function generateBG() {
		if(properties.bg) {
			var textBounds = this.textMesh.geometry.boundingBox.clone();
			textBounds.expandByScalar(properties.bgMargin);
			var size = textBounds.size();
			if(properties.bg === true) {
				var planeGeom = new THREE.PlaneGeometry(1, 1);
				properties.bg = new THREE.Mesh(planeGeom, properties.bgMaterial);
				this.add(properties.bg);
				this.bg = properties.bg;
			}
			properties.bg.scale.set(size.x, size.y, 1);
			properties.bg.position.x = textBounds.min.x + size.x * 0.5;
			properties.bg.position.y = -textBounds.min.y - size.y * 0.5;
			properties.bg.position.z = -1;
		}
	}

	Object.defineProperty(this, 'text', {
		set: function(value) {
			if(value === this._text) {
				return;
			}
			this._text = value;
			if(this.textMesh) {
				this.remove(this.textMesh);
				this.textMesh.geometry.dispose();
			}

			var textGeo = new THREE.TextGeometry(value, properties);
			textGeo.computeBoundingBox();
			var size = textGeo.boundingBox.size();
			textGeo.vertices.forEach(function(vertex){
				vertex.x -= size.x * properties.alignX;
				vertex.y -= size.y * properties.alignY;
			});
			textGeo.computeBoundingBox();
			this.textMesh = new THREE.Mesh(textGeo, properties.material);
			this.add(this.textMesh);
			this.textMesh.rotation.x = Math.PI;
			textGeo.computeVertexNormals();
			generateBG.call(this);
		},
		get: function() {
			return this._text;
		}
	});
	THREE.Object3D.call(this);
	this.text = text;

}

Label.prototype = Object.create(THREE.Object3D.prototype);

module.exports = Label;
