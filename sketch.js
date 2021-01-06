var player, window1, window2, trash, wall1, wall2, skyline, coin, intro;
var skylineImage, wallImage, playerClimbingLeft, playerClimbingRight, window1Image, window2Image, trashImage, music, coinImage, introImage;
var trashG, windowG, coinG;

var score = 0;
var survival = 0;

var gameState = "PLAY";

function preload(){
  playerClimbingLeft = loadAnimation("playerleft1.png", "playerleft2.png");
  playerClimbingRight = loadAnimation("playerright1.png", "playerright2.png");
  skylineImage = loadImage("skyline.jpg");
  wallImage = loadImage("wall.png");
  window1Image = loadImage("window1.png");
  window2Image = loadImage("window2.png");
  trashImage = loadImage("trash.png");
  coinImage = loadImage("coin.png");
  music = loadSound("music.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  skyline = createSprite(300, 225, 10, 10);
  skyline.addImage("skyline image", skylineImage);
  skyline.scale = 0.5;
  skyline.velocityY = 0.001;
  
  wall1 = createSprite(-300, 300, 10, 10);
  wall1.addImage("wall image", wallImage);
  wall1.scale = 3;
  wall1.velocityY = 2;
  
  wall2 = createSprite(900, 300, 10, 10);
  wall2.addImage("wall image", wallImage);
  wall2.scale = 3;
  wall2.velocityY = 2;
  
  player = createSprite(200, 500, 10, 10);
  player.addAnimation("climbing left side", playerClimbingLeft);
  player.addAnimation("climbing right side", playerClimbingRight);
  player.scale = 0.25;
  
  trashG = new Group();
  windowG = new Group();
  coinG = new Group();
}

function draw() {
  background(220);
  
  if(gameState == "PLAY"){
    if(wall1.y >= 400){
      wall1.y = 200;
      wall2.y = 200;
    }

    if(keyDown("left_arrow")){
      player.x = 200;
      player.changeAnimation("climbing left side", playerClimbingLeft);
    }

    if(keyDown("right_arrow")){
      player.x = 400;
      player.changeAnimation("climbing right side", playerClimbingRight);
    }
    
    if(trashG.isTouching(player)){
      gameState = "END";
    }
    
    if(coinG.isTouching(trashG)){
      coinG.y = coinG.y + 50;
    }
    
    spawnCoin();
    spawnTrash();
    spawnWindow1();
    spawnWindow2();
    drawSprites();
    
    if(player.isTouching(coinG)){
      score = score + 1;
      coinG.destroyEach();
    }
    
    survival = survival + Math.round(getFrameRate()/60);
    
    textSize(30);
    fill("white");
    text("Score: " + score, 420, 585);
    
    textSize(25);
    fill("white");
    text("Survival: " + survival, 420, 550);
  }
  
  if(gameState == "END"){
    background(0);
    
    textSize(100);
    fill("red");
    text("Game Over!", 25, 300);
    textSize(30);
    text("Press R to Restart", 175, 350)
    
    if(keyDown("R")){
      gameState = "PLAY";
      score = 0;
      survival = 0;
    }
  }
}

function spawnWindow1(){
  if(frameCount % 300 == 0){
    window1 = createSprite(100, -100, 10, 10);
    window1.addImage("window image 1", window1Image);
    window1.scale = 0.15;
    window1.velocityY = 2;
    window1.lifetime = 500;
    windowG.add(window1);
  }
}

function spawnWindow2(){
  if(frameCount % 300 == 0){
    window2 = createSprite(500, -100, 10, 10);
    window2.addImage("window image 2", window2Image);
    window2.scale = 0.3;
    window2.velocityY = 2;
    window2.lifetime = 500;
    windowG.add(window2);
  }
}

function spawnTrash(){
  if(frameCount % 75 == 0){
    trash = createSprite(230, -100, 10, 10);
    trash.addImage("trash image", trashImage);
    trash.scale = 0.07;
    trash.velocityY = 12.5;
    trash.lifetime = 60;
    
    
    rand1 = Math.round(random(1, 2))
    
    if(rand1 == 1){
      trash.x = 230;
    }
    
    if(rand1 == 2){
      trash.x = 370;
    }
    
    trashG.add(trash);
  }
}

function spawnCoin(){
  if(frameCount % 66 == 0){
    coin = createSprite(230, -100, 10, 10);
    coin.addImage("coin image", coinImage);
    coin.scale = 0.02;
    coin.velocityY = 12.5;
    coin.lifetime = 60;
    
    rand2 = Math.round(random(1, 2))
    
    if(rand2 == 1){
      coin.x = 230;
    }
    
    if(rand2 == 2){
      coin.x = 370;
    }
    
    coinG.add(coin);
  }
}