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
var { 
  TileGraph,
  TileNode
 } = require("@shared/tiles.js"),
    { 
  FloorSprites
 } = require("@crash-landed/systems/sprites/floor.js"),
    { 
  TileVisibility
 } = require("@crash-landed/systems/visibility.js"),
    { 
  GroundTypes
 } = require("@crash-landed/systems/floor-type.js"),
    { 
  Containers
 } = require("@crash-landed/systems/containers.js"),
    { 
  game
 } = require("@crash-landed/game.js"),
    config = require("@crash-landed/config.js");
const gameScale=config.gameScale;
const tileSystems=[ FloorSprites, TileVisibility, GroundTypes, Containers ];
const tiles=TileGraph.spawn(gameScale, tileSystems, game);
exports.tiles = tiles;
exports.tileSystems = tileSystems;
},{"@crash-landed/config.js":"@crash-landed/config.js","@crash-landed/game.js":"@crash-landed/game.js","@crash-landed/systems/containers.js":"@crash-landed/systems/containers.js","@crash-landed/systems/floor-type.js":"@crash-landed/systems/floor-type.js","@crash-landed/systems/sprites/floor.js":"@crash-landed/systems/sprites/floor.js","@crash-landed/systems/visibility.js":"@crash-landed/systems/visibility.js","@shared/tiles.js":"@shared/tiles.js"}]},{},[]);
