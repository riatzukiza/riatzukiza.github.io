Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
const dim=[ (0.8 * window.innerWidth), (window.innerHeight - 3) ];
const size=1;
module.exports.size = size;
module.exports.uiPollingRate = 10;
module.exports.trailResolution = 5;
module.exports.angleZoom = 35;
module.exports.noiseZ = 255;
module.exports.fieldForce = 28;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 1;
module.exports.maxLength = 200;
module.exports.trailResultDuration = 5000;
module.exports.growthRate = 0.0005;
module.exports.startingPlants = 1;
module.exports.plantMassLimit = 32;
module.exports.antLimit = 100;
module.exports.maxInDecay = 1000;
module.exports.trailLimit = 60000;
module.exports.antLife = 120000;
module.exports.decayOnCollision = true;
module.exports.optionsAmplitude = 10;
module.exports.limitDecay = false;
module.exports.antInfluence = 90;
module.exports.friction = 0.1;
module.exports.collisionStatic = 5;
module.exports.spawnStatic = 10;
module.exports.spawnRate = 10;
module.exports.homeLocation = [ 300, 200 ];
module.exports.targetLocation = [ 700, 900 ];
module.exports.rocks = 10;
module.exports.rockMinSize = 16;
module.exports.rockMaxSize = 32;
module.exports.rockMassScalingFactor = 1;
module.exports.rockMinMassFactor = 10;
module.exports.rockMaxMassFactor = 100;
module.exports.stationaryResistanceCoefficiant = 2;
module.exports.trackTrail = true;
module.exports.varyNoiseWithTime = true;
module.exports.rewardWinners = true;
module.exports.winYield = 30;
module.exports.lossFactor = 30;
module.exports.punishLoosers = true;
module.exports.stepWiseUpdate = true;
module.exports.gameSpeed = 1;