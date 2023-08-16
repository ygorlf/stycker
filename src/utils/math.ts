export const degToRad = (angle) => {
  return (angle / 180) * Math.PI;
}

export const calcStickerArea = (shape) => {
  const angleRad = degToRad(shape.rotation);

  const x1 = shape.x;
  const y1 = shape.y;
  const x2 = x1 + shape.width * Math.cos(angleRad);
  const y2 = y1 + shape.width * Math.sin(angleRad);
  const x3 = shape.x
    + shape.width * Math.cos(angleRad)
    + shape.height * Math.sin(-angleRad);
  const y3 = shape.y
    + shape.height * Math.cos(angleRad)
    + shape.width * Math.sin(angleRad);
  const x4 = shape.x + shape.height * Math.sin(-angleRad);
  const y4 = shape.y + shape.height * Math.cos(angleRad);

  const leftX = Math.min(x1, x2, x3, x4);
  const rightX = Math.max(x1, x2, x3, x4);
  const topY = Math.min(y1, y2, y3, y4);
  const bottomY = Math.max(y1, y2, y3, y4);

  return {
    x: leftX,
    y: topY,
    width: rightX - leftX,
    height: bottomY - topY,
  };
}

export const calcStickersArea = (stickers) => {
  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;

  stickers.forEach((sticker) => {
    const rect = calcStickerArea(sticker);
    x1 = Math.min(x1, rect.x);
    y1 = Math.min(y1, rect.y);
    x2 = Math.max(x2, rect.x + rect.width);
    y2 = Math.max(y2, rect.y + rect.height);
  });

  return {
    x: x1,
    y: y1,
    width: x2 - x1,
    height: y2 - y1,
    rotation: 0,
  };
}

export const isOverlap = (sticker1, sticker2) => {
  const offset = 0;
  if (sticker1.x - offset > sticker2.x + sticker2.width) {
    return false;
  }
  if (sticker1.x + sticker1.width + offset < sticker2.x) {
    return false;
  }
  if (sticker1.y - offset > sticker2.y + sticker2.height) {
    return false;
  }
  if (sticker1.y + sticker1.height + offset < sticker2.y) {
    return false;
  }
  return true;
}