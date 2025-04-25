const container = document.querySelector("#container");
const reset = document.querySelector("#reset");
const container2 = document.querySelector("#container2");
const reset2 = document.querySelector("#reset2");

class CrossContainer {
  #container;
  #size;
  #matrix;
  #colors;
  constructor(
    container,
    size = 5,
    boxSize = "50px",
    colors = ["blue", "white", "yellow"]
  ) {
    this.#matrix = new Array(size).fill().map(() => Array(size).fill(1));
    this.#container = container;
    this.#container.style.gridTemplateColumns = `repeat(${size}, ${boxSize})`;
    this.#container.style.gridTemplateRows = `repeat(${size}, ${boxSize})`;
    this.#size = size;
    this.#colors = colors;
    this.#render(true);
  }
  #renderBox = function (color = this.#colors[1], box = null) {
    if (!box) {
      box = document.createElement("div");
      box.classList.add("box");
      this.#container.appendChild(box);
    }
    box.style.backgroundColor = color;
    return box;
  };

  #render = function (init = false) {
    if (init) this.#container.innerHTML = "";
    for (let i = 0; i < this.#size; i++) {
      for (let j = 0; j < this.#size; j++) {
        if (init) {
          let box = this.#renderBox(this.#colors[1]);
          box.dataset.row = i;
          box.dataset.col = j;
        }
      }
    }
  };

  #update = function () {
    const boxes = this.#container.querySelectorAll(".box");
    boxes.forEach((box) => {
      let i = +box.dataset.row;
      let j = +box.dataset.col;
      let code = this.#matrix[i][j];
      this.#renderBox(this.#colors[code], box);
    });
  };

  #cross = function (m, n) {
    const sum = m + n;
    const dif = m - n;
    this.#container.childNodes.forEach((box) => {
      if (box.className !== "box") return;
      let i = +box.dataset.row;
      let j = +box.dataset.col;
      if (i == m && j == n) {
        this.#matrix[i][j] = 2;
      } else if (i + j === sum || i - j === dif) {
        this.#matrix[i][j] = 0;
      } else this.#matrix[i][j] = 1;
    });
  };
  onTileClick = function (e) {
    const box = e.target;
    let i = +box.dataset.row;
    let j = +box.dataset.col;
    this.#cross(i, j);
    this.#update();
  };
  onResetClick = function () {
    for (let i = 0; i < this.#size; i++) {
      for (let j = 0; j < this.#size; j++) {
        this.#matrix[i][j] = 1;
      }
    }
    this.#update();
  };
}
const CrossGrid = new CrossContainer(container);
container.addEventListener("click", function (e) {
  //   console.log(e.target);
  CrossGrid.onTileClick(e);
});
reset.addEventListener("click", function () {
  CrossGrid.onResetClick();
});
const CrossGrid2 = new CrossContainer(container2, 6, "50px", [
  "#192304",
  "grey",
  "#228833",
]);
container2.addEventListener("click", function (e) {
  CrossGrid2.onTileClick(e);
});
reset2.addEventListener("click", function () {
  CrossGrid2.onResetClick();
});
