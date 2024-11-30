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
var { 
  List
 } = require("sibilant-game-engine/client/data-structures/list");
List.rotateUntil = (function List$rotateUntil$(predicate = this.predicate, t = 0) {
  /* List.rotate-until node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (function() {
    if (predicate(this.head.item)) {
      return this.head.item;
    } else if (t > (this.size - 1)) {
      return this.rotate().rotateUntil(predicate, ++(t));
    } else {
      return false;
    }
  }).call(this);
});
global.mixin = mixin;
global.create = create;
var { 
  EventEmitter,
  emit,
  bubble
 } = require("kit-events");
var renderChildren = R.curry(((_parent, c, i, a) => {
	
  return (function() {
    if (typeof c === "undefined") {
      return null;
    } else if (c.render) {
      return c.render(_parent);
    } else if ((c && "object" === typeof c && "Array" === c.constructor.name)) {
      return c.each(renderChildren(_parent));
    } else if (typeof c === "string") {
      return _parent._node.appendChild(document.createTextNode(c));
    } else if (typeof c === "number") {
      return _parent._node.appendChild(document.createTextNode(("" + c)));
    } else if (typeof c === "function") {
      return renderChildren(_parent, c(_parent), i, a);
    } else if ((c instanceof Element)) {
      return (function(node) {
        /* node_modules/kit/inc/scope.sibilant:12:9 */
      
        a[i] = node;
        return renderChildren(_parent, node, i, a);
      })(DocumentNode.wrap(c, _parent._node));
    } else {
      return _parent._node.appendChild(c);
    }
  }).call(this);

}));
var DocumentNode = EventEmitter.define("DocumentNode", { 
  init( tagName = this.tagName,attributes = this.attributes,_children = [],_parent = this._parent,_node = document.createElement(tagName) ){ 
    
      this.tagName = tagName;this.attributes = attributes;this._children = _children;this._parent = _parent;this._node = _node;
      EventEmitter.init.call(this);
      return this;
    
   },
  get children(  ){ 
    
      return this._children;
    
   },
  get style(  ){ 
    
      return this._node.style;
    
   },
  clear( _node = this._node ){ 
    
      _node.innerHTML = "";
      return this;
    
   },
  render( _parent = this._parent,attributes = this.attributes,tagName = this.tagName,_node = this._node,children = this.children ){ 
    
      _node.innerHTML = "";
      this._parent = _parent;
      _parent._node.appendChild(_node);
      attributes.each(((a, k) => {
      	
        return _node[k] = a;
      
      }));
      children.each(renderChildren(this));
      this.emit("render");
      return this;
    
   },
  wrap( _node,_parent ){ 
    
      "create a Document-node from a native DOM Element";
      return create(DocumentNode)(_node.tagName, {  }, [], _parent, _node);
    
   },
  append( node = this.node,children = this.children ){ 
    
      "add a child to the bottom of this one";
      children.push(node);
      return this;
    
   },
  prepend( node = this.node,children = this.children ){ 
    
      "add a child to the top of this one";
      return this.children = [ node, children ];
    
   },
  remove( _node = this._node,_parent = this._parent ){ 
    
      "remove this element from the tree.";
      _node.remove();
      _parent.children.filter(((c) => {
      	
        return !(_node === c);
      
      }));
      _parent.emit("remove", _node);
      return this;
    
   }
 });
var DocumentRoot = DocumentNode.define("DocumentRoot", { 
  get _parent(  ){ 
    
      return this;
    
   },
  tagName:"html",
  _node:document.documentElement,
  _children:[]
 });
var DocumentBody = DocumentNode.define("DocumentBody", { 
  get _parent(  ){ 
    
      return this;
    
   },
  tagName:"body",
  _node:document.body,
  _children:[]
 });
var DocumentHead = DocumentNode.define("DocumentHead", { 
  get _parent(  ){ 
    
      return this;
    
   },
  tagName:"head",
  _node:document.head,
  _children:[]
 });
var createDocumentNode = create(DocumentNode);
console.log(document.appendChild);
var { 
  TreeMap
 } = require("tree-kit");
var { 
  Game
 } = require("sibilant-game-engine/client/game"),
    { 
  Rendering
 } = require("sibilant-game-engine/client/systems/rendering/rendering"),
    { 
  Dot
 } = require("sibilant-game-engine/client/systems/rendering/dot"),
    { 
  Position
 } = require("sibilant-game-engine/client/systems/position"),
    { 
  Velocity,
  VelocityInterface
 } = require("sibilant-game-engine/client/systems/velocity"),
    { 
  Physics
 } = require("sibilant-game-engine/client/systems/physics"),
    { 
  Scalar
 } = require("sibilant-game-engine/client/math/scalar"),
    { 
  Component,
  System
 } = require("./ecs"),
    noise = require("@shared/noise.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    { 
  createVectorField,
  createParticleUpdater
 } = require("@shared/field.js"),
    { 
  nextSpawn,
  spawnAnt,
  ants,
  home,
  homePos,
  nextSpawn,
  plants,
  rocks,
  spawnPlant,
  spawnRock
 } = require("./entities"),
    { 
  Collision
 } = require("./collision"),
    { 
  SignalField
 } = require("./forces/signal-field"),
    { 
  TreeMap
 } = require("tree-kit"),
    { 
  Friction
 } = require("./forces/friction"),
    config = require("./config"),
    settings = require("./settings");
var VelocityInterface = (function VelocityInterface$(v1, v2) {
  /* Velocity-interface eval.sibilant:58:0 */

  this.xd += v1;
  this.yd += v2;
  return this;
});
var { 
  game,
  activeGameSystems
 } = require("./game");
const updateParticle=createParticleUpdater(config, game);
List.rotateUntil = (function List$rotateUntil$(predicate = this.predicate, t = 0) {
  /* List.rotate-until node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (function() {
    if (predicate(this.head.item)) {
      return this.head.item;
    } else if (t > (this.size - 1)) {
      return this.rotate().rotateUntil(predicate, ++(t));
    } else {
      return false;
    }
  }).call(this);
});
var vector2d = (function vector2d$(x, y) {
  /* vector2d eval.sibilant:76:0 */

  return [ x, y ];
});
Collision.setBounds(config.dimensions[0], config.dimensions[1], 20, 50);
game.start();
global.mixin = mixin;
global.create = create;
var randomLocation = (function randomLocation$() {
  /* random-location eval.sibilant:92:0 */

  return [ ((Math.random() * config.dimensions[0]) * (function() {
    if (Math.random() <= 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this)), ((Math.random() * config.dimensions[1]) * (function() {
    if (Math.random() <= 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this)) ];
});
(function() {
  /* node_modules/kit/inc/loops.sibilant:26:8 */

  var $for = null;
  for (var i = 0;i < config.rocks;++(i))
  {
  $for = (function() {
    /* node_modules/kit/inc/loops.sibilant:28:35 */
  
    return spawnRock(randomLocation(), ((Math.random() * 20) * (function() {
      if (Math.random() <= 0.5) {
        return -1;
      } else {
        return 1;
      }
    }).call(this)), (10 + ((Math.random() * 20) * (function() {
      if (Math.random() <= 0.5) {
        return -1;
      } else {
        return 1;
      }
    }).call(this))));
  }).call(this);
  }
  ;
  return $for;
}).call(this);
(function() {
  /* node_modules/kit/inc/loops.sibilant:26:8 */

  var $for = null;
  for (var i = 0;i < config.startingPlants;++(i))
  {
  $for = (function() {
    /* node_modules/kit/inc/loops.sibilant:28:35 */
  
    return spawnPlant(randomLocation(), (10 + ((Math.random() * 10) * (function() {
      if (Math.random() <= 0.5) {
        return -1;
      } else {
        return 1;
      }
    }).call(this))));
  }).call(this);
  }
  ;
  return $for;
}).call(this);
var isCollision = false;
var isWin = false;
var isLoose = false;
var getVelocity = (function getVelocity$(entity) {
  /* get-velocity eval.sibilant:110:0 */

  return game.systems.get(Velocity, entity);
});
var applyStatic = (function applyStatic$(c) {
  /* apply-static eval.sibilant:113:0 */

  return (function() {
    if (!(config.collisionStatic === 0)) {
      return getVelocity(c.entity).accelerate([ ((Math.random() * config.collisionStatic) * (function() {
        if (Math.random() <= 0.5) {
          return -1;
        } else {
          return 1;
        }
      }).call(this)), ((Math.random() * config.collisionStatic) * (function() {
        if (Math.random() <= 0.5) {
          return -1;
        } else {
          return 1;
        }
      }).call(this)) ]);
    }
  }).call(this);
});
var signalFood = (function signalFood$(v) {
  /* signal-food eval.sibilant:118:0 */

  updateParticle(c_v, c_v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
  c_v.pos.x = homePos.x;
  c_v.pos.y = homePos.y;
  return null;
});
game.events.on("tick", (() => {
	
  ants.group.each(((ant) => {
  	
    var v = game.systems.get(Velocity, ant);
    updateParticle(v, v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, false, homePos);
    return null;
  
  }));
  return plants.group.each(((plant) => {
  	
    var physics = game.systems.get(Physics, plant);
    (function() {
      if (0 >= physics.mass) {
        return plants.despawn(plant);
      } else {
        physics.mass = (physics.mass + config.growthRate);
        physics.scale = (physics.scale + config.growthRate);
        return (function() {
          if (physics.mass > config.plantMassLimit) {
            physics.mass = (physics.mass / 2);
            physics.scale = (physics.mass / 2);
            return spawnPlant([ (((Math.random() * physics.mass) * (function() {
              if (Math.random() <= 0.5) {
                return -1;
              } else {
                return 1;
              }
            }).call(this)) + physics.position.x), (((Math.random() * physics.mass) * (function() {
              if (Math.random() <= 0.5) {
                return -1;
              } else {
                return 1;
              }
            }).call(this)) + physics.position.y) ], physics.mass);
          }
        }).call(this);
      }
    }).call(this);
    return null;
  
  }));

})).once("error", ((err) => {
	
  console.log("error on", "tick", "of", "game.events", "given", "null");
  return console.log(err);

}));
game.events.on("loose", (() => {
	
  return isLoose = true;

})).once("error", ((err) => {
	
  console.log("error on", "loose", "of", "game.events", "given", "null");
  return console.log(err);

}));
game.events.on("collision", ((c, c_) => {
	
  var v = game.systems.get(Velocity, c.entity);
  var v_ = game.systems.get(Velocity, c_.entity);
  var p = game.systems.get(Physics, c.entity);
  var p_ = game.systems.get(Physics, c_.entity);
  if( (ants.has(c_.entity) && plants.has(c.entity)) ){ 
    game.events.emit("antFoundPlant", c_, c)
   };
  if( (ants.has(c.entity) && plants.has(c_.entity)) ){ 
    game.events.emit("antFoundPlant", c, c_)
   };
  if( (ants.has(c.entity) && ants.has(c_.entity)) ){ 
    game.events.emit("antCollision", c, c_)
   };
  if( (c.entity === home && plants.has(c_.entity)) ){ 
    game.events.emit("plantCollidingWithSpawn", c, c_)
   };
  if( (c_.entity === home && plants.has(c.entity)) ){ 
    game.events.emit("plantCollidingWithSpawn", c_, c)
   };
  if( (c.entity === home && rocks.has(c_.entity)) ){ 
    game.events.emit("plantCollidingWithSpawn", c, c_)
   };
  if( (c_.entity === home && rocks.has(c.entity)) ){ 
    game.events.emit("plantCollidingWithSpawn", c_, c)
   };
  if( ((plants.has(c.entity) && plants.has(c_.entity)) || (rocks.has(c.entity) && rocks.has(c_.entity)) || (plants.has(c.entity) && rocks.has(c_.entity)) || (rocks.has(c.entity) && plants.has(c_.entity))) ){ 
    game.events.emit("staticObjectCollision", c, c_)
   };
  if( (v && v_ && p && p_) ){ 
    game.events.emit("simpleCollision", c_, c)
   };
  var m = p.mass;
  var m_ = p_.mass;
  c_.colliding = false;
  return c.colliding = false;

})).once("error", ((err) => {
	
  console.log("error on", "collision", "of", "game.events", "given", "c(c_)");
  return console.log(err);

}));
game.events.on("plantCollidingWithSpawn", ((home, plant) => {
	
  return applyStatic(plant);

})).once("error", ((err) => {
	
  console.log("error on", "plantCollidingWithSpawn", "of", "game.events", "given", "home(plant)");
  return console.log(err);

}));
game.events.on("staticObjectCollision", ((o1, o2) => {
	
  var v = game.systems.get(Velocity, o1.entity);
  var v_ = game.systems.get(Velocity, o2.entity);
  const pos=v.pos;
  const pos_=v_.pos;
  var xd = ((Math.random() * (1 * config.collisionStatic)) * (function() {
    if (Math.random() <= 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  var yd = ((Math.random() * (1 * config.collisionStatic)) * (function() {
    if (Math.random() <= 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  pos.x = (1 * (pos.x + xd));
  pos.y = (1 * (pos.y + yd));
  pos_.x = (1 * (pos_.x - xd));
  pos_.y = (1 * (pos_.y - yd));
  v.accelerate([ xd, yd ]);
  return v_.accelerate([ (xd * -1), (yd * -1) ]);

})).once("error", ((err) => {
	
  console.log("error on", "staticObjectCollision", "of", "game.events", "given", "o1(o2)");
  return console.log(err);

}));
game.events.on("antCollision", ((c, c_) => {
	
  var v = game.systems.get(Velocity, c.entity);
  var v_ = game.systems.get(Velocity, c_.entity);
  var p = game.systems.get(Physics, c.entity);
  var p_ = game.systems.get(Physics, c_.entity);
  var xd = ((Math.random() * (1 * config.collisionStatic)) * (function() {
    if (Math.random() <= 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  var yd = ((Math.random() * (1 * config.collisionStatic)) * (function() {
    if (Math.random() <= 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  const pos=v.pos;
  const pos_=v_.pos;
  pos.x = (1 * (pos.x + xd));
  pos.y = (1 * (pos.y + yd));
  pos_.x = (1 * (pos_.x - xd));
  pos_.y = (1 * (pos_.y - yd));
  v.accelerate([ xd, yd ]);
  return v_.accelerate([ (xd * -1), (yd * -1) ]);

})).once("error", ((err) => {
	
  console.log("error on", "antCollision", "of", "game.events", "given", "c(c_)");
  return console.log(err);

}));
game.events.on("antFoundPlant", ((ant, plant) => {
	
  var av = game.systems.get(Velocity, ant.entity);
  var ap = game.systems.get(Physics, ant.entity);
  isWin = true;
  updateParticle(av, av.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
  var pp = game.systems.get(Physics, plant.entity);
  pp.scale = pp.mass = Math.max((pp.mass - 0.1), 0);
  av.pos.x = homePos.x;
  av.pos.y = homePos.y;
  return null;

})).once("error", ((err) => {
	
  console.log("error on", "antFoundPlant", "of", "game.events", "given", "ant(plant)");
  return console.log(err);

}));
game.events.on("simpleCollision", ((c, c_) => {
	
  var v = game.systems.get(Velocity, c.entity);
  var v_ = game.systems.get(Velocity, c_.entity);
  var p = game.systems.get(Physics, c.entity);
  var p_ = game.systems.get(Physics, c_.entity);
  var m = p.mass;
  var m_ = p_.mass;
  var xd = ((Math.random() * (1 * config.collisionStatic)) * (function() {
    if (Math.random() <= 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  var yd = ((Math.random() * (1 * config.collisionStatic)) * (function() {
    if (Math.random() <= 0.5) {
      return -1;
    } else {
      return 1;
    }
  }).call(this));
  const vector1=Vector.spawn(v.xd, v.yd);
  const vector2=Vector.spawn(v_.xd, v_.yd);
  const theta=Math.atan2((vector1.y - vector2.y), (vector1.x - vector2.x));
  const v1=vector1.rotateTo((theta));
  const v2=vector2.rotateTo((theta));
  const u1=Vector.spawn((((v1.x * (m - m_)) / (m + m_)) + (v2.x * 2 * (m / (m + m_)))), v1.y).rotateTo(theta);
  const u2=Vector.spawn((((v2.x * (m_ - m)) / (m_ + m)) + (v1.x * 2 * (m_ / (m_ + m)))), v2.y).rotateTo(theta);
  v.xd = u1.x;
  v.yd = u1.y;
  v_.xd = u2.x;
  v_.yd = u2.y;
  v1.despawn();
  v2.despawn();
  u1.despawn();
  u2.despawn();
  return null;

})).once("error", ((err) => {
	
  console.log("error on", "simpleCollision", "of", "game.events", "given", "c(c_)");
  return console.log(err);

}));
nextSpawn();