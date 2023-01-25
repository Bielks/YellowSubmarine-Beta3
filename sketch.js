//pacíficos
var submarine, submarineImg;
var tiro, tiroImg;
var cobaia, cobaiaImg;
var mergulhador, mergulhadorImg;
//monstros
var piranha, piranhaImg;
var polvo, polvoImg;
var aguaViva, aguaVivaImg;
var tartaruga, tartarugaImg;
//estados
var atirar = -1;
var atirando = -2;
var atirou = -3;

var estadoTiro = -1;
//vida da tartaruga
var Vida1Tartaruga = 1;
var Vida2Tartaruga = 2;
var Vida3Tartaruga = 3;
var Vida4Tartaruga = 4;
var Vida5Tartaruga = 5;

var estadoTartaruga = 1;
//vida do polvo
var vida1Polvo = 6;
var vida2Polvo = 7;
var vida3Polvo = 8

var estadoPolvo = 6;

function preload(){
  submarineImg = loadImage('imagens/yellow submarine.png');
  tiroImg = loadImage('imagens/tiro.png');
  //carregando imagens dos monstros
  aguaVivaImg = loadAnimation('imagens/agua viva 1.png', 'imagens/agua viva 2.png');
  piranhaImg = loadAnimation('imagens/piranha 1.png', 'imagens/piranha 2.png');
  tartarugaImg = loadImage('imagens/tartaruga.png');
  polvoImg = loadAnimation('imagens/polvo 1.png', 'imagens/polvo 1.png', 'imagens/polvo 1.png', 'imagens/polvo 2.png', 'imagens/polvo 2.png', 'imagens/polvo 2.png');
}

function setup(){
  createCanvas(900, 400);
  grupoAguaviva = createGroup();
  grupoPiranha = createGroup();
  grupoTartaruga = createGroup();
  grupoPolvo = createGroup();

  submarine = createSprite(100, 200, 50, 50);
  submarine.addImage('submarino', submarineImg);
  submarine.scale = 0.1;

  tiro = createSprite(100, 200, 28, 4);
  tiro.scale = 0.06;
}

function draw(){
  background('purple');
  
  submarine.y = mouseY -15;

  gerador_de_agua_viva();
  gerador_de_piranha();
  gerador_de_tartaruga();
  gerador_de_polvo();

  if(estadoTiro === -3){
    tiro.visible = false;
  }

  if(estadoTiro === -1){
    tiro.y = submarine.y +15;
    tiro.x = submarine.x;
    tiro.visible = true;
  }

  if(mouseIsPressed === true && estadoTiro === -1){
    if(mouseButton === LEFT){
      estadoTiro = -2;
    }
  }

  if(estadoTiro === -2){
    tiro.addImage('tiro', tiroImg)
    tiro.velocityX = 50;
  }

  if(estadoTiro === -2 && tiro.x >= 900 || estadoTiro === -3 && tiro.x >= 900){
    estadoTiro = -1;
  }
  //condições de colisões
  //agua viva
  if(tiro.isTouching(grupoAguaviva) && estadoTiro === -2){
    aguaViva.destroy();
    estadoTiro = -3;
  }
  //piranha
  if(tiro.isTouching(grupoPiranha) && estadoTiro === -2){
    piranha.destroy();
    estadoTiro = -3;
  }
  //tartaruga
  if(tiro.isTouching(grupoTartaruga) && estadoTartaruga === 1 && estadoTiro === -2){
    estadoTartaruga = 2;
    estadoTiro = -3;
  }

  if(tiro.isTouching(grupoTartaruga) && estadoTartaruga === 2 && estadoTiro === -2){
    estadoTartaruga = 3;
    estadoTiro = -3;
  }

  if(tiro.isTouching(grupoTartaruga) && estadoTartaruga === 3 && estadoTiro === -2){
    estadoTartaruga = 4;
    estadoTiro = -3;
  }

  if(tiro.isTouching(grupoTartaruga) && estadoTartaruga === 4 && estadoTiro === -2){
    estadoTartaruga = 5;
    estadoTiro = -3;
  }

  if(tiro.isTouching(grupoTartaruga) && estadoTartaruga === 5 && estadoTiro === -2){
    tartaruga.destroy();
    estadoTartaruga = 1;
    estadoTiro = -3;
  }
  //polvo
  if(tiro.isTouching(grupoPolvo) && estadoPolvo === 6 && estadoTiro === -2){
    estadoPolvo = 7;
    estadoTiro = -3;
  }

  if(tiro.isTouching(grupoPolvo) && estadoPolvo === 7 && estadoTiro === -2){
    estadoPolvo = 8;
    estadoTiro = -3;
  }

  if(tiro.isTouching(grupoPolvo) && estadoPolvo === 8 && estadoTiro === -2){
    polvo.destroy();
    estadoPolvo = 6;
    estadoTiro = -3;
  }

  submarine.depth = tiro.depth +10
  drawSprites();
}


function gerador_de_agua_viva(){
  if(frameCount % 200 === 150){
    aguaViva = createSprite(900, random(30, 370), 50, 50);
    aguaViva.velocityX = -5;
    aguaViva.addAnimation('agua viva', aguaVivaImg);
    aguaViva.scale = 0.08;
    grupoAguaviva.add(aguaViva);
  }
}

function gerador_de_piranha(){
  if(frameCount % 60 === 50){
    piranha = createSprite(900, random(30, 370), 50, 50);
    piranha.velocityX = -15;
    piranha.addAnimation('piranha', piranhaImg);
    piranha.scale = 0.05;
    grupoPiranha.add(piranha);
  }
}

function gerador_de_tartaruga(){
  if(frameCount % 500 === 100){
    tartaruga = createSprite(900, random(30, 370), 50, 50);
    tartaruga.velocityX = -2;
    tartaruga.addImage('tartaruga', tartarugaImg);
    tartaruga.scale = 0.08;
    grupoTartaruga.add(tartaruga);
  }
}

function gerador_de_polvo(){
  if(frameCount % 1000 === 500){
    polvo = createSprite(900, random(50, 350), 50, 50);
    polvo.velocityX = -7;
    polvo.addAnimation('polvo', polvoImg);
    polvo.scale = 0.08;
    grupoPolvo.add(polvo);
  }
}

// um pixel é o equivalente a 2.5