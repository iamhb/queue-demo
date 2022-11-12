const sharp = require("sharp");

const sourceImageLocation = './unprocessed-images/nature.png';

/**
 * Get image details
 */
async function getImageMetadata() {
    try {
        const imageMetaData = await sharp(sourceImageLocation).metadata();
        console.log(imageMetaData);
    } catch (error) {
        console.log(`An error while processing: ${error}`);
    }
}

/**
 * Resize image to 150 x 150
 */
async function resizeImage() {
    let resizeTo = {
        width: 150,
        height: 150,
    };
    let resizedImageLocation = './processed-images/nature-150x150.png';
    try {
        await sharp(sourceImageLocation).resize(resizeTo).toFile(resizedImageLocation);
        console.log("Resize done");
    } catch (error) {
        console.log(`An error while processing: ${error}`);
    }
}

/**
 * Crop image
 */
async function cropImage() {
    let cropSize = {
        width: 400, height: 200, left: 200, top: 400
    };
    let croppedImageLocation = './processed-images/nature-crop.png';
    try {
        await sharp(sourceImageLocation).extract(cropSize).toFile(croppedImageLocation);
        console.log("Crop done");
    } catch (error) {
        console.log(`An error while processing: ${error}`);
    }
}

/**
 * Rotate 90 degree
 */
async function rotateImage() {
    const rotatedImageLocation = './processed-images/rotate-90-degree.png';
    try {
        await sharp(sourceImageLocation).rotate(90).toFile(rotatedImageLocation);
        console.log("Rotate done");
    } catch (error) {
        console.log(`An error while processing: ${error}`);
    }
}

/**
 * Flop volcano image and then composite on nature image
 */
async function compositeImage() {
    const compositeImageLocation = './processed-images/composite.png';
    const flopVolcanoImageLocation = './processed-images/flop-volcano.png';
    const volcanoImage = './unprocessed-images/volcano.png';
    const composites = [
        {
            input: flopVolcanoImageLocation,
            top: 200,
            left: 1070,
        },
    ];

    try {
        // flop volcano image, then composite
        await sharp(volcanoImage).flop().toFile(flopVolcanoImageLocation);
        await sharp(sourceImageLocation).composite(composites).toFile(compositeImageLocation);
        console.log("Composite done");
    } catch (error) {
        console.log(`An error while processing: ${error}`);
    }
}

/**
 * Add text on image
 */
async function addTextOnImage() {
    try {
        const width = 600;
        const height = 300;
        const imageText = "Hello world!";
        const textOnImage = './processed-images/text-on-image.png';

        const svgImage = `
        <svg width="${width}" height="${height}">
        <style>
        .title { fill: #FFF; font-size: 80px; font-weight: bold;}
        </style>
        <text x="50%" y="50%" text-anchor="middle" class="title">${imageText}</text>
        </svg>`;
        const svgImageBuffer = Buffer.from(svgImage);

        const composites = [
            {
                input: svgImageBuffer,
                top: 0,
                left: 960,
            },
        ];
        await sharp(sourceImageLocation).composite(composites).toFile(textOnImage);
    } catch (error) {
        console.log(error);
    }
}


getImageMetadata();
resizeImage();
cropImage();
rotateImage();
compositeImage();
addTextOnImage();