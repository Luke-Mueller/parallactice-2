// HTML Selectors
const container = document.getElementById("container");
const h1 = document.getElementsByTagName('h1');
const itemsArr = [];

//  Vars
const mouse = {
  x: window.innerHeight * 0.5,
  y: window.innerWidth * 0.5,
};

// Input
const input = {
  mouseX: {
    start: 0,
    end: window.innerWidth,
    current: mouse.x,
  },
  mouseY: {
    start: 0,
    end: window.innerHeight,
    current: mouse.y,
  },
};
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

// Output
const output = {
  blur: {
    start: 0,
    range: 10,
  },
  x: {
    start: -150,
    end: 150,
    current: 0,
  },
  y: {
    start: -150,
    end: 150,
    current: 0,
  },
  zIndex: {
    range: 10000
  },
  opacity: {
    start: 0,
    end: 1.5,
    current: 0
  }
};
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;

for (let i = 0; i < 70; i++) {
  // create new element
  const item = document.createElement("div");
  item.className = "item";
  itemsArr.push(item);

  // create new leaf
  const leaf = document.createElement("div");
  leaf.className = "leaf";
  item.appendChild(leaf);

  // add element to container
  container.appendChild(item);

  // random width, height, depth, rotation, background-image
  const depth = Math.random();
  const rotateNum = 360 * depth;
  const imageNum = Math.ceil(Math.random() * 9);
  const blur = (depth - output.blur.start) * output.blur.range;
  const zIndex = output.zIndex.range * depth;

  item.dataset.depth = depth;
  item.style.width = (300 * depth + 50) / 10 + "rem";
  item.style.height = (300 * depth + 50) / 10 + "rem";
  item.style.filter = `blur(${output.blur.range - blur}px)`;
  item.style.left = `${Math.random() * 100 - 20}%`;
  item.style.top = `${Math.random() * 100 - 20}%`;
  item.style.zIndex = parseInt(zIndex);

  leaf.style.transform = `rotate(${rotateNum}deg)`;
  leaf.style.backgroundImage = `url(assets/leaf-${imageNum}.png)`;
}

// Listeners
const updateInputs = () => {
  input.mouseX.current = mouse.x;
  input.mouseY.current = mouse.y;

  input.mouseX.fraction =
    (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
  input.mouseY.fraction =
    (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
};

const updateOutputs = () => {
  output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);
  output.y.current = output.y.end - (input.mouseY.fraction * output.y.range);
  output.opacity.current = output.opacity.start - 0.5 + (input.mouseY.fraction * output.opacity.end);
};

const updateItems = () => {
  itemsArr.forEach((item) => {
    const depth = parseFloat(item.dataset.depth * 10);
    const itemOutput = {
      x: output.x.current * depth,
      y: output.y.current * depth,
    };

    item.style.transform = `translate(${itemOutput.x}px, ${itemOutput.y}px)`;
  });

  h1[0].style.opacity = output.opacity.current;
};

const resizeHandler = () => {
  input.mouseX.end = window.innerWidth;
  input.mouseY.end = window.innerHeight;

  input.mouseX.range = input.mouseX.end - input.mouseX.start;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;
};
const mouseMoveHandler = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  updateInputs();
  updateOutputs();
  updateItems();
};

window.addEventListener('mousemove', mouseMoveHandler);
window.addEventListener('resize', resizeHandler);
