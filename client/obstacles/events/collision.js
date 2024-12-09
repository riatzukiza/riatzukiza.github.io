var { 
  Velocity
 } = require("@obstacles/systems/velocity.js");
var { 
  Physics
 } = require("@shared/systems/physics/system.js");
var { 
  game
 } = require("@obstacles/game.js"),
    { 
  home,
  plants,
  ants,
  rocks
 } = require("@obstacles/entities.js");
game.events.on("collision", ((c, c_) => {
	
  var v = c.entity.velocityInterface;
  var v_ = c_.entity.velocityInterface;
  var p = c.entity.physicalProperties;
  var p_ = c_.entity.physicalProperties;
  if( (c.entity === home && plants.has(c_.entity)) ){ 
    return game.events.emit("plantCollidingWithSpawn", c, c_);
   };
  if( (c_.entity === home && plants.has(c.entity)) ){ 
    return game.events.emit("plantCollidingWithSpawn", c_, c);
   };
  if( (c.entity === home && rocks.has(c_.entity)) ){ 
    return game.events.emit("plantCollidingWithSpawn", c, c_);
   };
  if( (c_.entity === home && rocks.has(c.entity)) ){ 
    return game.events.emit("plantCollidingWithSpawn", c_, c);
   };
  if( (v && v_ && p && p_) ){ 
    if( (ants.has(c_.entity) && plants.has(c.entity)) ){ 
      return game.events.emit("antFoundPlant", c_, c);
     };
    if( (ants.has(c.entity) && plants.has(c_.entity)) ){ 
      return game.events.emit("antFoundPlant", c, c_);
     };
    if( (ants.has(c.entity) && ants.has(c_.entity)) ){ 
      game.events.emit("simpleCollision", c_, c);
      return game.events.emit("antCollision", c, c_);
     };
    v.pos.x = (v.priorX || v.pos.x);;
    v.pos.y = (v.priorY || v.pos.y);;
    v_.pos.x = (v_.priorX || v_.pos.x);;
    v_.pos.y = (v_.priorY || v_.pos.y);;
    if( ((plants.has(c.entity) && plants.has(c_.entity)) || (plants.has(c.entity) && rocks.has(c_.entity)) || (rocks.has(c.entity) && plants.has(c_.entity)) || (rocks.has(c.entity) && rocks.has(c_.entity))) ){ 
      game.events.emit("staticObjectCollision", c, c_)
     };
    game.events.emit("simpleCollision", c_, c)
   };
  c_.colliding = false;
  return c.colliding = false;

})).once("error", ((err) => {
	
  console.log("error on", "collision", "of", "game.events", "given", "c(c_)");
  return console.log(err);

}));