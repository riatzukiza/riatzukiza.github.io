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
  Spawnable
 } = require("@shared/data-structures/spawnable.js"),
    { 
  System,
  Component
 } = require("@shared/ecs.js");
var { 
  Interface
 } = require("@kit-js/interface");
var GroundType = Spawnable.define("GroundType", { 
  init( spriteCoordMinX = 0,spriteCoordMinY = 0,spriteCoordMaxX = 3,spriteCoordMaxY = 3,movementSpeed = 0.75 ){ 
    
      this.spriteCoordMinX = spriteCoordMinX;this.spriteCoordMinY = spriteCoordMinY;this.spriteCoordMaxX = spriteCoordMaxX;this.spriteCoordMaxY = spriteCoordMaxY;this.movementSpeed = movementSpeed;
      return this;
    
   }
 });
var Ground = Component.define("Ground", { 
  type:null,
  get stats(  ){ 
    
      return this.system.types[this.type];
    
   }
 });
var GroundTypes = System.define("GroundTypes", { 
  interface:Ground,
  types:Interface.define("types", { 
    grass:GroundType.spawn(0, 0, 3, 3, 0.75),
    stone:GroundType.spawn(0, 3, 3, 7, 1.1),
    brokenStone:GroundType.spawn(3, 3, 7, 7, 1),
    floweryGrass:GroundType.spawn(3, 0, 7, 3, 0.7)
   }),
  _updateComponent(  ){ 
    
   }
 });
exports.GroundTypes = GroundTypes;