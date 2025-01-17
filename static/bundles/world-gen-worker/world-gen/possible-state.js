require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@world-gen-worker/world-gen/possible-state.js":[function(require,module,exports){
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1123 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1185 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js"),
    { 
  baseWeights
 } = require("@crash-landed/world-gen/base-weights.js");
var PossibleState = Spawnable.define("PossibleState", { 
  init( superPosition = this.superPosition,configuration = this.configuration ){ 
    
      this.superPosition = superPosition;this.configuration = configuration;
      return this;
    
   },
  get collapsedState(  ){ 
    
      return this.configuration.get("center");
    
   },
  get tile(  ){ 
    
      return this.superPosition.tile;
    
   },
  get likelyhood(  ){ 
    
      return (function() {
        if (this._likelyhood) {
          return this._likelyhood;
        } else {
          return this._likelyhood = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return (this.superPosition.totalWeight / this.weight);
          }).call(this);
        }
      }).call(this);
    
   },
  get weight(  ){ 
    
      return (function() {
        if (this._weight) {
          return this._weight;
        } else {
          return this._weight = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return this.calculateWeight();
          }).call(this);
        }
      }).call(this);
    
   },
  clear(  ){ 
    
      (function() {
        if (this._weight) {
          (function() {
            if (this._weight.spawn) {
              return this._weight.despawn();
            } else if ((this._weight[0] && this._weight[0].spawn)) {
              return this._weight.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._weight = null;
        }
      }).call(this);
      (function() {
        if (this._likelyhood) {
          (function() {
            if (this._likelyhood.spawn) {
              return this._likelyhood.despawn();
            } else if ((this._likelyhood[0] && this._likelyhood[0].spawn)) {
              return this._likelyhood.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._likelyhood = null;
        }
      }).call(this);
      this.superPosition = null;
      return this.configuration = null;
    
   },
  calculateWeight( configuration = this.configuration ){ 
    
      return configuration.reduce(((weight, tileType, direction) => {
      	
        return (weight + (configuration.weight * baseWeights[tileType]));
      
      }), 0);
    
   },
  isValid__QUERY( tile = this.tile,configuration = this.configuration ){ 
    
      if( !(this.weight) ){ 
        return false;
       };
      return configuration.every(((tileType, direction) => {
      	
        return (direction === "center" || tile[direction].entity.ground.type === tileType || !(tile[direction].entity.ground.type));
      
      }));
    
   }
 });
exports.PossibleState = PossibleState;
},{"@crash-landed/world-gen/base-weights.js":"@crash-landed/world-gen/base-weights.js","@shared/data-structures/spawnable.js":"@shared/data-structures/spawnable.js"}]},{},[]);
