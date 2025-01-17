require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/world-gen/super-position.js":[function(require,module,exports){
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
 } = require("@crash-landed/world-gen/base-weights.js"),
    { 
  SuperPositionDistrobution,
  ExpectedLikelyhoodGivenCurrentState,
  CurrentDistrobution
 } = require("@crash-landed/world-gen/probabilities.js"),
    { 
  TerrainModule
 } = require("@crash-landed/world-gen/terrain-module.js"),
    { 
  PossibleState
 } = require("@crash-landed/world-gen/possible-state.js"),
    { 
  summate
 } = require("@shared/math/math.js");
var calculateEntropy = (function calculateEntropy$(weights) {
  /* calculate-entropy eval.sibilant:14:0 */

  const sumOfWeights=summate(weights);
  const sumOfLogWeights=weights.reduce(((sum, weight) => {
  	
    return (sum + (weight * Math.log(weight)));
  
  }), 0);
  return (Math.log(sumOfWeights) - (sumOfLogWeights / sumOfWeights));
});
var SuperPosition = Spawnable.define("SuperPosition", { 
  init( cell = this.cell,possibleStates = TerrainModule.modules.map(((chunkType) => {
  	
    return PossibleState.spawn(this, chunkType);
  
  })) ){ 
    
      this.cell = cell;this.possibleStates = possibleStates;
      return this;
    
   },
  get state(  ){ 
    
      return this.cell.type;
    
   },
  set state( v ){ 
    
      return this.cell.type = v;
    
   },
  get weights(  ){ 
    
      return this.validStates.map(((state) => {
      	
        return state.weight;
      
      }));
    
   },
  get totalWeight(  ){ 
    
      return summate(this.weights);
    
   },
  get entropy(  ){ 
    
      const e=calculateEntropy(this.weights);
      (function() {
        if (isNaN(e)) {
          throw (new Error("entropy is NaN"))
        }
      }).call(this);
      return e;
    
   },
  get probabilityDistrobution(  ){ 
    
      return (function() {
        if (this._probabilityDistrobution) {
          return this._probabilityDistrobution;
        } else {
          return this._probabilityDistrobution = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return SuperPositionDistrobution.spawn(this);
          }).call(this);
        }
      }).call(this);
    
   },
  get edges(  ){ 
    
      const tile=this.cell;
      return [ tile.north, tile.south, tile.east, tile.west, tile.northEast, tile.northWest, tile.southEast, tile.southWest ];
    
   },
  get neighbors(  ){ 
    
      return (function() {
        if (this._neighbors) {
          return this._neighbors;
        } else {
          return this._neighbors = (function() {
            /* inc/misc.sibilant:1:3417 */
          
            return this.edges.map(((neighbor) => {
            	
              return SuperPosition.spawn(neighbor);
            
            }));
          }).call(this);
        }
      }).call(this);
    
   },
  get validStates(  ){ 
    
      return this.getValidStates();
    
   },
  get collapsedNeighbors(  ){ 
    
      return this.neighbors.filter(((superPosition) => {
      	
        return superPosition.state;
      
      }));
    
   },
  get uncollapsedNeighbors(  ){ 
    
      return this.neighbors.filter(((superPosition) => {
      	
        return (superPosition.validStates.length && !(superPosition.state));
      
      })).sort(((a, b) => {
      	
        return (b.entropy - a.entropy);
      
      }));
    
   },
  clear(  ){ 
    
      (function() {
        if (this._probabilityDistrobution) {
          (function() {
            if (this._probabilityDistrobution.spawn) {
              return this._probabilityDistrobution.despawn();
            } else if ((this._probabilityDistrobution[0] && this._probabilityDistrobution[0].spawn)) {
              return this._probabilityDistrobution.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._probabilityDistrobution = null;
        }
      }).call(this);
      (function() {
        if (this._neighbors) {
          (function() {
            if (this._neighbors.spawn) {
              return this._neighbors.despawn();
            } else if ((this._neighbors[0] && this._neighbors[0].spawn)) {
              return this._neighbors.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._neighbors = null;
        }
      }).call(this);
      this.possibleStates.each(((state) => {
      	
        return state.despawn();
      
      }));
      this.cell = null;
      return this.possibleStates = null;
    
   },
  getValidStates(  ){ 
    
      return this.possibleStates.filter(((state) => {
      	
        return state.isValid__QUERY(this.cell);
      
      }));
    
   },
  getLikelyhoodOfState( tileType ){ 
    
      return (this.validStates.reduce(((typeWeight, state) => {
      	
        return (function() {
          if (state.collapsedState === tileType) {
            return (typeWeight + state.weight);
          } else {
            return typeWeight;
          }
        }).call(this);
      
      }), 0) / this.totalWeight);
    
   },
  collapse( testing = false,depth = 0,maxDepth = 3,cell = this.cell ){ 
    
      if( this.state ){ 
        return ;
       };
      this.state = (function() {
        if (this.validStates.length === 1) {
          return this.validStates[0].collapsedState;
        } else if (this.validStates.length === 0) {
          return ExpectedLikelyhoodGivenCurrentState.sample();
        } else if (depth >= maxDepth) {
          return this.probabilityDistrobution.sample();
        } else {
          const temp=[];
          var newState = null;
          for (var neighbor of this.uncollapsedNeighbors)
          {
          temp.push(neighbor);
          neighbor.collapse(true, (depth + 1), maxDepth);
          if( this.validStates.length === 1 ){ 
            newState = this.validStates[0].state;;
            break
           };
          if( this.validStates.length === 0 ){ 
            temp.state = null;
           }
          }
          ;
          for (var neighbor of temp)
          {
          neighbor.state = null;
          }
          ;
          return (function() {
            if (!(newState)) {
              return this.probabilityDistrobution.sample();
            } else {
              return newState;
            }
          }).call(this);
        }
      }).call(this);
      return (function() {
        if (!(testing)) {
          return ((CurrentDistrobution[(this.state + "Instances")])++);
        }
      }).call(this);
    
   }
 });
exports.SuperPosition = SuperPosition;
},{"@crash-landed/world-gen/base-weights.js":"@crash-landed/world-gen/base-weights.js","@crash-landed/world-gen/possible-state.js":"@crash-landed/world-gen/possible-state.js","@crash-landed/world-gen/probabilities.js":"@crash-landed/world-gen/probabilities.js","@crash-landed/world-gen/terrain-module.js":"@crash-landed/world-gen/terrain-module.js","@shared/data-structures/spawnable.js":"@shared/data-structures/spawnable.js","@shared/math/math.js":"@shared/math/math.js"}]},{},[]);
