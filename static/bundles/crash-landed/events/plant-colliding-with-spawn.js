require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/events/plant-colliding-with-spawn.js":[function(require,module,exports){
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1121 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1183 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  Velocity
 } = require("@shared/systems/velocity.js");
var { 
  Position
 } = require("@shared/systems/position.js");
var { 
  game
 } = require("@crash-landed/game.js"),
    config = require("@crash-landed/config.js"),
    { 
  plants,
  ants,
  rocks
 } = require("@crash-landed/entities.js");
game.events.on("plantCollidingWithSpawn", ((home, plant) => {
	
  const v=plant.entity.velocityInterface;
  const pos=plant.pos;
  var xd = (function() {
    /* eval.sibilant:1:511 */
  
    var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
    return (config.collisionStatic - (rand / 2));
  }).call(this);
  var yd = (function() {
    /* eval.sibilant:1:511 */
  
    var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
    return (config.collisionStatic - (rand / 2));
  }).call(this);
  pos.x = (pos.x + xd);
  pos.y = (pos.y + yd);
  return v.accelerate([ xd, yd ]);

})).once("error", ((err) => {
	
  console.log("error on", "plantCollidingWithSpawn", "of", "game.events", "given", "home(plant)");
  return console.log(err);

}));
},{"@crash-landed/config.js":"@crash-landed/config.js","@crash-landed/entities.js":"@crash-landed/entities.js","@crash-landed/game.js":"@crash-landed/game.js","@shared/systems/position.js":"@shared/systems/position.js","@shared/systems/velocity.js":"@shared/systems/velocity.js"}]},{},[]);
