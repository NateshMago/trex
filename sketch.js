var trex, ground, animation, groundAnimation, cloud, cloudAnimation, object, objectAnimation1, objectAnimation2, objectAnimation3, objectAnimation4, objectAnimation5, objectAnimation6, rand, count = 0, PLAY = 0, END = 1, gameover, gameoveranimation, restart, restartanimation, trexdeadanimation, trexdead

function preload(){
  animation = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundAnimation = loadImage("ground2.png");
  cloudAnimation = loadImage("cloud.png")
  objectAnimation1 = loadImage("obstacle1.png");
  objectAnimation2 = loadImage("obstacle2.png");
  objectAnimation3 = loadImage("obstacle3.png");
  objectAnimation4 = loadImage("obstacle4.png");
  objectAnimation5 = loadImage("obstacle5.png");
  objectAnimation6 = loadImage("obstacle6.png");
  gameoveranimation = loadImage("gameOver.png");
  restartanimation = loadImage("restart.png");
  trexdeadanimation = loadImage("trex_collided.png");
}

function setup() {
  createCanvas(400, 400);
  trex = createSprite(50,250,10,10);
  ground = createSprite(200,255,500,5);
  trex.addAnimation("trexAnimation",animation);
  trex.scale = 0.4;
  ground.addImage("groundAnimation",groundAnimation)
  ground.setCollider("rectangle",0,0,5000,2.5)
  cloud1 = createGroup();
  object1 = createGroup();
  gameover = createSprite(200,175,10,10);
  gameover.addImage("gameoveranimation",gameoveranimation);
  restart = createSprite(200,210,10,10);
  restart.addImage("restartanimation",restartanimation);
  GameState = PLAY;
  trex.addAnimation("trexdeadanimation",trexdeadanimation);
}

function draw() {
  background(255);
  
  text("Score: "+ count, 250, 100);
  
  if (GameState == PLAY){
    
  count = Math.round(World.frameRate/59)+count;
    
  if (count % 100 == 0){
  
  ground.velocityX+=-5;  
  }  
    
  if (trex.y >= 234.95){
  if (keyDown("space")){    
  trex.velocityY = trex.velocityY-5;
  }   
  }
  if (ground.x <0){
  ground.x = 1000;  
  }  
  gameover.visible = false;
  restart.visible = false;
  gameover.scale = 0.5;
  restart.scale = 0.5;  
  spawnClouds();
  spawnObjects();
  
  ground.velocityX = -5;
    
  restart.x = 100000000000;  
  
   
    
  if (object1.isTouching(trex)){
  GameState = END; 
  }  
  }
  
  console.log(GameState);
  
  if(GameState == END){
  
  trex.changeAnimation("trexdeadanimation",trexdeadanimation);
    
  restart.x = 200;  
  gameover.visible = true;
  restart.visible = true;
  if (mousePressedOver(restart)){
  GameState = PLAY;
  object1.destroyEach();
  cloud1.destroyEach();
  trex.changeAnimation("trexAnimation",animation)
  count = 0;  
  }
  ground.velocityX = 0;
  object1.setVelocityXEach(0);
  cloud1.setVelocityXEach(0);  
  }
  
if (trex.y <= 140
){
trex.velocityY = trex.velocityY+5;  
}  
 
trex.collide(ground);
console.log(trex.y);  
  
  drawSprites();
}

function spawnClouds(){
  
if (frameCount % 120 === 0){
cloud = createSprite(400,175,10,10);
cloud.addImage("cloudAnimation",cloudAnimation);
cloud.velocityX = -(5+count/100);  
cloud.scale = 0.5;
cloud.lifetime = 100;

cloud1.add(cloud);  
}  
}

function spawnObjects(){

if(frameCount % 60 === 0){  
rand = Math.round(random(1,6));  
object = createSprite(400,235,10,10)
object.velocityX = -(5+count/100);
object.scale = 0.5;  
switch(rand){
  case 1: object.addImage("obstacle1.png",objectAnimation1)
  break  
  case 2: object.addImage("obstacle2.png",objectAnimation2)
  break  
  case 3: object.addImage("obstacle3.png",objectAnimation3)
  break
  case 4: object.addImage("obstacle4.png",objectAnimation4)
  break  
  case 5: object.addImage("obstacle5.png",objectAnimation5)
  break  
  case 6: object.addImage("obstacle6.png",objectAnimation6)
  break
  default:break
  
}  
object1.add(object);  
}  
}