const SIZE = 7;
const container = document.querySelector(".container");
const reset = document.querySelector("#reset");
const COLOUR = ["blue", "white", "yellow"];
const matrix = new Array(SIZE).fill().map(() => Array(SIZE).fill(1));
container.style.gridTemplateColumns = `repeat(${SIZE}, 50px)`;

function renderBox({ container, color = "white", box = null }) {
  if (box) {
    box.style.backgroundColor = color;
    return;
  }
  box = document.createElement("div");
  box.classList.add("box");
  container.appendChild(box);
  return box;
}

function render({ matrix, init = false, container }) {
  if (init) container.innerHTML = "";
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (init) {
        let box = renderBox({ container });
        box.dataset.row = i;
        box.dataset.col = j;
      }
    }
  }
}

function update(container, matrix) {
  const boxes = container.querySelectorAll(".box");
  boxes.forEach((box) => {
    let i = +box.dataset.row;
    let j = +box.dataset.col;
    let code = matrix[i][j];
    renderBox({ container, color: COLOUR[code], box });
  });
}

function cross(matrix, m, n) {
  const sum = m + n;
  const dif = m - n;
  container.childNodes.forEach((box) => {
    if (box.className !== "box") return;
    let i = +box.dataset.row;
    let j = +box.dataset.col;
    if (i == m && j == n) {
      matrix[i][j] = 2;
    } else if (i + j === sum || i - j === dif) {
      matrix[i][j] = 0;
    } else matrix[i][j] = 1;
  });
}
render({ matrix, init: true, container });
container.addEventListener("click", function (e) {
  //   console.log(e.target);
  const box = e.target;
  let i = +box.dataset.row;
  let j = +box.dataset.col;
  cross(matrix, i, j);
  update(container, matrix);
});
reset.addEventListener("click", function () {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      matrix[i][j] = 1;
    }
  }
  update(container, matrix);
});
