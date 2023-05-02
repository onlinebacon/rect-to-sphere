import Vector from './vector.js';

export default class Transform {
	constructor() {
		this.i = new Vector(1, 0, 0);
		this.j = new Vector(0, 1, 0);
		this.k = new Vector(0, 0, 1);
	}
	sinCosRotX(sin, cos) {
		this.i.sinCosRotX(sin, cos);
		this.j.sinCosRotX(sin, cos);
		this.k.sinCosRotX(sin, cos);
		return this;
	}
	sinCosRotY(sin, cos) {
		this.i.sinCosRotY(sin, cos);
		this.j.sinCosRotY(sin, cos);
		this.k.sinCosRotY(sin, cos);
		return this;
	}
	sinCosRotZ(sin, cos) {
		this.i.sinCosRotZ(sin, cos);
		this.j.sinCosRotZ(sin, cos);
		this.k.sinCosRotZ(sin, cos);
		return this;
	}
	rotX(angle) { return this.sinCosRotX(Math.sin(angle), Math.cos(angle)); }
	rotY(angle) { return this.sinCosRotY(Math.sin(angle), Math.cos(angle)); }
	rotZ(angle) { return this.sinCosRotZ(Math.sin(angle), Math.cos(angle)); }
}
