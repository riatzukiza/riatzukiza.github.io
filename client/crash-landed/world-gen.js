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
var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var { 
  Interface
 } = require("@kit-js/interface");
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
global.mixin = mixin;
global.create = create;
var { 
  game,
  activeGameSystems
 } = require("@crash-landed/game.js");
var { 
  startInterface
 } = require("@crash-landed/dom.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Friction
 } = require("@crash-landed/forces.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    { 
  PlayerSprites
 } = require("@crash-landed/systems/sprites/player.js"),
    { 
  FloorSprites
 } = require("@crash-landed/systems/sprites/floor.js"),
    { 
  PropsSprites
 } = require("@crash-landed/systems/sprites/basic-props.js"),
    { 
  Sight
 } = require("@crash-landed/systems/sight.js"),
    { 
  TileVisibility
 } = require("@crash-landed/systems/visibility.js"),
    { 
  PathFinding
 } = require("@crash-landed/systems/path-finding.js"),
    { 
  GroundTypes
 } = require("@crash-landed/systems/floor-type.js"),
    { 
  Metabolisim
 } = require("@crash-landed/systems/metabolisim.js"),
    { 
  Containers
 } = require("@crash-landed/systems/containers.js"),
    { 
  MentalState
 } = require("@crash-landed/systems/mental-state.js"),
    { 
  Item
 } = require("@crash-landed/systems/item.js"),
    { 
  EntityGroup
 } = require("@shared/ecs/entity-group.js"),
    { 
  UnitGroup,
  UnitInstance
 } = require("@shared/units.js"),
    { 
  ItemGroup
 } = require("@crash-landed/units.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    { 
  Trie
 } = require("@shared/data-structures/trees/trie.js"),
    { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js"),
    { 
  getTileNoise
 } = require("@crash-landed/noise.js"),
    { 
  summate
 } = require("@shared/math/math.js"),
    noise = require("@shared/noise.js"),
    { 
  getCardinalDirection,
  getCardinalDirectionName
 } = require("@crash-landed/directions.js"),
    { 
  tiles
 } = require("@crash-landed/tiles.js"),
    config = require("@crash-landed/config.js");
var { 
  TileGraph,
  TileNode
 } = require("@shared/tiles.js");
var TileChunk = Interface.define("TileChunk", { 
  directions:[ [ "northWest", 0 ], [ "north", 1 ], [ "northEast", 2 ], [ "west", 3 ], [ "center", 4 ], [ "east", 5 ], [ "southWest", 6 ], [ "south", 7 ], [ "southEast", 8 ] ],
  chunks:[],
  weight:1,
  indexes:Interface.define("indexes", { 
    northWest:0,
    north:1,
    northEast:2,
    west:3,
    center:4,
    east:5,
    southWest:6,
    south:7,
    southEast:8
   }),
  init( data = [],weight = 1 ){ 
    
      this.data = data;this.weight = weight;
      this.chunks.push(this);
      return this;
    
   },
  create( weight,...data ){ 
    
      return create(TileChunk)(data, weight);
    
   },
  get( direction ){ 
    
      return this.data[this.indexes[direction]];
    
   },
  each( f = this.f,data = this.data,directions = this.directions ){ 
    
      return directions.each(((dir, i) => {
      	
        return f(data[dir[1]], dir[0], i);
      
      }));
    
   },
  reduce( f = this.f,initialValue = this.initialValue,data = this.data,directions = this.directions ){ 
    
      return directions.reduce(((acc, dir, i) => {
      	
        return f(acc, data[dir[1]], dir[0], i);
      
      }), initialValue);
    
   },
  every( f = this.f,data = this.data,directions = this.directions ){ 
    
      return directions.every(((dir, i) => {
      	
        return f(data[dir[1]], dir[0], i);
      
      }));
    
   }
 });
const roadWeight=10;
const turnWeight=1e-8;
const crossRoadsWeight=turnWeight;
const horizontalRoad=TileChunk.create(roadWeight, "grass", "grass", "grass", "stone", "stone", "stone", "grass", "grass", "grass");
const verticalRoad=create(TileChunk)([ "grass", "stone", "grass", "grass", "stone", "grass", "grass", "stone", "grass" ]);
verticalRoad.weight = roadWeight;
const leftDiagonalRoad=TileChunk.create(turnWeight, "stone", "grass", "grass", "grass", "stone", "grass", "grass", "grass", "stone");
const rightDiagonalRoad=TileChunk.create(turnWeight, "grass", "grass", "stone", "grass", "stone", "grass", "stone", "grass", "grass");
const crossRoads=create(TileChunk)([ "grass", "stone", "grass", "stone", "stone", "stone", "grass", "stone", "grass" ]);
crossRoads.weight = crossRoadsWeight;
const northEastTurn=create(TileChunk)([ "grass", "grass", "grass", "grass", "stone", "stone", "grass", "stone", "grass" ]);
northEastTurn.weight = turnWeight;
const northWestTurn=create(TileChunk)([ "grass", "grass", "grass", "stone", "stone", "grass", "grass", "stone", "grass" ]);
northWestTurn.weight = turnWeight;
create(TileChunk)([ "grass", "grass", "grass", "stone", "stone", "grass", "stone", "stone", "grass" ]);
const southWestTurn=create(TileChunk)([ "grass", "stone", "grass", "stone", "stone", "grass", "grass", "grass", "grass" ]);
southWestTurn.weight = turnWeight;
var generateMainRoad = (function generateMainRoad$() {
  /* generate-main-road eval.sibilant:338:0 */

  var tile = tiles.get(0, 0);
  var i = 0;
  console.log(tile.entity.ground.type);
  return (function() {
    var while$764 = undefined;
    while ((i < 256 && tile.entity.ground.type !== "stone")) {
      while$764 = (function() {
        ((i)++);
        tile.entity.ground.type = "stone";
        const v=getTileNoise(tile.x, tile.y);
        const direction=getCardinalDirectionName(v);
        console.log(v, direction, tile, tile.entity, tile.entity.ground, tile.entity.ground.type);
        tile = tile[direction];
        return v.despawn();
      }).call(this);
    };
    return while$764;
  }).call(this);
});
exports.generateMainRoad = generateMainRoad;
const southEastTurn=TileChunk.create(roadWeight, "grass", "stone", "grass", "grass", "stone", "stone", "grass", "grass", "grass");
const field=TileChunk.create(15.1, "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass");
const meadow=TileChunk.create(5.1, "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass");
const grassyMeadow=TileChunk.create(5, "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass");
const otherGrassyMeadow=TileChunk.create(5.1, "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass");
const loneFlower=TileChunk.create(0.1, "grass", "grass", "grass", "grass", "floweryGrass", "grass", "grass", "grass", "grass");
var nextType = 0;
var isFirstTile__QUERY = true;
var baseWeights = Interface.define("baseWeights", { 
  grass:100,
  stone:1,
  floweryGrass:100
 });
var calculateEntropy = (function calculateEntropy$(weights) {
  /* calculate-entropy eval.sibilant:402:0 */

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
var ProbabilityDistrobution = Spawnable.define("ProbabilityDistrobution", { 
  get grass(  ){ 
    
      throw (new TypeError((this.name + "expects a definition of" + "grass")))
    
   },
  get stone(  ){ 
    
      throw (new TypeError((this.name + "expects a definition of" + "stone")))
    
   },
  get floweryGrass(  ){ 
    
      throw (new TypeError((this.name + "expects a definition of" + "floweryGrass")))
    
   },
  sampleInverse(  ){ 
    
      var r = Math.random();
      var s = 0;
      var i = 0;
      for (var typeName of [ "grass", "stone", "floweryGrass" ])
      {
      s += (1 - this[typeName]);
      if( s > r ){ 
        return typeName;
       }
      }
      ;
      throw (new Error("You screwed up your math, these probabilities don't add up to 1."))
    
   },
  sample(  ){ 
    
      var r = Math.random();
      var s = 0;
      var i = 0;
      for (var typeName of [ "grass", "stone", "floweryGrass" ])
      {
      s += this[typeName];
      if( s > r ){ 
        return typeName;
       }
      }
      ;
      throw (new Error("You screwed up your math, these probabilities don't add up to 1."))
    
   },
  clear(  ){ 
    
      this.grass = 0;
      this.stone = 0;
      return this.floweryGrass = 0;
    
   }
 });
var SuperPositionDistrobution = ProbabilityDistrobution.define("SuperPositionDistrobution", { 
  init( superPosition = this.superPosition ){ 
    
      this.superPosition = superPosition;
      return this;
    
   },
  get grass(  ){ 
    
      return this.superPosition.getLikelyhoodOfState("grass");
    
   },
  get stone(  ){ 
    
      return this.superPosition.getLikelyhoodOfState("stone");
    
   },
  get floweryGrass(  ){ 
    
      return this.superPosition.getLikelyhoodOfState("floweryGrass");
    
   },
  clear(  ){ 
    
      return this.superPosition = null;
    
   }
 });
var BaseDistrobution = ProbabilityDistrobution.define("BaseDistrobution", { 
  get totalWeight(  ){ 
    
      return (function() {
        if (this._totalWeight) {
          return this._totalWeight;
        } else {
          return this._totalWeight = (function() {
            /* eval.sibilant:19:24 */
          
            return summate(this.weights);
          }).call(this);
        }
      }).call(this);
    
   },
  get weights(  ){ 
    
      return (function() {
        if (this._weights) {
          return this._weights;
        } else {
          return this._weights = (function() {
            /* eval.sibilant:19:24 */
          
            return this.states.map(((state) => {
            	
              return (state.weight * baseWeights[state.collapsedState]);
            
            }));
          }).call(this);
        }
      }).call(this);
    
   },
  get states(  ){ 
    
      return (function() {
        if (this._states) {
          return this._states;
        } else {
          return this._states = (function() {
            /* eval.sibilant:19:24 */
          
            return TileChunk.chunks.map(((chunkType) => {
            	
              return PossibleState.spawn(this, chunkType);
            
            }));
          }).call(this);
        }
      }).call(this);
    
   },
  get grass(  ){ 
    
      return (function() {
        if (this._grass) {
          return this._grass;
        } else {
          return this._grass = (function() {
            /* eval.sibilant:19:24 */
          
            return (this.states.reduce(((weight, state) => {
            	
              return (function() {
                if (state.collapsedState === "grass") {
                  return (weight + (state.weight * baseWeights[state.collapsedState]));
                } else {
                  return weight;
                }
              }).call(this);
            
            }), 0) / this.totalWeight);
          }).call(this);
        }
      }).call(this);
    
   },
  get stone(  ){ 
    
      return (function() {
        if (this._stone) {
          return this._stone;
        } else {
          return this._stone = (function() {
            /* eval.sibilant:19:24 */
          
            return (this.states.reduce(((weight, state) => {
            	
              return (function() {
                if (state.collapsedState === "stone") {
                  return (weight + (state.weight * baseWeights[state.collapsedState]));
                } else {
                  return weight;
                }
              }).call(this);
            
            }), 0) / this.totalWeight);
          }).call(this);
        }
      }).call(this);
    
   },
  get floweryGrass(  ){ 
    
      return (function() {
        if (this._floweryGrass) {
          return this._floweryGrass;
        } else {
          return this._floweryGrass = (function() {
            /* eval.sibilant:19:24 */
          
            return (this.states.reduce(((weight, state) => {
            	
              return (function() {
                if (state.collapsedState === "floweryGrass") {
                  return (weight + (state.weight * baseWeights[state.collapsedState]));
                } else {
                  return weight;
                }
              }).call(this);
            
            }), 0) / this.totalWeight);
          }).call(this);
        }
      }).call(this);
    
   },
  clear(  ){ 
    
      (function() {
        if (this._totalWeight) {
          (function() {
            if (this._totalWeight.spawn) {
              return this._totalWeight.despawn();
            } else if ((this._totalWeight[0] && this._totalWeight[0].spawn)) {
              return this._totalWeight.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._totalWeight = null;
        }
      }).call(this);
      (function() {
        if (this._weights) {
          (function() {
            if (this._weights.spawn) {
              return this._weights.despawn();
            } else if ((this._weights[0] && this._weights[0].spawn)) {
              return this._weights.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._weights = null;
        }
      }).call(this);
      (function() {
        if (this._states) {
          (function() {
            if (this._states.spawn) {
              return this._states.despawn();
            } else if ((this._states[0] && this._states[0].spawn)) {
              return this._states.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._states = null;
        }
      }).call(this);
      (function() {
        if (this._grass) {
          (function() {
            if (this._grass.spawn) {
              return this._grass.despawn();
            } else if ((this._grass[0] && this._grass[0].spawn)) {
              return this._grass.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._grass = null;
        }
      }).call(this);
      (function() {
        if (this._stone) {
          (function() {
            if (this._stone.spawn) {
              return this._stone.despawn();
            } else if ((this._stone[0] && this._stone[0].spawn)) {
              return this._stone.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._stone = null;
        }
      }).call(this);
      return (function() {
        if (this._floweryGrass) {
          (function() {
            if (this._floweryGrass.spawn) {
              return this._floweryGrass.despawn();
            } else if ((this._floweryGrass[0] && this._floweryGrass[0].spawn)) {
              return this._floweryGrass.each(((el) => {
              	
                return el.despawn();
              
              }));
            }
          }).call(this);
          return this._floweryGrass = null;
        }
      }).call(this);
    
   }
 });
var CurrentDistrobution = ProbabilityDistrobution.define("CurrentDistrobution", { 
  grassInstances:0,
  stoneInstances:0,
  floweryGrassInstances:0,
  get totalInstances(  ){ 
    
      return (this.grassInstances + this.stoneInstances + this.floweryGrassInstances);
    
   },
  get grass(  ){ 
    
      return (this.grassInstances / this.totalInstances);
    
   },
  get stone(  ){ 
    
      return (this.stoneInstances / this.totalInstances);
    
   },
  get floweryGrass(  ){ 
    
      return (this.floweryGrassInstances / this.totalInstances);
    
   }
 });
var ExpectedLikelyhoodGivenCurrentState = ProbabilityDistrobution.define("ExpectedLikelyhoodGivenCurrentState", { 
  base:BaseDistrobution,
  current:CurrentDistrobution,
  get B(  ){ 
    
      return [ this.base.grass, this.base.stone, this.base.floweryGrass ];
    
   },
  get C(  ){ 
    
      return [ (this.current.grass || this.base.grass), (this.current.stone || this.base.stone), (this.current.floweryGrass || this.base.floweryGrass) ];
    
   },
  get E(  ){ 
    
      return this.B.map(((Bn, i) => {
      	
        return (Bn / this.C[i]);
      
      }));
    
   },
  get corrected(  ){ 
    
      return this.E.map(((En, i) => {
      	
        return (En * this.B[i]);
      
      }));
    
   },
  get totalCorrected(  ){ 
    
      return summate(this.corrected);
    
   },
  get grassCorrection(  ){ 
    
      return this.corrected[0];
    
   },
  get stoneCorrection(  ){ 
    
      return this.corrected[1];
    
   },
  get floweryGrassCorrection(  ){ 
    
      return this.corrected[2];
    
   },
  get grass(  ){ 
    
      return (this.grassCorrection / this.totalCorrected);
    
   },
  get stone(  ){ 
    
      return (this.stoneCorrection / this.totalCorrected);
    
   },
  get floweryGrass(  ){ 
    
      return (this.floweryGrassCorrection / this.totalCorrected);
    
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
var collapsedTiles = 0;
TileNode.collapseWaveFunction = (function TileNode$collapseWaveFunction$(depth = 0, maxDepth = 2) {
  /* Tile-node.collapse-wave-function node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  const superPosition=SuperPosition.spawn(this);
  superPosition.collapse();
  ((collapsedTiles)++);
  (function() {
    if (CurrentDistrobution.totalInstances !== collapsedTiles) {
      throw (new Error("more tiles counted in distrobution than have collapsed"))
    }
  }).call(this);
  return superPosition.despawn();
});
TileNode.setup = (function TileNode$setup$(x = this.x, y = this.y) {
  /* Tile-node.setup node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  const v=getTileNoise(x, y);
  this.collapseWaveFunction();
  (function() {
    if (((v.x + v.y) > 16 && this.entity.ground.type === "floweryGrass")) {
      const item=ItemGroup.spawn();
      item.physics.scale = config.gameScale;
      const tileContainer=this.entity.container;
      item.pos.x = this.worldPos.x;
      item.pos.y = this.worldPos.y;
      return tileContainer.add(item.entity);
    }
  }).call(this);
  const groundStats=this.entity.ground.stats;
  const x_=(Math.abs(Math.round(v.x)) % (groundStats.spriteCoordMaxX - groundStats.spriteCoordMinX));
  const y_=(Math.abs(Math.round(v.y)) % (groundStats.spriteCoordMaxY - groundStats.spriteCoordMinY));
  const coords=[ (x_ + this.entity.ground.stats.spriteCoordMinX), (y_ + this.entity.ground.stats.spriteCoordMinY) ];
  this.entity.floorSprite.selectTile(...coords);
  return v.despawn();
});