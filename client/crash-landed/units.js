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
    noise = require("@shared/noise.js"),
    config = require("@crash-landed/config.js"),
    { 
  game
 } = require("@crash-landed/game.js");
console.log("game", game);
UnitGroup.game = game;
var ItemUnit = UnitInstance.define("ItemUnit", { 
  get data(  ){ 
    
      return this.entity.itemInterface;
    
   },
  get container(  ){ 
    
      return this.data.container;
    
   },
  consume( entity ){ 
    
      return this.data.consume(entity);
    
   }
 });
exports.ItemUnit = ItemUnit;
var ItemGroup = UnitGroup.define("ItemGroup", { 
  interface:ItemUnit,
  template:false,
  groupName:"item",
  types:[ PropsSprites, Item ]
 });
exports.ItemGroup = ItemGroup;
var PlayerUnit = UnitInstance.define("PlayerUnit", { 
  get sprite(  ){ 
    
      return this.entity.playerSprite;
    
   },
  get pathing(  ){ 
    
      return this.entityCurrentPath;
    
   },
  get mindState(  ){ 
    
      return this.entity.mindState;
    
   },
  get needs(  ){ 
    
      return this.entity.needs;
    
   },
  get los(  ){ 
    
      return this.entity.lineOfSight;
    
   },
  get velocity(  ){ 
    
      return this.entity.velocityInterface;
    
   },
  eat( item ){ 
    
      return this.needs.eat(item);
    
   }
 });
exports.PlayerUnit = PlayerUnit;
var Player = UnitGroup.define("Player", { 
  template:false,
  interface:PlayerUnit,
  groupName:"player",
  types:[ PlayerSprites, Velocity, Sight, PathFinding, Metabolisim, MentalState ]
 });
exports.Player = Player;
const player=Player.spawn();
player.pos.x = 0;
player.pos.y = 0;
exports.player = player;