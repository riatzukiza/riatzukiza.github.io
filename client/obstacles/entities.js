var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var { 
  Interface
 } = require("@kit-js/interface");
global.mixin = mixin;
global.create = create;
var { 
  rocks,
  spawnRock,
  rockGenStep
 } = require("@obstacles/entities/rocks.js"),
    { 
  ants,
  spawnAnt,
  clearAnts
 } = require("@obstacles/entities/ants.js"),
    { 
  plants,
  spawnPlant
 } = require("@obstacles/entities/plants.js"),
    { 
  home,
  homePos
 } = require("@obstacles/entities/home.js"),
    config = require("@obstacles/config.js");
var clear = (function() {
  /* eval.sibilant:18:11 */

  return arguments[0].clear();
});
var nextSpawnTime = 0;
var nextSpawn = ((game) => {
	
  nextSpawnTime += game.ticker.elapsed;
  return (function() {
    if ((nextSpawnTime > (1000 / config.spawnRate) && ants.group.size <= config.antLimit)) {
      spawnAnt([ homePos.x, homePos.y ], home);
      return nextSpawnTime = 0;
    }
  }).call(this);

});
exports.nextSpawn = nextSpawn;
exports.rockGenStep = rockGenStep;
exports.spawnRock = spawnRock;
exports.spawnPlant = spawnPlant;
exports.spawnAnt = spawnAnt;
exports.ants = ants;
exports.plants = plants;
exports.rocks = rocks;
exports.home = home;
exports.homePos = homePos;
exports.clearAnts = clearAnts;