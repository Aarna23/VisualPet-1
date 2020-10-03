var dog,dogimg,dogimg1;
var database;
var foodS, foodStock;
var foodS = 25;


function preload()
{
  dogimg = loadImage("images/dogImg.png");
  dogimg1 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250,300,150,150)
  dog.addImage(dogimg)
  dog.scale = 0.15
  
    foodStock = database.ref('Food');
    foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);
 
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogimg1)
  
}

  drawSprites();
  //add styles here

  textSize(30);
  stroke(4);
  fill('white');
  text("Food remaining: "+ foodS,170,200);
}
//Function to read values from database
function readStock(data){
   foodS=data.val();
}

//Function to write values in database
function writeStock(x){

    if(x<=0){
    x = 0;
    } else{
      x = x-1;
    }
  database.ref('/').update({
    Food:x 
  })
}