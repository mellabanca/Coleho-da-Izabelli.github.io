const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;

var corda, corda2, corda3;

var fruty;

var linkgacao, linkgacao2, linkgacao3;

var fundoground, aguamelon, bunnelho, cuttar, cuttar2, cuttar3, mutar;

var coebbit;

var coeblink, coeat;

var sadbbit;

var fundoSound, cortarSound, tristeSound, comendoSound, soproSound;

var blower;


function preload(){
  fundoground = loadImage("./Imagens/background.png");
  aguamelon = loadImage("./Imagens/melon.png");
  bunnelho = loadImage("./Imagens/Rabbit-01.png");
  coeblink = loadAnimation("./Imagens/blink_1.png","./Imagens/blink_2.png","./Imagens/blink_3.png");
  coeat = loadAnimation("./Imagens/eat_0.png","./Imagens/eat_1.png","./Imagens/eat_2.png",
                        "./Imagens/eat_3.png","./Imagens/eat_4.png");

  sadbbit = loadAnimation("./Imagens/sad_1.png", "./Imagens/sad_2.png", "./Imagens/sad_3.png");

  fundoSound = loadSound("./Sons/sound1.mp3");
  cortarSound = loadSound("./Sons/rope cut.mp3");
  tristeSound = loadSound("./Sons/sad.wav");
  comendoSound = loadSound("./Sons/eating_sound.mp3");
  soproSound = loadSound("./Sons/air.wav");

  coeblink.playing = true;
  coeat.playing = true;
  coeat.looping = false;
  sadbbit.looping = false;
}

function setup() 
{
  var isCelular = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isCelular){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80, displayHeight);
  }
  else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }
  
  fundoSound.play();
  fundoSound.setVolume(0.5);
  engine = Engine.create();
  world = engine.world;

  coeblink.frameDelay = 15;
  coeat.frameDelay = 20;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)

  var fruty_options = {
    density: 0.001
  }

  ground = new Ground(200, canH, 600,20);

  corda = new Rope(8, {x: 40, y: 30});
  corda2 = new Rope(7, {x: 370, y: 40});
  corda3 = new Rope(4, {x: 400, y: 225});

  fruty = Bodies.circle(300, 300, 15, fruty_options);
  Matter.Composite.add(corda.body, fruty);

  linkgacao = new LinkFruty(corda, fruty);
  linkgacao2 = new LinkFruty(corda2, fruty);
  linkgacao3 = new LinkFruty(corda3, fruty);

  coebbit = createSprite(170, canH-80, 100, 100);
  coebbit.addImage(bunnelho);
  coebbit.scale = 0.2;
  coebbit.addAnimation("piscando", coeblink);
  coebbit.addAnimation("comendo", coeat);
  coebbit.addAnimation("triste", sadbbit);
  coebbit.changeAnimation("piscando");

  cuttar = createImg("./Imagens/cut_button.png");
  cuttar.position(20, 30);
  cuttar.size(50, 50);
  cuttar.mouseClicked(dropar);

  cuttar2 = createImg("./Imagens/cut_button.png");
  cuttar2.position(330, 35);
  cuttar2.size(50, 50);
  cuttar2.mouseClicked(dropar2);

  cuttar3 = createImg("./Imagens/cut_button.png");
  cuttar3.position(360, 200);
  cuttar3.size(50, 50);
  cuttar3.mouseClicked(dropar3);

 /* blower = createImg("./Imagens/balloon.png");
  blower.position(10, 200);
  blower.size(150, 100);
  blower.mouseClicked(soplow);*/

  mutar = createImg("./Imagens/mute.png");
  mutar.position(450, 20);
  mutar.size(50, 50);
  mutar.mouseClicked(muttar);

}

function draw() 
{
  background(51);
  image(fundoground, 0, 0, displayWidth+80, displayHeight);

  Engine.update(engine);
   
  ground.moslay();

  corda.show();
  corda2.show();
  corda3.show();

  if(fruty !== null){  

    image(aguamelon,fruty.position.x, fruty.position.y, 60, 60);
  }

  if(colideu(fruty, coebbit) === true){
    
    coebbit.changeAnimation("comendo");
    comendoSound.play();

  }


  if(fruty !== null && fruty.position.y >= height-70){

    coebbit.changeAnimation("triste");
    fruty = null;
    tristeSound.play();
    fundoSound.stop();

  }

  drawSprites();

  /*console.log(fruty.position.y);
  console.log(ground.body.position.y);*/

}


function dropar(){

  corda.break();
  linkgacao.detachar();
  linkagacao = null;

  cortarSound.play();

}

function dropar2(){

  corda2.break();
  linkgacao2.detachar();
  linkagacao2 = null;

  cortarSound.play();

}

function dropar3(){

  corda3.break();
  linkgacao3.detachar();
  linkagacao3 = null;

  cortarSound.play();

}

function colideu(body, sprite){

  if(body !== null){
    var didy = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if(didy <= 80){
      World.remove(engine.world, fruty);
      fruty = null;
      return true;

    } else{
      return false;

    }
  }
}

function soplow(){

  Matter.Body.applyForce(fruty, {x: 0, y:0}, {x:0.01, y:0});
  soproSound.play();

}

function muttar(){

  if(fundoSound.isPlaying()){

    fundoSound.stop();

  }else{

    fundoSound.play();
    
  }

}

