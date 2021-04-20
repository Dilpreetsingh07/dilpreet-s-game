var PLAY = 1;
var END = 0;
var RIDDLE=2
var gameState = PLAY;

var storage=[]



var goku,ground;
var cloudsGroup,obstaclesGroup,obstaclesGroup2,coinsGroup,laserGroup;
var  score=0,Life=2,Coins=0;







function preload(){
  gokuimg=loadAnimation("goku running 2.png");
  groundimg=loadImage("groundimg.jpg")
  sunimg=loadImage("sun-removebg-preview.png")
  cloudimg=loadImage("clouds.png")
  mountainimg=loadImage("mountain.png")
  skateimg=loadImage("skate.png")
  vegetaimg=loadImage("vegeta.png")
  coinimg=loadImage("coins2.png")
  laserImage=loadImage("laser.png")
}




function setup(){
  createCanvas(windowWidth,windowHeight)

  goku= createSprite(width/4.9,height/2,50,50)
  goku.addAnimation("running",gokuimg)
  goku.scale=0.4

  ground=createSprite(width/2,height,9000,350)
  ground.addImage(groundimg)
  ground.velocityX=-10
 ground.scale=4.0

 sun = createSprite(width/1.1,height/9,100,100)
 sun.addImage(sunimg)
 sun.scale=0.5;

 
  

 score = 0;
 Coins=0;

 cloudsGroup=new Group()
 obstaclesGroup=new Group()
 obstaclesGroup2=new Group()
 coinsGroup=new Group()
 laserGroup=new Group()


}
function draw(){

  
  background("skyblue")
  textSize(20)
  fill("black");
  text("Score: "+ score,30,50);

  textSize(20);
  fill("black");
  text("Life="+Life,200,50)

  textSize(20);
  fill("black");
  text("Coins="+Coins,370,50)
  
  if (gameState===PLAY){

 spawnClouds()
 spawnObstacles()
 spawnObstacles2()
 spawncoins()


 score = score + Math.round(getFrameRate()/60);
 ground.velocityX = -(6 + 3*score/100);

 if(coinsGroup.isTouching(goku)){
       
  Coins = Coins+1;
 // player.scale+= +0.1
  coinsGroup.destroyEach();
  
 }
 if(keyDown("space")){
  forlaser()
}
 


 if(touches.length > 0 || keyDown("UP_ARROW") && goku.y  >= height-500 ) {
  touches = [];
  goku.velocityY = -20;
}
goku.velocityY = goku.velocityY + 0.8;



 if (ground.x < 0){
  ground.x = 1050;
}



 goku.collide(ground);


if(laserGroup.isTouching(obstaclesGroup2)){
  laserGroup.destroyEach();
  obstaclesGroup2.destroyEach();
}


if(goku.isTouching(obstaclesGroup)){
 gameState = RIDDLE
}

drawSprites()
if(gameState===RIDDLE){
  goku.visible=false
  obstaclesGroup.visible=false
  ground.visible=false
  obstaclesGroup2.visible=false
  cloudsGroup.visible=false
  sun.visible=false
  
  var rand=Math.round(random(1,5))
  switch (rand){
    case 1: textSize(50);
      fill("limegreen")
    text("WHAT IS THE END OF EVERYTHING ?",width/2,height/2);
     break;
     case 2: textSize(50);
     fill("limegreen")
   text("I AM THE BIGGEST ALPHABET ,AS I CONTAIN MOST WATER IN THE WORLD .WHO AM I ?",width/2,height/2);
   break;
   case 3: textSize(50);
   fill("limegreen")
 text("WHAT COMES ONCE IN A MINUTE, TWICE IN A MOMENT AND NEVER IN YEARS ?",width/2,height/2);
 break;
 case 4: textSize(50);
 fill("limegreen")
text("WHICH LETTER ALSO GIVES YOU THE NAME OF A DRINK?",width/2,height/2);
break;
case 5: textSize(50);
 fill("limegreen")
text("WHAT IS THE  END  OF CHRISRTMAS ?",width/2,height/2);
break;
  }
}
} 
}



function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(50,height/3));
    cloud.addImage(cloudimg);
    cloud.scale = 0.05;
    cloud.velocityX = -5;
    
     //assign lifetime to the variable
    cloud.lifetime = 600;
    
    //adjust the depth
    cloud.depth = goku.depth;
    goku.depth = goku.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(width-200,height/1.8,20,30);
    obstacle.setCollider('circle',0,0,75);
    obstacle.debug = false;
    obstacle.addImage(mountainimg)
  
   // obstacle.velocityX = -(6 + 3*score/100);
    obstacle.velocityX=-10
   
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 700;
    obstacle.depth = goku.depth;
    goku.depth =goku.depth+1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function spawnObstacles2() {
  if(frameCount % 200 === 0) {
    var obstacle2 = createSprite(width-300,height/1.7,20,30);
    obstacle2.setCollider('circle',0,0,120);
  //obstacle2.debug = true;
    obstacle2.addImage(vegetaimg)
  
   // obstacle.velocityX = -(6 + 3*score/100);
    obstacle2.velocityX=-10
   
    
    
    //assign scale and lifetime to the obstacle           
    obstacle2.scale = 0.5;
    obstacle2.lifetime = 700;
    obstacle2.depth = goku.depth;
    goku.depth =goku.depth+1;
    //add each obstacle to the group
    obstaclesGroup2.add(obstacle2);
  }
}
function spawncoins(){
  if(frameCount % 120 === 0){
    var coin=createSprite(650,200,40,10);
    coin.y=random(120,200);
    coin.addImage("fruit",coinimg)
    coin.scale=0.3
   //coin.debug=true
    coin.setCollider("circle",0,0,150)
    coin.velocityX=-5;
    coin.lifetime=300
    goku.depth=coin.depth+1
    coinsGroup.add(coin);
  }
}
function forlaser() { 

  var laser= createSprite(100, 100, 60, 10);
  laser.addImage(laserImage);
  laser.x = goku.y;
  //laser.debug=true
  laser.setCollider('rectangle',1,7,200,200)
  laser.y=goku.y;
  laser.velocityX = 60;
  laser.lifetime = 100;
  laser.scale = 0.3;
  laserGroup.add(laser);
 

}
