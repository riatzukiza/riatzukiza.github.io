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
var PossibleState = Interface.define("PossibleState", { 
  init( configuration = this.configuration,collapsedState = "grassyFlowers",isPossible__QUERY = true,weight = 0 ){ 
    
      this.configuration = configuration;this.collapsedState = collapsedState;this.isPossible__QUERY = isPossible__QUERY;this.weight = weight;
      return this;
    
   },
  test( tile = this.tile ){ 
    
      return chunkType.every(((tileType, direction) => {
      	
        return (function() {
          if (direction === "center") {
            possibility.collapsedState = tileType;
            return possibility.weight = (possibility.weight + (chunkType.weight * baseWeights[tileType]));
          } else if (tile[direction].entity.ground.type === tileType) {
            return possibility.weight += (chunkType.weight * baseWeights[tileType]);
          } else if (tile[direction].entity.ground.type !== tileType) {
            return false;
          }
        }).call(this);
      
      }));
    
   }
 });
TileNode.collapseWaveFunction = (function TileNode$collapseWaveFunction$() {
  /* Tile-node.collapse-wave-function node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  const possibleStates=[];
  for (var chunkType of TileChunk.chunks)
  {
  const possibility=create(PossibleState)(configuration);;
  if( possibility.test(this) ){ 
    possibleStates.push(possibility)
   }
  }
  ;
  console.log(possibleStates);
  var choices = Interface.define("choices", { 
    grass:0,
    stone:0,
    floweryGrass:0
   });
  return (function() {
    if (possibleStates.length === 1) {
      return possibleStates[0];
    } else if (possibleStates.length === 0) {
      return false;
    } else if (possibleStates.length > 1) {
      var result = null;
      for (var state of possibleStates)
      {
      const unconfiguredNeigbors=[];;
      const isValid__QUERY=state.configuration.every(((tileType, direction) => {
      	
        const neighbor=this[direction];
        return (function() {
          if (!(neighbor.entity.ground.type)) {
            unconfiguredNeigbors.push(neighbor);
            neighbor.entity.ground.type = tileType;
            const collapsedState=neighbor.collapseWaveFunction();
            return collapsedState;
          } else {
            return true;
          }
        }).call(this);
      
      }));;
      for (var neighbor of unconfiguredNeigbors)
      {
      neighbor.entity.ground.type = null;
      }
      ;
      if( isValid__QUERY ){ 
        result = state;;
        break()
       }
      }
      ;
      return result;
    }
  }).call(this);
});