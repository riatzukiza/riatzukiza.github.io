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
var { 
  Sprites,
  Sprite
 } = require("@shared/systems/rendering/gl-sprites.js");
const antImage=document.getElementById("ant-texture");
var AntSprite = Sprite.define("AntSprite", { 
  
 });
var AntSprites = Sprites.define("AntSprites", { 
  id:1,
  interface:AntSprite,
  img:antImage
 });
export { 
  AntSprites
 };