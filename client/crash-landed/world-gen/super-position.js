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
var calculateEntropy = (function calculateEntropy$(weights) {
  /* calculate-entropy eval.sibilant:1:206 */

  const sumOfWeights=summate(weights);
  const sumOfLogWeights=weights.reduce(((sum, weight) => {
  	
    return (sum + (weight * Math.log(weight)));
  
  }), 0);
  return (Math.log(sumOfWeights) - (sumOfLogWeights / sumOfWeights));
});
var PossibleState = Spawnable.define("PossibleState", { 
  init( superPosition = this.superPosition,configuration = this.configuration,isPossible__QUERY = true ){ 
    
      this.superPosition = superPosition;this.configuration = configuration;this.isPossible__QUERY = isPossible__QUERY;
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
            /* eval.sibilant:19:24 */
          
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
            /* eval.sibilant:19:24 */
          
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
    
      return configuration.every(((tileType, direction) => {
      	
        return (direction === "center" || tile[direction].entity.ground.type === tileType || !(tile[direction].entity.ground.type));
      
      }));
    
   }
 });
var SuperPosition = Spawnable.define("SuperPosition", { 
  init( cell = this.cell,possibleStates = TileChunk.chunks.map(((chunkType) => {
  	
    return PossibleState.spawn(this, chunkType);
  
  })) ){ 
    
      this.cell = cell;this.possibleStates = possibleStates;
      return this;
    
   },
  get state(  ){ 
    
      return this.cell.entity.ground.type;
    
   },
  set state( s ){ 
    
      return this.cell.entity.ground.type = s;
    
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
            /* eval.sibilant:19:24 */
          
            return SuperPositionDistrobution.spawn(this);
          }).call(this);
        }
      }).call(this);
    
   },
  get neighbors(  ){ 
    
      return (function() {
        if (this._neighbors) {
          return this._neighbors;
        } else {
          return this._neighbors = (function() {
            /* eval.sibilant:19:24 */
          
            return this.cell.edges.map(((neighbor) => {
            	
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