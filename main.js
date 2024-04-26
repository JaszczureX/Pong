const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

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

let ballSpeedX = 2;
let ballSpeedY = 2;

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

  if (ballY + ballSize <= 20 || ballY + ballSize >= ch) {
    ballSpeedY = ballSpeedY * -1;
  } else if (ballX + ballSize <= 20 || ballX + ballSize == cw) {
    ballSpeedX = ballSpeedX * -1;
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

document.addEventListener("keydown", checkKey);

function checkKey(e) {
  e = e || window.Event;
  if (playerY < 0) {
    playerY = 0;
  } else if (playerY > 400) {
    playerY = 400;
  } else {
    if (e.keyCode == "38") {
      playerY -= 10;
    } else if (e.keyCode == "40") {
      playerY += 10;
    }
  }
}


function game() {
  table();
  ball();
  playerPaddel();
  BotPaddel();
}

setInterval(game, 1000 / 120);
