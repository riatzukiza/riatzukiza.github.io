Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1831 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1893 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import '/bundles/external.js';
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
global.mixin = mixin;
global.create = create;
import { 
  rocks,
  spawnRock,
  rockGenStep
 } from "@obstacles/entities/rocks.js";
import { 
  ants,
  spawnAnt,
  clearAnts
 } from "@obstacles/entities/ants.js";
import { 
  plants,
  spawnPlant
 } from "@obstacles/entities/plants.js";
import { 
  trailSegments,
  spawnAntTrailSegment
 } from "@obstacles/entities/trail-segments.js";
import { 
  home,
  homePos
 } from "@obstacles/entities/home.js";
import { 
  config
 } from "@obstacles/config.js";
var clear = (function() {
  /* eval.sibilant:14:11 */

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
export { 
  nextSpawn
 };
export { 
  rockGenStep
 };
export { 
  spawnRock
 };
export { 
  spawnPlant
 };
export { 
  spawnAnt
 };
export { 
  ants
 };
export { 
  plants
 };
export { 
  rocks
 };
export { 
  home
 };
export { 
  homePos
 };
export { 
  clearAnts
 };
export { 
  trailSegments
 };
export { 
  spawnAntTrailSegment
 };
const entities={ 
  nextSpawn,
  rockGenStep,
  spawnRock,
  spawnPlant,
  spawnAnt,
  ants,
  plants,
  rocks,
  home,
  homePos,
  clearAnts,
  trailSegments,
  spawnAntTrailSegment
 };
export { 
  entities
 };