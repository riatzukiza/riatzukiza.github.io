require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/events/tick.js":[function(require,module,exports){
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
  Physics
 } = require("@shared/systems/physics/system.js"),
    { 
  createParticleUpdater
 } = require("@shared/field.js"),
    { 
  randomLocation,
  nextSpawn,
  spawnAnt,
  ants,
  home,
  homePos,
  nextSpawn,
  plants,
  rocks,
  spawnPlant,
  spawnRock,
  rockGenStep
 } = require("@obstacles/entities.js"),
    { 
  randomLocation
 } = require("@obstacles/location.js");
const updateParticle=createParticleUpdater(config, game);
game.events.on("tick", (() => {
	
  console.log("latency", game.ticker.averageLatency);
  console.log("fps", game.ticker.averageFps);
  nextSpawn(game);
  (function() {
    if (((game.ticker.ticks % 5) === 0 && config.rocks > rocks.size)) {
      return rockGenStep();
    }
  }).call(this);
  (function() {
    if (((game.ticker.ticks % 5) === 2 && config.startingPlants > plants.size)) {
      return spawnPlant(randomLocation(), ((Math.random() * ( - config.plantMassLimit)) + config.plantMassLimit));
    }
  }).call(this);
  return (function() {
    if ((game.ticker.ticks % 50)) {
      return plants.group.each(((plant) => {
      	
        var physics = game.systems.get(Physics, plant);
        (function() {
          if (0 >= physics.mass) {
            return plants.despawn(plant);
          } else {
            const x=(physics.mass + (Math.random() * 10 * config.growthRate));
            physics.mass = x;
            physics.scale = x;
            return (function() {
              if (physics.mass > config.plantMassLimit) {
                const x=(physics.mass / 2);
                physics.mass = x;
                physics.scale = x;
                const plant_=spawnPlant([ (((Math.random() * physics.scale) * (function() {
                  if (Math.random() < 0.5) {
                    return -1;
                  } else {
                    return 1;
                  }
                }).call(this)) + physics.position.x), (((Math.random() * physics.scale) * (function() {
                  if (Math.random() < 0.5) {
                    return -1;
                  } else {
                    return 1;
                  }
                }).call(this)) + physics.position.y) ], physics.mass);
                const physics_=game.systems.get(Physics, plant_);
                const vx=((Math.random() * config.spawnStatic) * (function() {
                  if (Math.random() < 0.5) {
                    return -1;
                  } else {
                    return 1;
                  }
                }).call(this));
                const vy=((Math.random() * config.spawnStatic) * (function() {
                  if (Math.random() < 0.5) {
                    return -1;
                  } else {
                    return 1;
                  }
                }).call(this));
                physics.velocity.accelerate([ vx, vy ]);
                return physics_.velocity.accelerate([ (-1 * vx), (-1 * vy) ]);
              }
            }).call(this);
          }
        }).call(this);
        return null;
      
      }));
    }
  }).call(this);

})).once("error", ((err) => {
	
  console.log("error on", "tick", "of", "game.events", "given", "null");
  return console.log(err);

}));
},{"@obstacles/config.js":"@obstacles/config.js","@obstacles/entities.js":"@obstacles/entities.js","@obstacles/game.js":"@obstacles/game.js","@obstacles/location.js":"@obstacles/location.js","@shared/field.js":"@shared/field.js","@shared/systems/physics/system.js":"@shared/systems/physics/system.js","@shared/systems/position.js":"@shared/systems/position.js","@shared/systems/velocity.js":"@shared/systems/velocity.js"}]},{},[]);
