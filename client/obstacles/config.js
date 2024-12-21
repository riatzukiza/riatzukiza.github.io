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
const dim=[ (0.8 * window.innerWidth), (window.innerHeight - 3) ];
const size=1;
module.exports.size = size;
module.exports.uiPollingRate = 10;
module.exports.trailResolution = 5;
module.exports.angleZoom = 5;
module.exports.noiseZ = 155;
module.exports.fieldForce = 9;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.1;
module.exports.maxLength = 220;
module.exports.trailResultDuration = 5000;
module.exports.growthRate = 0.0005;
module.exports.startingPlants = 10;
module.exports.plantMassLimit = 30;
module.exports.antLimit = 500;
module.exports.maxInDecay = 1000;
module.exports.trailLimit = 30000;
module.exports.antLife = 120000;
module.exports.decayOnCollision = true;
module.exports.optionsAmplitude = 10;
module.exports.limitDecay = false;
module.exports.antInfluence = 10;
module.exports.friction = 1;
module.exports.collisionStatic = 5;
module.exports.spawnStatic = 1;
module.exports.spawnRate = 10;
module.exports.homeLocation = [ 300, 200 ];
module.exports.targetLocation = [ 700, 900 ];
module.exports.rocks = 500;
module.exports.rockMinSize = 8;
module.exports.rockMaxSize = 16;
module.exports.rockMassScalingFactor = 0.05;
module.exports.rockMinMassFactor = 1;
module.exports.rockMaxMassFactor = 100;
module.exports.stationaryResistanceCoefficiant = 1.1;
module.exports.trackTrail = true;
module.exports.varyNoiseWithTime = true;
module.exports.rewardWinners = true;
module.exports.winYield = 10;
module.exports.lossFactor = 10;
module.exports.punishLoosers = true;
module.exports.stepWiseUpdate = true;
module.exports.gameSpeed = 1;