// ⚠ MUST match your real image file name
const IMAGE_SRC = "picture.jpg";

const GRID = 3;

const puzzle = document.getElementById("puzzle");

let correctOrder = [];
let tiles = [];

function sliceImage() {
  const img = new Image();
  img.src = IMAGE_SRC;

  img.onload = () => {
    const tileWidth = img.width / GRID;
    const tileHeight = img.height / GRID;

    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = tileWidth;
        canvas.height = tileHeight;

        ctx.drawImage(
          img,
          x * tileWidth,
          y * tileHeight,
          tileWidth,
          tileHeight,
          0,
          0,
          tileWidth,
          tileHeight
        );

        const tileURL = canvas.toDataURL();
        correctOrder.push(tileURL);
      }
    }

    tiles = [...correctOrder];
    shuffle();
    render();
  };

  img.onerror = () => {
    alert("Image not found. Check file name in script.js");
  };
}

function shuffle() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
}

function render() {
  puzzle.innerHTML = "";

  tiles.forEach((t, index) => {
    const img = document.createElement("img");
    img.src = t;
    img.className = "tile";

    img.onclick = () => {
      if (index > 0) {
        [tiles[index], tiles[index - 1]] = [tiles[index - 1], tiles[index]];
        render();
        checkSolved();
      }
    };

    puzzle.appendChild(img);
  });
}

function checkSolved() {
  if (tiles.every((v, i) => v === correctOrder[i])) {
    document.getElementById("message").style.display = "block";
  }
}

sliceImage();