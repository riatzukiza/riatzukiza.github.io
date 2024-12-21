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
  Sprites,
  Sprite
 } = require("@shared/systems/rendering/gl-sprites.js");
var RockSprite = Sprite.define("RockSprite", { 
  
 });
const rockImage=document.getElementById("rock-texture");
var RockSprites = Sprites.define("RockSprites", { 
  interface:RockSprite,
  id:1,
  img:rockImage
 });
exports.RockSprites = RockSprites;