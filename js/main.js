import CameraMapper from './camera-mapper.js';
import ColorPicker from './color-picker.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const degToRad = (deg) => deg*(Math.PI/180);

const canvasPosToAzmAlt = (x, y) => {
	const { width, height } = canvas;
	const azm = (x/width + 0.5)%1*Math.PI*2;
	const alt = (0.5 - y/height)*Math.PI;
	return [ azm, alt ];
};

const addImage = async (img, config) => {
	const colorPicker = new ColorPicker(img);
	const mapper = new CameraMapper(config);
	const { width, height } = canvas;
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

const inputs = Object.fromEntries([ ...document.querySelectorAll('input') ].map(
	item => {
		const id = item.getAttribute('id');
		return [ id, item ];
	}
));

const updateCanvasSize = () => {
	canvas.height = Number(inputs.height.value);
	canvas.width = canvas.height*2;
};

inputs.height.addEventListener('change', updateCanvasSize);

inputs.add.addEventListener('click', () => {
	inputs.file.click();
});

inputs.file.addEventListener('change', e => {
	const [ file ] = inputs.file.files;
	if (file == null) {
		return;
	}
	const r = new FileReader();
	r.onload = () => {
		const img = document.createElement('img');
		img.onload = () => {
			addImage(img, {
				azm: degToRad(inputs.azm.value),
				alt: degToRad(inputs.alt.value),
				focalLength: Number(inputs.fcl.value),
			});
		};
		img.src = r.result;
	};
	r.readAsDataURL(file);
});

updateCanvasSize();
