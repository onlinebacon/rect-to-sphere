import Transform from './transform.js';
import Vector from './vector.js';

const calcUnsignedAngle = (adj, opp) => {
	const len = Math.sqrt(adj*adj + opp*opp);
	if (len === 0) {
		return 0;
	}
	if (opp >= 0) {
		return Math.acos(adj/len);
	}
	return Math.PI*2 - Math.acos(adj/len);
};

const vecToAzmAlt = ([ x, y, z ]) => {
	const azm = calcUnsignedAngle(-z, x);
	const alt = Math.asin(y);
	return [ azm, alt ];
};

export default class CameraMapper {
	constructor({
		azm = 0,
		alt = 0,
		focalLength = 50,
		ratio = 16/9,
	}) {
		this.tm = new Transform().rotX(-alt).rotY(azm);
		this.iv = new Transform().rotY(-azm).rotX(alt);
		this.dx = 36/2/focalLength;
		this.dy = this.dx/ratio;
	}
	viewNormalToAzmAlt([ nx, ny ]) {
		const vec = new Vector(nx*this.dx, ny*this.dy, -1);
		vec.transform(this.tm);
		return vecToAzmAlt(vec);
	}
	azmAltToViewNormal([ azm, alt ]) {
		const vec = new Vector(0, 0, -1).rotX(-alt).rotY(azm);
		vec.transform(this.iv);
		if (vec.z >= 0) {
			return null;
		}
		vec.scale(1/-vec.z);
		const nx = vec.x/this.dx;
		if (nx < -1 || nx > 1) {
			return null;
		}
		const ny = vec.y/this.dy;
		if (ny < -1 || ny > 1) {
			return null;
		}
		return [ nx, ny ];
	}
}
