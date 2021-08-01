function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function isHorizontal(img) {
  return (img.width / img.height) > (9 / 16);
}

function setDimsByHeight(canvas, img) {
  canvas.height = img.height;
  canvas.width = img.height * (9 / 16);
}

function setDimsByWidth(canvas, img) {
  canvas.width = img.width;
  canvas.height = img.width * (16 / 9);
}

function getCanvas(img) {
  const canvas = document.createElement('canvas');
  if (isHorizontal(img)) setDimsByHeight(canvas, img);
  else setDimsByWidth(canvas, img);
  return canvas;
}

function draw(canvas, img) {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    img,
    (img.width - canvas.width) / 2,
    (img.height - canvas.height) / 2,
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );
}

function getBuf(img) {
  const canvas = getCanvas(img);
  draw(canvas, img);
  return canvas;
}

function getBufs(urls) {
  return Promise.all(urls.map(async (url) => {
    const img = await loadImg(url);
    return getBuf(img);
  }));
}

export default getBufs;
