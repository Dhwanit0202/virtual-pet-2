var dog,happydog,dogsprite
var database;
var foodstock;
var food;
var foodobject,feedtime,lastfed;

function preload()
{
	dog=loadImage("images/dogImg.png")
  happydog=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  dogsprite = createSprite(250,400,10,10);
  dogsprite.addImage("normal",dog);
  dogsprite.addImage("happy",happydog);
  dogsprite.scale = 0.2
  database = firebase.database()
  foodstock = database.ref('food');
  foodstock.on("value",readStock)
feed = createButton("feed the dog")
feed.position(100,100)
feed.mousePressed(feedDog);
add = createButton("add food")
add.position(200,100)
add.mousePressed(addFood);
foodobject=new Food()
}


function draw() {  
 background(46,139,87);
 foodobject.display();
 console.log(foodobject.foodstock)
 textSize(20)
 fill(255)
 text("foodstock remaining :  "+food, 150,80)
  drawSprites();
  //add styles here

}

function readStock(data){
  
food = data.val();
foodobject.updateFoodStock(food)
}



function addFood(){
  food++
  database.ref('/').update({
    food:food
  })
}
function feedDog(){
  dogsprite.changeAnimation("happy",happydog);
  if(foodobject.getFoodStock()>0){
    foodobject.updateFoodStock(foodobject.getFoodStock()-1)
  }
  
  database.ref('/').update({
    food:foodobject.getFoodStock(),feedtime:hour()

  })
}