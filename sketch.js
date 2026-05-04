//밝기 조절
let lightLevel;

//먼지 효과
let dustX = [];
let dustY = [];
let dustSize = [];
let dustSpeed = [];
let dustAlpha = [];

//유리 파편
let yellowGlass;
let redGlass;
let blueGlass;
let greenGlass;

//유리 파편들 사이즈
let glassW = 135;
let glassH = 130;

//유리 파편 위치
let yellowX = 360;
let yellowY = 60;
let redX = 570;
let redY = 190;
let blueX = 130;
let blueY = 180;
let greenX = 330;
let greenY = 300;

//유리 둥둥 효과
let yellowFloatX;
let yellowFloatY;
let redFloatX;
let redFloatY;
let blueFloatX;
let blueFloatY;
let greenFloatX;
let greenFloatY;

//노랑 사진
let yellowPic;
let yellowASCII;

//빨강 사진
let redPic;
let redASCII;

//파랑 사진
let bluePic;
let blueASCII;

//초록 사진
let greenPic;
let greenASCII;

//배경음
let mainBGM;
let yellowBGM;
let redBGM;
let blueBGM;
let greenBGM;

//화면전환
let state = 0;

//사진전환
let yellowRevealed = false;
let redRevealed = false;
let blueRevealed = false;
let greenRevealed = false;

//노랑 좌표
let yellowBallX = 250;
let yellowBallY = 300;
let yellowBoxSize = 50;

//빨강 좌표
let redObjectX = 590;
let redObjectY = 340;
let redBoxSize = 60;

//파랑 좌표
let blueObjectX = 330;
let blueObjectY = 245;
let blueBoxSize = 70;

//초록 좌표
let greenObjectX = 570;
let greenObjectY = 310;
let greenBoxSize = 60;

function preload() {
  //유리 파편
  yellowGlass = loadImage("yellowglass.png");
  redGlass = loadImage("redglass.png");
  blueGlass = loadImage("blueglass.png");
  greenGlass = loadImage("greenglass.png");

  //노랑
  yellowASCII = loadImage("YellowASCII.png");
  yellowPic = loadImage("YellowPic.png");

  //빨강
  redASCII = loadImage("RedASCII.png");
  redPic = loadImage("RedPic.png");

  //파랑
  blueASCII = loadImage("BlueASCII.png");
  bluePic = loadImage("BluePic.png");

  //초록
  greenASCII = loadImage("GreenASCII.png");
  greenPic = loadImage("GreenPic.png");

  //브금
  mainBGM = loadSound("MainPageBGM.mp3");
  yellowBGM = loadSound("YellowBGM.mp3");
  redBGM = loadSound("RedBGM.mp3");
  blueBGM = loadSound("BlueBGM.mp3");
  greenBGM = loadSound("GreenBGM.mp3");
}

function setup() {
  createCanvas(800, 500);
  canvas.parent("p5-canvas-container")

  //처음에는 소리 안 나게
  mainBGM.setVolume(0);
  yellowBGM.setVolume(0);
  redBGM.setVolume(0);
  blueBGM.setVolume(0);
  greenBGM.setVolume(0);

  //먼지 효과
  for (let i = 0; i < 80; i++) {
    dustX[i] = random(width);
    dustY[i] = random(height);
    dustSize[i] = random(2, 5);
    dustSpeed[i] = random(0.1, 0.4);
    dustAlpha[i] = random(25, 75);
  }
}

function draw() {
  background(0);

  //밝기조절
  lightLevel = map(mouseY, 0, height, 1, 0);

  //메인 페이지
  if (state == 0) {
    drawMainPage();
  }

  //노랑 페이지
  if (state == 1) {
    drawYellowPage();
  }

  //빨강 페이지
  if (state == 2) {
    drawRedPage();
  }

  //파랑 페이지
  if (state == 3) {
    drawBluePage();
  }

  //초록 페이지
  if (state == 4) {
    drawGreenPage();
  }
}

function drawMainPage() {
  mainBGM.setVolume(0.25);
  yellowBGM.setVolume(0);
  redBGM.setVolume(0);
  blueBGM.setVolume(0);
  greenBGM.setVolume(0);

  drawLight();
  drawDust();

  //유리 둥둥 미세
  yellowFloatX = yellowX + sin(frameCount * 0.01) * 4;
  yellowFloatY = yellowY + sin(frameCount * 0.02) * 10;

  redFloatX = redX + sin(frameCount * 0.02) * 5;
  redFloatY = redY + sin(frameCount * 0.02 + 1) * 9;

  blueFloatX = blueX + sin(frameCount * 0.01 + 4) * 4;
  blueFloatY = blueY + sin(frameCount * 0.02 + 3) * 11;

  greenFloatX = greenX + sin(frameCount * 0.01 + 1) * 5;
  greenFloatY = greenY + sin(frameCount * 0.02 + 5) * 8;

  image(yellowGlass, yellowFloatX, yellowFloatY, glassW, glassH);
  image(redGlass, redFloatX, redFloatY, glassW, glassH);
  image(blueGlass, blueFloatX, blueFloatY, glassW, glassH);
  image(greenGlass, greenFloatX, greenFloatY, glassW, glassH);
}

function drawLight() {
  noStroke();

  fill(255, 255, 255, 13 * lightLevel);
  quad(-20, -120, 260, -120, 950, 620, 700, 620);

  fill(255, 255, 255, 17 * lightLevel);
  quad(20, -90, 230, -90, 920, 590, 730, 590);

  fill(255, 255, 255, 22 * lightLevel);
  quad(60, -60, 190, -60, 890, 560, 760, 560);

  fill(255, 255, 255, 30 * lightLevel);
  quad(95, -35, 155, -35, 860, 535, 790, 535);

  fill(255, 255, 255, 18 * lightLevel);
  quad(110, -20, 145, -20, 845, 520, 805, 520);
}

function drawDust() {
  noStroke();

  for (let i = 0; i < 80; i++) {
    fill(255, 255, 255, dustAlpha[i] * lightLevel);
    circle(dustX[i], dustY[i], dustSize[i]);

    dustY[i] = dustY[i] + dustSpeed[i];
    dustX[i] = dustX[i] + sin(frameCount * 0.01 + i) * 0.15;

    if (dustY[i] > height) {
      dustY[i] = random(-20, 0);
      dustX[i] = random(width);
    }
  }
}

function drawYellowPage() {
  mainBGM.setVolume(0);
  redBGM.setVolume(0);
  blueBGM.setVolume(0);
  greenBGM.setVolume(0);

  if (yellowRevealed == false) {
    image(yellowASCII, 0, 0, width, height);

    let d = dist(mouseX, mouseY, yellowBallX, yellowBallY);
    let yellowVolume = map(d, 350, 0, 0, 0.8);

    if (yellowVolume < 0) {
      yellowVolume = 0;
    }

    if (yellowVolume > 0.8) {
      yellowVolume = 0.8;
    }

    yellowBGM.setVolume(yellowVolume);
  } else {
    image(yellowPic, 0, 0, width, height);
    yellowBGM.setVolume(0.35);
  }
}

function drawRedPage() {
  mainBGM.setVolume(0);
  yellowBGM.setVolume(0);
  blueBGM.setVolume(0);
  greenBGM.setVolume(0);

  if (redRevealed == false) {
    image(redASCII, 0, 0, width, height);

    let d = dist(mouseX, mouseY, redObjectX, redObjectY);
    let redVolume = map(d, 350, 0, 0, 0.8);

    if (redVolume < 0) {
      redVolume = 0;
    }

    if (redVolume > 0.8) {
      redVolume = 0.8;
    }

    redBGM.setVolume(redVolume);
  } else {
    image(redPic, 0, 0, width, height);
    redBGM.setVolume(0.35);
  }
}

function drawBluePage() {
  mainBGM.setVolume(0);
  yellowBGM.setVolume(0);
  redBGM.setVolume(0);
  greenBGM.setVolume(0);

  if (blueRevealed == false) {
    image(blueASCII, 0, 0, width, height);

    let d = dist(mouseX, mouseY, blueObjectX, blueObjectY);
    let blueVolume = map(d, 350, 0, 0, 0.8);

    if (blueVolume < 0) {
      blueVolume = 0;
    }

    if (blueVolume > 0.8) {
      blueVolume = 0.8;
    }

    blueBGM.setVolume(blueVolume);
  } else {
    image(bluePic, 0, 0, width, height);
    blueBGM.setVolume(0.35);
  }
}

function drawGreenPage() {
  mainBGM.setVolume(0);
  yellowBGM.setVolume(0);
  redBGM.setVolume(0);
  blueBGM.setVolume(0);

  if (greenRevealed == false) {
    image(greenASCII, 0, 0, width, height);

    let d = dist(mouseX, mouseY, greenObjectX, greenObjectY);
    let greenVolume = map(d, 350, 0, 0, 0.8);

    if (greenVolume < 0) {
      greenVolume = 0;
    }

    if (greenVolume > 0.8) {
      greenVolume = 0.8;
    }

    greenBGM.setVolume(greenVolume);
  } else {
    image(greenPic, 0, 0, width, height);
    greenBGM.setVolume(0.35);
  }
}

function mousePressed() {
  userStartAudio();

  if (mainBGM.isPlaying() == false) {
    mainBGM.loop();
  }

  if (yellowBGM.isPlaying() == false) {
    yellowBGM.loop();
  }

  if (redBGM.isPlaying() == false) {
    redBGM.loop();
  }

  if (blueBGM.isPlaying() == false) {
    blueBGM.loop();
  }

  if (greenBGM.isPlaying() == false) {
    greenBGM.loop();
  }

  if (state == 0) {
    if (
      mouseX > yellowFloatX &&
      mouseX < yellowFloatX + glassW &&
      mouseY > yellowFloatY &&
      mouseY < yellowFloatY + glassH
    ) {
      state = 1;
      yellowRevealed = false;
    }

    if (
      mouseX > redFloatX &&
      mouseX < redFloatX + glassW &&
      mouseY > redFloatY &&
      mouseY < redFloatY + glassH
    ) {
      state = 2;
      redRevealed = false;
    }

    if (
      mouseX > blueFloatX &&
      mouseX < blueFloatX + glassW &&
      mouseY > blueFloatY &&
      mouseY < blueFloatY + glassH
    ) {
      state = 3;
      blueRevealed = false;
    }

    if (
      mouseX > greenFloatX &&
      mouseX < greenFloatX + glassW &&
      mouseY > greenFloatY &&
      mouseY < greenFloatY + glassH
    ) {
      state = 4;
      greenRevealed = false;
    }
  } else if (state == 1) {
    if (yellowRevealed == false) {
      if (
        mouseX > yellowBallX - yellowBoxSize &&
        mouseX < yellowBallX + yellowBoxSize &&
        mouseY > yellowBallY - yellowBoxSize &&
        mouseY < yellowBallY + yellowBoxSize
      ) {
        yellowRevealed = true;
      }
    } else {
      state = 0;
      yellowBGM.setVolume(0);
    }
  } else if (state == 2) {
    if (redRevealed == false) {
      if (
        mouseX > redObjectX - redBoxSize &&
        mouseX < redObjectX + redBoxSize &&
        mouseY > redObjectY - redBoxSize &&
        mouseY < redObjectY + redBoxSize
      ) {
        redRevealed = true;
      }
    } else {
      state = 0;
      redBGM.setVolume(0);
    }
  } else if (state == 3) {
    if (blueRevealed == false) {
      if (
        mouseX > blueObjectX - blueBoxSize &&
        mouseX < blueObjectX + blueBoxSize &&
        mouseY > blueObjectY - blueBoxSize &&
        mouseY < blueObjectY + blueBoxSize
      ) {
        blueRevealed = true;
      }
    } else {
      state = 0;
      blueBGM.setVolume(0);
    }
  } else if (state == 4) {
    if (greenRevealed == false) {
      if (
        mouseX > greenObjectX - greenBoxSize &&
        mouseX < greenObjectX + greenBoxSize &&
        mouseY > greenObjectY - greenBoxSize &&
        mouseY < greenObjectY + greenBoxSize
      ) {
        greenRevealed = true;
      }
    } else {
      state = 0;
      greenBGM.setVolume(0);
    }
  }
}
