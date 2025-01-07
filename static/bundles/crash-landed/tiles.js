require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/tiles.js":[function(require,module,exports){
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
var Floor = TileComponent.define("Floor", { 
  
 });
var Flooring = TileSystem.define("Flooring", { 
  types:[ "dirt", "rock", "grass" ],
  interface:Floor
 });
var TileSprite = Sprite.define("TileSprite", { 
  
 });
var TileSprites = Sprites.define("TileSprites", { 
  interface:TileSprite
 });
var TileComponent = Component.define("TileComponent", { 
  
 });
var TileSystem = System.define("TileSystem", { 
  interface:TileData
 });
const tileSystems=[ Flooring, FloorSprite, Contents, Visibility, Temperature, Traversability, MovementSignals, MemoryLabels, Beauty ];
const tiles=TileGraph.spawn(tileSystems);
},{}]},{},[]);
