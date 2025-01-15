require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/systems/mental-state.js":[function(require,module,exports){
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
  System,
  Component
 } = require("@shared/ecs.js"),
    { 
  List
 } = require("@shared/data-structures/list.js"),
    { 
  RedBlackTree
 } = require("@shared/data-structures/trees/red-black-tree.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    noise = require("@shared/noise.js"),
    config = require("@crash-landed/config.js");
var getMoveNoise = (function getMoveNoise$(x = this.x, y = this.y, t = this.t, force = 16, v = Vector.spawn(1, 1)) {
  /* get-move-noise node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  v.setAngle((noise.simplex3((x / config.angleZoom / 5), (y / config.angleZoom / 5), (t * (config.noiseZ / 10000))) * Math.PI * 2));
  const length=noise.simplex3(((x / 50) + 40000), ((x / 50) + 40000), (t * (config.noiseZ / 10000)));
  v.setLength((length * force));
  return v;
});
var MindState = Component.define("MindState", { 
  get needs(  ){ 
    
      return this.entity.needs;
    
   },
  get hunger(  ){ 
    
      return this.needs.hungerEfficiencyModifier;
    
   },
  get isHungry__QUERY(  ){ 
    
      return this.needs.isHungry__QUERY;
    
   },
  get isTired__QUERY(  ){ 
    
      return this.needs.isTired__QUERY;
    
   },
  get tiredness(  ){ 
    
      return this.needs.sleepEfficiencyModifier;
    
   },
  get threat(  ){ 
    
      return 0;
    
   },
  get tile(  ){ 
    
      return this.entity.currentPath.system.tiles.getClosestFromWorldPos(this.pos.x, this.pos.y);
    
   },
  get pos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  get explorative(  ){ 
    
      return (1 / (this.hunger + this.tiredness));
    
   },
  set target( t ){ 
    
      this.entity.currentPath.start = this.tile;
      return this.entity.currentPath.end = t;
    
   },
  get target(  ){ 
    
      return this.entity.currentPath.end;
    
   },
  get visibleTiles(  ){ 
    
      return this.entity.fieldOfView.visibleTiles;
    
   },
  food:(new Set()),
  knownFoodItems:RedBlackTree.spawn()
 });
exports.MindState = MindState;
var MentalState = System.define("MentalState", { 
  interface:MindState,
  _updateComponent( c ){ 
    
      c.visibleTiles.each(((tile) => {
      	
        return (function() {
          if ((tile.entity.container.objects.head && !(c.food.has(tile.entity.container.objects.head.item.itemInterface)) && tile.entity.container.objects.head.item.itemInterface.type === "food")) {
            c.food.add(tile.entity.container.objects.head.item.itemInterface);
            return c.knownFoodItems.set(("" + tile.worldPos.x + tile.worldPos.y), tile);
          }
        }).call(this);
      
      }));
      return (function() {
        if ((c.isTired__QUERY && !(c.isHungry__QUERY) && !(c.needs.isResting__QUERY))) {
          c.needs.isResting__QUERY = true;
          c.entity.velocityInterface.vector.setLength(0);
          c.target = null;
          return console.log("I'm tired, it's time to rest", c);
        } else if ((c.needs.isResting__QUERY && c.needs.isStarving__QUERY)) {
          c.needs.isResting__QUERY = false;
          return console.log("i'm starving, I have to wake up.", c);
        } else if ((c.isHungry__QUERY && !(c.isResting__QUERY))) {
          c.knownFoodItems = c.knownFoodItems.root;
          return (function() {
            if (c.tile.entity.container.hasType("food")) {
              console.log("I'm hungry, and there's food right here", c);
              return c.tile.entity.container.objects.head.item.itemInterface.consume(c.entity);
            } else if ((!(c.tile.entity.container.hasType("food")) && !(c.target))) {
              console.log("I'm hungry and I know where food is");
              const key=(c.pos.x + c.pos.y);
              const items=c.knownFoodItems.search(key);
              return (function() {
                if (items.values.head) {
                  c.target = items.values.head.item;
                  return c.knownFoodItems.remove(key, items.values.head.item);
                }
              }).call(this);
            }
          }).call(this);
        } else if (!(c.needs.isResting__QUERY)) {
          var newX = c.entity.positionInterface.x,
              newY = c.entity.positionInterface.y;
          const searchLimit=10;
          var i = 0;
          return (function() {
            var while$154 = undefined;
            while (!((c.entity.currentPath.end || i > searchLimit))) {
              while$154 = (function() {
                const noiseV=getMoveNoise(newX, newY, this.game.ticker.ticks, (1 * config.gameScale));
                ((i)++);
                newX = (newX + (20 * noiseV.x));
                newY = (newY + (20 * noiseV.y));
                const tiles=c.tile.graph;
                const possibleEnd=tiles.getClosestFromWorldPos(newX, newY);
                (function() {
                  if (!((possibleEnd.entity.visibleStatus.explored__QUERY))) {
                    c.entity.currentPath.start = tiles.getClosestFromWorldPos(c.entity.positionInterface.x, c.entity.positionInterface.y);
                    return c.entity.currentPath.end = possibleEnd;
                  }
                }).call(this);
                return noiseV.despawn();
              }).call(this);
            };
            return while$154;
          }).call(this);
        }
      }).call(this);
    
   }
 });
exports.MentalState = MentalState;
},{"@crash-landed/config.js":"@crash-landed/config.js","@shared/data-structures/list.js":"@shared/data-structures/list.js","@shared/data-structures/trees/red-black-tree.js":"@shared/data-structures/trees/red-black-tree.js","@shared/ecs.js":"@shared/ecs.js","@shared/noise.js":"@shared/noise.js","@shared/vectors.js":"@shared/vectors.js"}]},{},[]);
