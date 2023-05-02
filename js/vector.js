import Transform from './transform.js';

export default class Vector extends Array {
	constructor(x = 0, y = 0, z = 0) {
		super(3);
		this[0] = x;
		this[1] = y;
		this[2] = z;
	}
	get x() { return this[0]; }
	get y() { return this[1]; }
	get z() { return this[2]; }
	set x(val) { this[0] = val; }
	set y(val) { this[1] = val; }
	set z(val) { this[2] = val; }
	sinCosRotX(sin, cos) {
		const [ x, y, z ] = this;
		this[0] = x;
		this[1] = y*cos + z*sin;
		this[2] = z*cos - y*sin;
		return this;
	}
	sinCosRotY(sin, cos) {
		const [ x, y, z ] = this;
		this[0] = x*cos - z*sin;
		this[1] = y;
		this[2] = z*cos + x*sin;
		return this;
	}
	sinCosRotZ(sin, cos) {
		const [ x, y, z ] = this;
		this[0] = x*cos + y*sin;
		this[1] = y*cos - x*sin;
		this[2] = z;
		return this;
	}
	rotX(angle) { return this.sinCosRotX(Math.sin(angle), Math.cos(angle)); }
	rotY(angle) { return this.sinCosRotY(Math.sin(angle), Math.cos(angle)); }
	rotZ(angle) { return this.sinCosRotZ(Math.sin(angle), Math.cos(angle)); }
	clone() {
		const [ x, y, z ] = this;
		return new Vector(x, y, z);
	}
	set([ x, y, z ]) {
		this[0] = x;
		this[1] = y;
		this[2] = z;
		return this;
	}
	fromCoord([ lat, lon ]) {
		const cosLat = Math.cos(lat);
		this[0] = Math.sin(lon)*cosLat;
		this[1] = Math.sin(lat);
		this[2] = Math.cos(lon)*cosLat;
		return this;
	}
	transform(t = new Transform()) {
		const [ x, y, z ] = this;
		const [ ix, iy, iz ] = t.i;
		const [ jx, jy, jz ] = t.j;
		const [ kx, ky, kz ] = t.k;
		this[0] = x*ix + y*jx + z*kx;
		this[1] = x*iy + y*jy + z*ky;
		this[2] = x*iz + y*jz + z*kz;
		return this;
	}
	len() {
		const [ x, y, z ] = this;
		return Math.sqrt(x*x + y*y + z*z);
	}
	scale(scale) {
		this[0] *= scale;
		this[1] *= scale;
		this[2] *= scale;
		return this;
	}
	normalize() {
		return this.scale(1/this.len());
	}
}
