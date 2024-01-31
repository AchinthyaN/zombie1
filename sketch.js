var bg,bgImg;
var player, shooterImg, shooterImg1, shooter_shooting;
var heart1Img, heart2Img, heart3Im;
var heart1, heart2, heart3;
var zombieImg;
var zombie;
var zombieGroup, bulletGroup;
var bullet, bulletImg;
var gameState = "play";
var life = 3;

function preload(){
  shooterImg = loadImage("assets/shooter_1.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bgImg = loadImage ("assets/bg.jpeg");
  heart1Img = loadImage ("assets/heart_1.png");
  heart2Img = loadImage ("assets/heart_2.png");
  heart3Img = loadImage ("assets/heart_3.png");
  zombieImg = loadImage ("assets/zombie.png");
  bulletImg = loadImage ("assets/Bullet.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
  player = createSprite(150, 400, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.35;

  heart1 = createSprite(1400, 50, 50, 50);
  heart1.addImage("heart1", heart1Img);
  heart1.scale = 0.35;
  heart1.visible = false;

  heart2 = createSprite(1400, 50, 50, 50);
  heart2.addImage("heart2", heart2Img);
  heart2.scale = 0.35;
  heart2.visible = false;

  heart3 = createSprite(1320, 50, 50, 50);
  heart3.addImage("heart3", heart3Img);
  heart3.scale = 0.35;


  zombieGroup = new Group();
  bulletGroup = new Group();
}


function draw() {
  background(0); 
  if (gameState == "play"){ 
if (life == 3){
  heart3.visible = true;
  heart2.visible = false;
  heart1.visible = false;
}
if (life == 2){
  heart2.visible = true;
  heart3.visible = false;
  heart1.visible = false;
}
if (life == 1){
  heart1.visible = true;
  heart2.visible = false;
  heart3.visible = false;
}
if (life == 0){
  heart3.visible = false;
  heart2.visible = false;
  heart1.visible = false;
  gameState = "lost";
}
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW") || keyDown("w")){
  player.y -= 8;
}

if(keyDown("DOWN_ARROW" ) || keyDown("s")){
  player.y += 8;
}

if(keyDown("RIGHT_ARROW" ) || keyDown("d")){
  player.x += 8;
}

if(keyDown("LEFT_ARROW" ) || keyDown("a")){
  player.x -= 8;
}
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("SPACE")){
  player.addImage(shooter_shooting);
  bullet = createSprite(player.x + 45, player.y, 5, 5);
  bullet.addImage (bulletImg)
  bullet.scale = 0.03; 
  bullet.rotation = 180; 
  bullet.velocityX = 75;
  bulletGroup.add(bullet);
}

else if(keyWentUp){
  player.addImage(shooterImg);
}

zombies();

//player goes back to original standing image once we stop pressing the space bar
drawSprites();

if(zombieGroup.isTouching(bulletGroup)){
  for(var x = 0; x < zombieGroup.length; x ++){
    if(zombieGroup[x].isTouching(bulletGroup)){
      zombieGroup[x].destroy();
      bulletGroup.destroyEach();
    }

  }
}

if(zombieGroup.isTouching(player)){
  for(var x = 0; x < zombieGroup.length; x ++){
    if(zombieGroup[x].isTouching(player)){
    gameState = "lost";
    }
    

  }
}

  for (var i = 0; i < zombieGroup.length; i++){
    if(zombieGroup [i].x < 0){
      zombieGroup[i].destroy();
      life-=1;
    }
  }
}
if (gameState == "lost"){
  player.destroy();
  zombieGroup.destroyEach();
  bulletGroup.destroyEach(); 
  fill("white");
  text("GAME OVER", windowWidth/2, windowHeight/2);
}
}

function zombies(){
  if(frameCount % 20 == 0){
    zombie = createSprite(random(700, 1400), random(150, 600), 50, 50);
    zombie.addImage(zombieImg);
    zombie.scale = 0.2; 
    zombie.velocityX -= 5;
    zombie.lifetime = 400;
    zombieGroup.add(zombie);
  }
}