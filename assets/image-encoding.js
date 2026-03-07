let originalImage = null;
let scaledImage = null;

let imageType = null; // image/jpeg | image/png

let originalWidth = null;
let originalHeight = null;
let scaledWidth = null;
let scaledHeight = null;

const pngPrefix = "data:image/png;base64,";
const jpgPrefix = "data:image/jpeg;base64,";

// page elements
let buttons = document.getElementsByTagName('button');

let filename = document.getElementById("fileName");
let widthEle = document.getElementById("width");
let heightEle = document.getElementById("height");

let imgEle = document.getElementById("selected-image");


function init() {
	refreshButtons()
}

function refreshButtons() {
	for (let i = 0; i < buttons.length; i++) {
	    let button = buttons[i];
	    button.disabled = !originalImage?.length
	}
}

function handleImagePickerChange (files) {
	filename.innerText = files[0].name;
	imageType = files[0].type;


	const reader = new FileReader();
	reader.onload = (e) => {
		originalImage = e.target.result;
		
		imgEle.src = originalImage;
		imgEle.onload = () => {
			widthEle.innerText = imgEle.naturalWidth
			originalWidth = imgEle.naturalWidth

			heightEle.innerText = imgEle.naturalHeight
			originalHeight = imgEle.naturalHeight			
		}


		refreshButtons()
	}

	reader.readAsDataURL(files[0]);
}

async function copyImage() {
	const data =
		(scaledImage ?? originalImage)
			.replace(pngPrefix, "")
			.replace(jpgPrefix, "")

	const clipboardItem = new ClipboardItem({
		["text/plain"]: data,
	});
	await navigator.clipboard.write([clipboardItem]);
}

function scaleImage(scale) {
	imgEle.onload = () => {
		widthEle.innerText = imgEle.naturalWidth
		scaledWidth = imgEle.naturalWidth

		heightEle.innerText = imgEle.naturalHeight
		scaledHeight = imgEle.naturalHeight			
	}
	if (scale == 1) {
		scaledImage = null;
		imgEle.src = originalImage;
	}
	else {
	    const canvasTmp = document.createElement("canvas");
	    const context = canvasTmp.getContext("2d");

	    canvasTmp.width = originalWidth * scale;
	    canvasTmp.height = originalHeight * scale;

    	const tempImg = new Image(originalWidth, originalHeight);
    	tempImg.onload = () => {
		    context.drawImage(
		    	tempImg, 0, 0,
		    	originalWidth * scale,
		    	originalHeight * scale);

		    scaledImage = canvasTmp.toDataURL(imageType);
		    imgEle.src = scaledImage;    		
    	}
    	tempImg.src = originalImage;
	}
}
