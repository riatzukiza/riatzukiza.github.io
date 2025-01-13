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
    
      return this.entity.currentPath.system.tiles.getFromWorldPos(this.pos.x, this.pos.y);
    
   },
  get pos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  get explorative(  ){ 
    
      return (1 / (this.hunger + this.tiredness));
    
   },
  set target( t ){ 
    
      this.entity.currentPath.start = this.tile;
      return this.entity.currentPath.end = this.tile.graph.getFromWorldPos(t.positionInterface.x, t.positionInterface.y);
    
   },
  get target(  ){ 
    
      return this.entity.currentPath.end;
    
   },
  get visibleTiles(  ){ 
    
      return this.entity.fieldOfView.visibleTiles;
    
   },
  knownFoodItems:RedBlackTree.spawn()
 });
var MentalState = System.define("MentalState", { 
  _updateComponent( c ){ 
    
      c.visibleTiles.each(tile(), (function() {
        if (tile.entity.container.object.type === "food") {
          return this.knownFoodItems.set((tile.worldPos.x + tile.worldPos.y), tile.entity.container.objects.first);
        }
      }).call(this));
      return (function() {
        if ((c.isTired__QUERY && !(c.isHungry__QUERY))) {
          return c.needs.isResting__QUERY = true;
        } else if ((c.needs.isResting__QUERY && c.needs.isStarving__QUERY)) {
          return c.needs.isResting__QUERY = false;
        } else if ((c.isHungry__QUERY && !(c.isResting__QUERY))) {
          return (function() {
            if (c.tile.container.hasType("food")) {
              return c.tile.container.first.consume(c.entity);
            } else if ((!(c.target.container.hasType("food")) && !(c.target.visibleStatus.explored__QUERY) && c.knownFoodItems.size)) {
              const items=c.knownFoodItems.search((c.pos.x + c.pos.y));
              return (function() {
                {
                  return items.head;
                }
              }).call(this);
            }
          }).call(this);
        }
      }).call(this);
    
   }
 });
},{}]},{},[]);
