//Create variables here

var happyDog;
var dog;
var button1,button2;
var feed,addFood;
var foodObj;
var foo;
var dog1;
var lastFed;
var database, foodS, foodStock;
function preload()
{
 
  happyDog=loadImage("happydog.png")
  dog=loadImage("dog.png")
  
  feed=createButton("Feed the dog")
 
  addFood=createButton("Add Food")

}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  foodObj=new food();
  
  fedTime=database.ref("FeedTime")
  fedTime.on("value",function(data){
  lastFed=data.val();
  console.log(lastFed);
  })
  dog1=createSprite(250,250,50,50);
 dog1.addImage(dog);
 dog1.scale=0.25;
 foodS=20;
 

}


function draw() {  
background(46,139,87);
fill (255,255,254);
textSize(15);
if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM",350,30)
}else if (lastFed==0) {
    text("Last Feed : 12 AM",350,30);

}else{
    text("Last Feed : "+ lastFed +" AM",350,30);
}

 feed.position(700,95);
feed.mousePressed(feedDog);

  addFood.position(800,95);
  addFood.mousePressed(addFoods);

foodObj.display();
  drawSprites();
   /* noStroke();
        textSize(35)*/
        fill("white")
        text("Food Remaining:" +lastFed, width-300, 150)
        
  //ad fill("black")d styles here

}
function readStock(data){
  foodS=data.val();
  Food=foodStock;
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog1.addImage(happyDog);
 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

}



























  
