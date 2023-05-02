export default class ColorPicker {
	constructor(img) {
		const { width, height } = img;
		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		const { data } = ctx.getImageData(0, 0, width, height);
		this.width = width;
		this.height = height;
		this.data = data;
	}
	fromNormal([ nx, ny ]) {
		if (nx < -1 || nx >= 1 || ny < -1 || ny >= 1) {
			return null;
		}
		const { data, width, height } = this;
		const x = (nx + 1)/2*width;
		const y = (1 - ny)/2*height;
		const row = Math.floor(y);
		const col = Math.floor(x);
		const index = (row*width + col)*4;
		const r = data[index + 0];
		const g = data[index + 1];
		const b = data[index + 2];
		return `rgb(${r}, ${g}, ${b})`;
	}
}
