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
  Vector
 } = require("@shared/vectors.js"),
    { 
  Trie
 } = require("@shared/data-structures/trees/trie.js"),
    { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js"),
    noise = require("@shared/noise.js");
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
    
      return data.reduce(((acc, val) => {
      	
        return f(acc, data[dir[1]], dir[0], i);
      
      }), initialValue);
    
   },
  every( f = this.f,data = this.data,directions = this.directions ){ 
    
      return directions.every(((dir, i) => {
      	
        return f(data[dir[1]], dir[0], i);
      
      }));
    
   }
 });
const roadWeight=1;
const turnWeight=0.1;
const adjacentStoneWeight=-10;
const paralellHorizontalRoads=TileChunk.create(adjacentStoneWeight, "stone", "stone", "stone", "grass", "grass", "grass", "stone", "stone", "stone");
const paralellVerticalRoads=TileChunk.create(adjacentStoneWeight, "stone", "grass", "stone", "stone", "grass", "stone", "stone", "grass", "stone");
const fullStone=TileChunk.create(adjacentStoneWeight, "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone");
const horizontalRoad=TileChunk.create(roadWeight, "grass", "grass", "grass", "stone", "stone", "stone", "grass", "grass", "grass");
const grassBelowRoad=TileChunk.create(roadWeight, "stone", "stone", "stone", "grass", "grass", "grass", "grass", "grass", "grass");
const grassAboveRoad=TileChunk.create(roadWeight, "grass", "grass", "grass", "grass", "grass", "grass", "stone", "stone", "stone");
const flowersBelowRoad=create(TileChunk)([ "stone", "stone", "stone", "grass", "grass", "grass", "floweryGrass", "floweryGrass", "floweryGrass" ]);
flowersBelowRoad.weight = roadWeight;
const flowersAboveRoad=create(TileChunk)([ "floweryGrass", "floweryGrass", "floweryGrass", "grass", "grass", "grass", "stone", "stone", "stone" ]);
flowersAboveRoad.weight = roadWeight;
const verticalRoad=create(TileChunk)([ "grass", "stone", "grass", "grass", "stone", "grass", "grass", "stone", "grass" ]);
verticalRoad.weight = roadWeight;
const grassOnRightOfRoad=create(TileChunk)([ "stone", "grass", "grass", "stone", "grass", "grass", "stone", "grass", "grass" ]);
grassOnRightOfRoad.weight = roadWeight;
const grassOnLeftOfRoad=create(TileChunk)([ "grass", "grass", "stone", "grass", "grass", "stone", "grass", "grass", "stone" ]);
grassOnLeftOfRoad.weight = roadWeight;
const flowersOnRightOfRoad=create(TileChunk)([ "stone", "grass", "floweryGrass", "stone", "grass", "floweryGrass", "stone", "grass", "floweryGrass" ]);
flowersOnRightOfRoad.weight = roadWeight;
const flowersOnLeftOfRoad=create(TileChunk)([ "floweryGrass", "grass", "stone", "floweryGrass", "grass", "stone", "floweryGrass", "grass", "stone" ]);
flowersOnLeftOfRoad.weight = roadWeight;
const leftDiagonalRoad=TileChunk.create("stone", "grass", "grass", "grass", "stone", "grass", "grass", "grass", "stone", roadWeight);
const rightDiagonalRoad=TileChunk.create("grass", "grass", "stone", "grass", "stone", "grass", "stone", "grass", "grass", roadWeight);
const crossRoads=create(TileChunk)([ "grass", "stone", "grass", "stone", "stone", "stone", "grass", "stone", "grass" ]);
crossRoads.weight = 0.1;
const northEastTurn=create(TileChunk)([ "grass", "grass", "grass", "grass", "stone", "stone", "grass", "stone", "grass" ]);
northEastTurn.weight = turnWeight;
const wideNorthEastTurn=create(TileChunk)([ "stone", "stone", "stone", "stone", "grass", "grass", "stone", "grass", "grass" ]);
wideNorthEastTurn.weight = turnWeight;
const northWestTurn=create(TileChunk)([ "grass", "grass", "grass", "stone", "stone", "grass", "grass", "stone", "grass" ]);
northWestTurn.weight = turnWeight;
const wideNorthWestTurn=create(TileChunk)([ "stone", "stone", "stone", "grass", "grass", "stone", "grass", "grass", "stone" ]);
wideNorthWestTurn.weight = turnWeight;
create(TileChunk)([ "grass", "grass", "grass", "stone", "stone", "grass", "stone", "stone", "grass" ]);
const southWestTurn=create(TileChunk)([ "grass", "stone", "grass", "stone", "stone", "grass", "grass", "grass", "grass" ]);
southWestTurn.weight = turnWeight;
const wideSouthWestTurn=create(TileChunk)([ "grass", "grass", "stone", "grass", "grass", "stone", "stone", "stone", "stone" ]);
wideSouthWestTurn.weight = turnWeight;
const loneStoneWeight=-1;
TileChunk.create(loneStoneWeight, "grass", "grass", "grass", "grass", "stone", "grass", "grass", "grass", "grass");
TileChunk.create(loneStoneWeight, "grass", "stone", "grass", "grass", "grass", "grass", "grass", "grass", "grass");
TileChunk.create(loneStoneWeight, "stone", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass");
TileChunk.create(loneStoneWeight, "grass", "grass", "grass", "stone", "grass", "grass", "grass", "grass", "grass");
TileChunk.create(loneStoneWeight, "grass", "grass", "grass", "grass", "grass", "grass", "stone", "grass", "grass");
TileChunk.create(loneStoneWeight, "grass", "grass", "grass", "grass", "grass", "grass", "grass", "stone", "grass");
TileChunk.create(loneStoneWeight, "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grasss", "stone");
TileChunk.create(loneStoneWeight, "grass", "grass", "grass", "grass", "grass", "stone", "grass", "grasss", "grass");
TileChunk.create(loneStoneWeight, "grass", "grass", "stone", "grass", "grass", "grass", "grass", "grasss", "grass");
const roadEndStoneWeight=-1;
TileChunk.create(roadEndStoneWeight, "grass", "stone", "grass", "grass", "stone", "grass", "grass", "grass", "grass");
TileChunk.create(roadEndStoneWeight, "grass", "grass", "grass", "grass", "stone", "grass", "grass", "stone", "grass");
TileChunk.create(roadEndStoneWeight, "grass", "grass", "grass", "stone", "stone", "grass", "grass", "grass", "grass");
TileChunk.create(roadEndStoneWeight, "grass", "grass", "grass", "grass", "stone", "stone", "grass", "grass", "grass");
var generateMainRoad = (function generateMainRoad$() {
  /* generate-main-road eval.sibilant:314:0 */

  var tile = tiles.get(0, 0);
  var i = 0;
  console.log(tile.entity.ground.type);
  return (function() {
    var while$230 = undefined;
    while ((i < 256 && tile.entity.ground.type !== "stone")) {
      while$230 = (function() {
        ((i)++);
        tile.entity.ground.type = "stone";
        const v=getTileNoise(tile.x, tile.y);
        const direction=getCardinalDirectionName(v);
        v.despawn();
        tile = tile[direction];
        return console.log(v, direction, tile, tile.entity.ground.type);
      }).call(this);
    };
    return while$230;
  }).call(this);
});
const southEastTurn=TileChunk.create("grass", "stone", "grass", "grass", "stone", "stone", "grass", "grass", "grass");
southEastTurn.weight = turnWeight;
const field=TileChunk.create(1.1, "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass");
field.weight = 1.1;
const meadow=TileChunk.create(1.1, "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass", "floweryGrass");
const grassyMeadow=TileChunk.create("grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass");
const otherGrassyMeadow=TileChunk.create(1.1, "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass", "grass", "floweryGrass");
const loneFlower=TileChunk.create(2.1, "grass", "grass", "grass", "grass", "floweryGrass", "grass", "grass", "grass", "grass");
var nextType = 0;
var isFirstTile__QUERY = true;
var baseWeights = Interface.define("baseWeights", { 
  grass:10,
  stone:1,
  floweryGrass:3
 });
var entropy = (function entropy$(weights) {
  /* entropy eval.sibilant:376:0 */

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
  get likelyHood(  ){ 
    
      return (function() {
        if (this._likelyHood) {
          return this._likelyHood;
        } else {
          return this._likelyHood = (function() {
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
  calculateWeight(  ){ 
    
      return this.configuration.reduce(((weight, tileType, direction) => {
      	
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
            	
              return state.weight;
            
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
                  return (weight + state.weight);
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
                  return (weight + state.weight);
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
                  return (weight + state.weight);
                } else {
                  return weight;
                }
              }).call(this);
            
            }), 0) / this.totalWeight);
          }).call(this);
        }
      }).call(this);
    
   }
 });
var CurrentDistrobution = ProbabilityDistrobution.define("CurrentDistrobution", { 
  grassInstances:0,
  stoneInstances:0,
  floweryGrassInstances:0,
  get baseGrass(  ){ 
    
      return (function() {
        if (this._baseGrass) {
          return this._baseGrass;
        } else {
          return this._baseGrass = (function() {
            /* eval.sibilant:19:24 */
          
            return BaseDistrobution.grass;
          }).call(this);
        }
      }).call(this);
    
   },
  get baseStone(  ){ 
    
      return (function() {
        if (this._baseStone) {
          return this._baseStone;
        } else {
          return this._baseStone = (function() {
            /* eval.sibilant:19:24 */
          
            return BaseDistrobution.stone;
          }).call(this);
        }
      }).call(this);
    
   },
  get baseFloweryGrass(  ){ 
    
      return (function() {
        if (this._baseFloweryGrass) {
          return this._baseFloweryGrass;
        } else {
          return this._baseFloweryGrass = (function() {
            /* eval.sibilant:19:24 */
          
            return BaseDistrobution.floweryGrass;
          }).call(this);
        }
      }).call(this);
    
   },
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
  burrent:CurrentDistrobution,
  get B(  ){ 
    
      return [ this.base.grass, this.base.stone, this.base.floweryGrass ];
    
   },
  get C(  ){ 
    
      return [ this.base.grass, this.base.stone, this.base.floweryGrass ];
    
   },
  get E(  ){ 
    
      return this.B.map(((Bn, i) => {
      	
        return (Bn / this.C[i]);
      
      }));
    
   },
  get totalE(  ){ 
    
      return summate(this.E);
    
   },
  get grassE(  ){ 
    
      return this.E[0];
    
   },
  get stoneE(  ){ 
    
      return this.E[1];
    
   },
  get floweryGrassE(  ){ 
    
      return this.E[2];
    
   },
  get grass(  ){ 
    
      return (this.grassE / this.totalE);
    
   },
  get stone(  ){ 
    
      return (this.stoneE / this.totalE);
    
   },
  get floweryGrass(  ){ 
    
      return (this.floweryGrassE / this.totalE);
    
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
    
      return calculateEntropy(this.weights);
    
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
          
            return this.tile.edges.map(((neighbor) => {
            	
              return SuperPosition.spawn(cell);
            
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
      	
        
      
      }), superPosition.state);
    
   },
  get uncollapsedNeighbors(  ){ 
    
      return sort(this.neighbors.filter(((superPosition) => {
      	
        
      
      }), !(superPosition.state)), a(b), (b.entropy - a.entropy));
    
   },
  clear(  ){ 
    
      (function() {
        if (this._probabilityDistrobution) {
          return (function() {
            if (this._probabilityDistrobution.spawn) {
              return this._probabilityDistrobution.despawn();
            } else {
              return this._probabilityDistrobution = null;
            }
          }).call(this);
        }
      }).call(this);
      this.possibleStates.each(((state) => {
      	
        return state.despawn();
      
      }));
      this.cell = null;
      return this.possibleStates = null;
    
   },
  getLikelyHoodOfState( tileType ){ 
    
      return (this.totalWeight / this.possibleStates.reduce(((typeWeight, state) => {
      	
        return (function() {
          if (state.collapsedState === tileType) {
            return (typeWeight + state.weight);
          }
        }).call(this);
      
      }), 0));
    
   },
  collapse( depth = 0,maxDepth = 2,cell = this.cell ){ 
    
      if( this.state ){ 
        return ;
       };
      return this.state = (function() {
        if (this.validStates.length === 1) {
          return this.validStates[0].collapsedState;
        } else if ((depth >= maxDepth || this.validStates.length === 0)) {
          return ExpectedLikelyhoodGivenCurrentState.sample();
        } else {
          const temp=[];
          var newState = null;
          for (var neighbor of this.uncollapsedNeighbors)
          {
          temp.push(neighbor);
          neighbor.collapse((depth + 1), maxDepth);
          if( this.validStates.length === 1 ){ 
            newState = this.validStates[0];;
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
    
   },
  calculateEntropy(  ){ 
    
      return this.totalWeight = this.validStates.reduce(((weight, state) => {
      	
        return (weight + state.calculateWeight());
      
      }), 0);
    
   },
  getValidStates(  ){ 
    
      return this.possibleStates.filter(((state) => {
      	
        
      
      }), state.isValid__QUERY(this.cell));
    
   },
  eliminateInvalidStates(  ){ 
    
      return (function() {
        if (!(this.validated__QUERY)) {
          this.possibleStates = this.getValidStates();
          return this.validated__QUERY = true;
        }
      }).call(this);
    
   }
 });
TileNode.collapseWaveFunction = (function TileNode$collapseWaveFunction$(depth = 0, maxDepth = 2) {
  /* Tile-node.collapse-wave-function node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  const superPosition=SuperPosition.spawn(this);
  superPosition.collapse();
  return superPosition.despawn();
});
TileNode.setup = (function TileNode$setup$(x = this.x, y = this.y) {
  /* Tile-node.setup node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  const v=getTileNoise(x, y);
  (function() {
    if (isFirstTile__QUERY) {
      isFirstTile__QUERY = false;
      return crossRoads.each(((tileType, direction) => {
      	
        console.log("initializing first chunk", tileType, direction);
        return (function() {
          if (direction === "center") {
            return this.entity.ground.type = tileType;
          } else {
            return this[direction].entity.ground.type = tileType;
          }
        }).call(this);
      
      }));
    } else if (!(this.entity.ground.type)) {
      return this.collapseWaveFunction();
    }
  }).call(this);
  (function() {
    if (((v.x + v.y) > 16 && this.entity.ground.type === "floweryGrass")) {
      const item=ItemGroup.spawn();
      item.physics.scale = gameScale;
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