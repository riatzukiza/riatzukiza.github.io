require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/agents.js":[function(require,module,exports){
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
var EntityType = Interface.define("EntityType", { 
  init( properties = this.properties,entities = create(EntityGroup)(properties) ){ 
    
      this.properties = properties;this.entities = entities;
      return this;
    
   }
 });
var Unit = Interface.define("Unit", { 
  properties:[ Position, Physics, Velocity, Collision, LineOfSight ]
 });
var MentalState = System.define("MentalState", { 
  
 });
var Hunger = System.define("Hunger", { 
  
 });
var SpatialMemory = System.define("SpatialMemory", { 
  
 });
var Priorities = System.define("Priorities", { 
  
 });
var Animal = Unit.define("Animal", { 
  properties:[ Hunger, Health, SpatialMemory, MentalState, Priorities, Species, Objective ]
 });
var Faction = System.define("Faction", { 
  
 });
var Trait = Interface.define("Trait", { 
  
 });
var TraitList = Component.define("TraitList", { 
  
 });
var Traits = System.define("Traits", { 
  
 });
var Relationships = System.define("Relationships", { 
  
 });
var Contents = Component.define("Contents", { 
  items:[]
 });
var ItemContainer = System.define("ItemContainer", { 
  interface:Contents,
  requires:[ Position ]
 });
var Item = EntityType.define("Item", { 
  properties:[ Sprite, Stats ]
 });
var Inventory = ItemContainer.define("Inventory", { 
  
 });
var Equipment = ItemContainer.define("Equipment", { 
  
 });
var Human = Unit.define("Human", { 
  properties:Animals.properties.concat([ Traits, Relationships, Inventory, Equipment, Faction ])
 });
},{}]},{},[]);
