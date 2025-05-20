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
import { 
  Interface
 } from "/shared/kit/interface/index.js";
const dim=[ (0.8 * window.innerWidth), (window.innerHeight - 3) ];
const size=1;
var config = Interface.define("config", { 
  "size",
  size,
  "uiPollingRate",
  10,
  "trailResolution",
  5,
  "angleZoom",
  35,
  "noiseZ",
  255,
  "fieldForce",
  28,
  "dimensions",
  dim,
  "columns",
  Math.ceil:(dim[0] / size),
  "rows",
  Math.ceil:(dim[1] / size),
  "decay",
  1,
  "maxLength",
  200,
  "trailResultDuration",
  5000,
  "growthRate",
  0.0005,
  "startingPlants",
  1,
  "plantMassLimit",
  32,
  "antLimit",
  100,
  "maxInDecay",
  1000,
  "trailLimit",
  60000,
  "antLife",
  120000,
  "decayOnCollision",
  true,
  "optionsAmplitude",
  10,
  "limitDecay",
  false,
  "antInfluence",
  90,
  "friction",
  0.1,
  "collisionStatic",
  5,
  "spawnStatic",
  10,
  "spawnRate",
  10,
  "homeLocation",
  [ 300, 200 ],
  "targetLocation",
  [ 700, 900 ],
  "rocks",
  10,
  "rockMinSize",
  16,
  "rockMaxSize",
  32,
  "rockMassScalingFactor",
  1,
  "rockMinMassFactor",
  10,
  "rockMaxMassFactor",
  100,
  "stationaryResistanceCoefficiant",
  2,
  "trackTrail",
  true,
  "varyNoiseWithTime",
  true,
  "rewardWinners",
  true,
  "winYield",
  30,
  "lossFactor",
  30,
  "punishLoosers",
  true,
  "stepWiseUpdate",
  true,
  "gameSpeed",
  1
 });
export { 
  config
 };