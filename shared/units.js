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
  Interface
 } = require("@kit-js/interface");
var { 
  Spawnable
 } = require("@shared/data-structures/spawnable.js"),
    { 
  EntityGroup
 } = require("@shared/ecs.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Physics
 } = require("@shared/systems/physics.js");
var UnitInstance = Spawnable.define("UnitInstance", { 
  init( entity = this.entity,group = this.group ){ 
    
      this.entity = entity;this.group = group;
      return this;
    
   },
  get game(  ){ 
    
      return this.group.game;
    
   },
  get pos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  get physics(  ){ 
    
      return this.entity.physicalProperties;
    
   },
  get scale(  ){ 
    
      return this.physics.scale;
    
   },
  get mass(  ){ 
    
      return this.physics.mass;
    
   },
  register(  ){ 
    
   },
  clear(  ){ 
    
      this.unit = null;
      return this.group = null;
    
   }
 });
exports.UnitInstance = UnitInstance;
var UnitGroup = Interface.define("UnitGroup", { 
  docString:"Shared.Units.Unit-group",
  baseComponents:[ Position, Physics ],
  interface:UnitInstance,
  template:true,
  init( groupName = this.groupName,types = this.types,game = this.game,components = [ types, this.baseComponents ].flat(),group = create(EntityGroup)((groupName + "Unit"), components, game.ent) ){ 
    
      this.groupName = groupName;this.types = types;this.game = game;this.components = components;this.group = group;
      console.log("hi there", game.ent, this.group, game);
      return this;
    
   },
  build(  ){ 
    
      console.log("I build", this);
      return (function() {
        if (!(this.template)) {
          this.init();
          return console.log("and I built");
        }
      }).call(this);
    
   },
  spawn( args ){ 
    
      const entity=this.group.spawn();
      const unit=this.interface.spawn(entity, this);
      entity.unit = unit;
      for (var c of entity.components)
      {
      c.unit = unit;
      }
      ;
      unit.register(args);
      return unit;
    
   },
  despawn( unit ){ 
    
      for (var c of unit.entity.components)
      {
      c.unit = null;
      }
      ;
      this.group.despawn(unit.entity);
      return unit.despawn();
    
   }
 });
exports.UnitGroup = UnitGroup;