import CameraMapper from './camera-mapper.js';
import ColorPicker from './color-picker.js';
import loadImage from './load-image.js';

const canvas = document.querySelector('canvas');
const { width, height } = canvas;
const ctx = canvas.getContext('2d');

const canvasPosToAzmAlt = (x, y) => {
	const azm = (x/width + 0.5)%1*Math.PI*2;
	const alt = (0.5 - y/height)*Math.PI;
	return [ azm, alt ];
};

const addImage = async (src, config) => {
	const img = await loadImage(src);
	const colorPicker = new ColorPicker(img);
	const mapper = new CameraMapper(config);
	let it = 0;
	for (let y=0; y<height; ++y) {
		for (let x=0; x<width; ++x) {
			const azmAlt = canvasPosToAzmAlt(x + 0.5, y + 0.5);
			const normal = mapper.azmAltToViewNormal(azmAlt);
			if (normal !== null) {
				const color = colorPicker.fromNormal(normal);
				ctx.fillStyle = color;
				ctx.fillRect(x, y, 1, 1);
			}
			if (++it % 5000 === 0) {
				await new Promise(f => setTimeout(f, 0));
			}
		}
	}
};
