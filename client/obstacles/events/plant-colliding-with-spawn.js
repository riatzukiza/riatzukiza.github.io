var { 
  Velocity
 } = require("@shared/systems/velocity.js");
var { 
  Position
 } = require("@shared/systems/position.js");
var { 
  game
 } = require("@obstacles/game.js"),
    config = require("@obstacles/config.js"),
    { 
  plants,
  ants,
  rocks
 } = require("@obstacles/entities.js");
game.events.on("plantCollidingWithSpawn", ((home, plant) => {
	
  const v=plant.entity.velocityInterface;
  const pos=plant.pos;
  var xd = ((Math.random() * config.collisionStatic) * (function() {
    if (Math.random() < 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  var yd = ((Math.random() * config.collisionStatic) * (function() {
    if (Math.random() < 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  pos.x = (pos.x + xd);
  pos.y = (pos.y + yd);
  return v.accelerate([ xd, yd ]);

})).once("error", ((err) => {
	
  console.log("error on", "plantCollidingWithSpawn", "of", "game.events", "given", "home(plant)");
  return console.log(err);

}));