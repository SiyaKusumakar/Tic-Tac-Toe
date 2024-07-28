let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGame = document.querySelector("#newGame");
let winImg = document.querySelector(".winImg");
let drawImg = document.querySelector(".drawImg");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turnX = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetgame = () => {
  enableBtn();
  msgContainer.classList.add("hide");
  winImg.classList.add("hide");
  drawImg.classList.add("hide");
  turnX = true;
  count = 0;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      //playerX
      box.innerText = "X";
      turnX = false;
    } else {
      //playerO
      box.innerText = "O";
      turnX = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWin();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `It's a draw!`;
  msgContainer.classList.remove("hide");
  drawImg.classList.remove("hide");
  disableBtn();
};
const disbleBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  winImg.classList.remove("hide");
};
const checkWin = () => {
  for (let pattern of winPatterns) {
    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;

    if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        disbleBtn();
        showWinner(pos1Value);
        return true;
      }
    }
  }
};

newGame.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);
