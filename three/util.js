//////////////////////////////////////////////////////////////////////
// util.js
//
// [required]
// Import THREE libraries in advance.
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// Class
//////////////////////////////////////////////////////////////////////
class Util {

    //////////////////////////////////////////////////////////////////////
    // New BufferAttribute with image object.
    // 
    // [param]
    // - image: Image object.
    //////////////////////////////////////////////////////////////////////
    static NewBufferAttributeWithImage(image) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const imgData = ctx.getImageData(0, 0, image.width, image.height).data;
        const numPerPoint = 4;  // imgData: Uint8ClampedArray: 1 point per 4 items of the array, it means "r", "g", "b", "a" (rgba).
        const rLocation = 0;    // rgba: red
        const gLocation = 1;    // rgba: green
        const bLocation = 2;    // rgba: blue
        const aLocation = 3;    // rgba: alpha
        const rgba = 255;       // rgba: maximum
        const position = [];
        const color = [];
        const alpha = [];

        for (let y = 0; y < image.height; y += numPerPoint) {
            for (let x = 0; x < image.width; x += numPerPoint) {
                const index = (y * image.width + x) * 4;
                const r = imgData[index + rLocation] / rgba;
                const g = imgData[index + gLocation] / rgba;
                const b = imgData[index + bLocation] / rgba;
                const a = imgData[index + aLocation] / rgba;
                const pX = x - image.width / 2;
                const pY = -(y - image.height / 2);
                const pZ = 0;
 
                position.push(pX, pY, pZ);
                color.push(r, g, b);
                alpha.push(a);
            }
        }

        const positionAttr = new THREE.BufferAttribute(new Float32Array(position), 3);
        const colorAttr = new THREE.BufferAttribute(new Float32Array(color), 3);
        const alphaAttr = new THREE.BufferAttribute(new Float32Array(alpha), 1);
        const rand = [];
        for (let i = 0; i < positionAttr.length / 3; i++) {
            rand.push(Math.random() - 1.0);
        }
        const randAttr = new THREE.BufferAttribute(new Float32Array(rand), 1);

        return {
            position: positionAttr,
            color: colorAttr,
            alpha: alphaAttr,
            rand: randAttr,
        }
}

export { Util };
