const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");
const result = document.querySelector("result");

canv.width = 1000;
canv.height = 500;

const cw = canv.width;
const ch = canv.height;
// BALL ATRIBUTES

const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

// paddel

const paddelHeight = 100;
const paddelWitdth = 20;

const playerX = 70;
const botX = 910;

let playerY = 200;
let botY = 200;

// mid line

const lineheight = 16;
const linewidth = 6;

// speed

let botPoints = 0;
let playerPoints = 0;

// points
let ballSpeedX = 2;
let ballSpeedY = 2;

function addPointToPlayer() {
  playerPoints++;
  result.innerHTML = `dada  `;
}

function addPointToBot() {
  botPoints++;
  result.innerHTML = `${playerPoints} : ${botPoints}`;
}

function playerPaddel() {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(playerX, playerY, paddelWitdth, paddelHeight);
}

function BotPaddel() {
  ctx.fillStyle = "red";
  ctx.fillRect(botX, botY, paddelWitdth, paddelHeight);
}

function ball() {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY + ballSize == 10 || ballY + ballSize >= ch) {
    ballSpeedY = ballSpeedY * -1;
  } else if (ballX + ballSize == 80 || ballX + ballSize == cw - 80) {
    ballX = cw / 2 - ballSize / 2;
    if (ballSpeedX > 0) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballSpeedX = -ballSpeedX;
      addPointToPlayer();
    }
  } else if (
    ballX <= playerX + ballSize &&
    ballY + ballSize / 2 >= playerY &&
    ballY + ballSize / 2 <= playerY + paddelHeight
  ) {
    ballSpeedX = -ballSpeedX;
  } else if (
    ballX + ballSize >= botX &&
    ballY + ballSize / 2 >= botY &&
    ballY + ballSize / 2 <= botY + paddelHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }
}

function table() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cw, ch);
  //mid lines
  for (let lineY = 20; lineY < ch; lineY += 30) {
    ctx.fillStyle = "gray";
    ctx.fillRect(cw / 2 - 3, lineY, linewidth, lineheight);
  }
}

let keys = {};

document.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
});

document.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});

function checkKeys() {
  if (keys[87]) {
    // klawisz w górę dla gracza
    playerY -= 2;
  } else if (keys[83]) {
    // klawisz w dół dla gracza
    playerY += 2;
  }
  if (keys[38]) {
    // klawisz w górę dla bota
    botY -= 2;
  } else if (keys[40]) {
    // klawisz w dół dla bota
    botY += 2;
  }

  if (playerY < 0) {
    playerY = 0;
  } else if (playerY > 400) {
    playerY = 400;
  }
  if (botY < 0) {
    botY = 0;
  } else if (botY > 400) {
    botY = 400;
  }
}

// sprawdzanie stanu klawiszy co 10 milisekund

function game() {
  table();
  ball();
  playerPaddel();
  BotPaddel();
}

setInterval(game, 1000 / 120);
setInterval(checkKeys, 1000 / 120);
