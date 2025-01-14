require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/systems/sprites/floor.js":[function(require,module,exports){
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
  AnimatedSprite,
  SpriteAtlas
 } = require("@shared/systems/rendering/sprite-atlas.js");
const spriteImage=document.getElementById("grass-sprite");
var FloorSprite = AnimatedSprite.define("FloorSprite", { 
  get visible__QUERY(  ){ 
    
      return this.entity.visibleStatus.visible__QUERY;
    
   },
  get explored__QUERY(  ){ 
    
      return this.entity.visibleStatus.explored__QUERY;
    
   },
  get alpha(  ){ 
    
      return (function() {
        if (this.visible__QUERY) {
          return 1;
        } else if (this.explored__QUERY) {
          return 0.8;
        } else {
          return 0;
        }
      }).call(this);
    
   },
  selectTile( x,y ){ 
    
      (function() {
        if (x >= this.width) {
          throw (new RangeError("Column selection out of range"))
        }
      }).call(this);
      (function() {
        if (y >= this.height) {
          throw (new RangeError("Row selection out of range"))
        }
      }).call(this);
      this.column = x;
      return this.row = y;
    
   },
  step(  ){ 
    
      return this.currentFrame = ((this.currentFrame + 1) % this.system.sequenceLength);
    
   }
 });
exports.FloorSprite = FloorSprite;
var FloorSprites = SpriteAtlas.define("FloorSprites", { 
  maxSprites:1000000,
  interface:FloorSprite,
  frameDimensions:[ 32, 32 ],
  height:8,
  width:8,
  img:spriteImage
 });
exports.FloorSprites = FloorSprites;
},{"@shared/systems/rendering/sprite-atlas.js":"@shared/systems/rendering/sprite-atlas.js"}]},{},[]);
