let originalImage = null;
let scaledImage = null;
let imageType = null; // image/jpeg | image/png
let originalWidth = null;
let originalHeight = null;

function refreshButtons() {
	var buttons = document.getElementsByTagName('button');
	for (let i = 0; i < buttons.length; i++) {
	    let button = buttons[i];
	    button.disabled = !originalImage?.length
	}
}

function handleImagePickerChange (files) {
	const filename = document.getElementById("fileName");
	filename.innerText = files[0].name;
	const size = document.getElementById("size");
	size.innerText = files[0].size;
	imageType = files[0].type;


	const reader = new FileReader();
	reader.onload = (e) => {
		originalImage = e.target.result;
		const imgEle = document.getElementById("selected-image");
		imgEle.src = originalImage;

		const widthEle = document.getElementById("width");
		widthEle.innerText = imgEle.naturalWidth
		originalWidth = imgEle.naturalWidth

		const heightEle = document.getElementById("height");
		heightEle.innerText = imgEle.naturalHeight
		originalHeight = imgEle.naturalHeight

		refreshButtons()
	}

	reader.readAsDataURL(files[0]);
}

async function copyImage() {
	// TODO trim the prefix off of the base64 before copying
	 const clipboardItemData = {
		["text/plain"]: scaledImage ?? originalImage,
	};
	const clipboardItem = new ClipboardItem(clipboardItemData);
	await navigator.clipboard.write([clipboardItem]);
}

function scaleImage(image, width, height) {
    const canvasTmp = Canvas.createIfSupported();
    const context = canvasTmp.getContext2d();

    canvasTmp.setCoordinateSpaceWidth(width);
    canvasTmp.setCoordinateSpaceHeight(height);

    const imageElement = ImageElement.as(image.getElement());

    context.drawImage(imageElement, 0, 0, width, height);

    return canvasTmp.toDataUrl(imageType);
}