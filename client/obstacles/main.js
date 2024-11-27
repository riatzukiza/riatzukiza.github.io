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
  Velocity
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
    Vector = require("@shared/vector.js"),
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
 } = require("sibilant-game-engine/client/systems/collision"),
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
  /* vector2d eval.sibilant:71:0 */

  return [ x, y ];
});
Collision.setBounds(config.dimensions[0], config.dimensions[1], 20, 50);
game.start();
global.mixin = mixin;
global.create = create;
var randomLocation = (function randomLocation$() {
  /* random-location eval.sibilant:85:0 */

  return [ ((Math.random() * (config.dimensions[0] - (-1 * config.dimensions[0]))) + (-1 * config.dimensions[0])), ((Math.random() * (config.dimensions[1] - (-1 * config.dimensions[1]))) + (-1 * config.dimensions[1])) ];
});
(function() {
  /* node_modules/kit/inc/loops.sibilant:26:8 */

  var $for = null;
  for (var i = 0;i < config.rocks;++(i))
  {
  $for = (function() {
    /* node_modules/kit/inc/loops.sibilant:28:35 */
  
    return spawnRock(randomLocation(), (10 + ((Math.random() * (10 - (-1 * 10))) + (-1 * 10))), (10 + ((Math.random() * (10 - (-1 * 10))) + (-1 * 10))));
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
  
    return spawnPlant(randomLocation(), (10 + ((Math.random() * (10 - (-1 * 10))) + (-1 * 10))));
  }).call(this);
  }
  ;
  return $for;
}).call(this);
var isCollision = false;
var isWin = false;
var isLoose = false;
var getVelocity = (function getVelocity$(entity) {
  /* get-velocity eval.sibilant:105:0 */

  return game.systems.get(Velocity, entity);
});
var applyStatic = (function applyStatic$(c) {
  /* apply-static eval.sibilant:107:0 */

  return (function() {
    if (!(config.collisionStatic === 0)) {
      return getVelocity(c.entity).accelerate([ ((Math.random() * (config.collisionStatic - (-1 * config.collisionStatic))) + (-1 * config.collisionStatic)), ((Math.random() * (config.collisionStatic - (-1 * config.collisionStatic))) + (-1 * config.collisionStatic)) ]);
    }
  }).call(this);
});
var signalFood = (function signalFood$(v) {
  /* signal-food eval.sibilant:111:0 */

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
            return spawnPlant([ (((Math.random() * (physics.mass - (-1 * physics.mass))) + (-1 * physics.mass)) + physics.position.x), (((Math.random() * (physics.mass - (-1 * physics.mass))) + (-1 * physics.mass)) + physics.position.y) ], physics.mass);
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
game.events.on("collision", (([ c, c_, d ]) => {
	
  var v = game.systems.get(Velocity, c.entity);
  var v_ = game.systems.get(Velocity, c_.entity);
  var p = game.systems.get(Physics, c.entity);
  var p_ = game.systems.get(Physics, c_.entity);
  (function() {
    if ((v && v_ && p && p_)) {
      return game.events.emit("simpleCollision", [ c_, c ]);
    }
  }).call(this);
  (function() {
    if (config.printCollisionEvent) {
      return console.log("collision event", c, c_, d, Collision.quads, { 
        home,
        homePos
       });
    }
  }).call(this);
  (function() {
    if ((c.entity === home && plants.has(c_.entity))) {
      return game.events.emit("plantCollidingWithSpawn", [ c, c_ ]);
    }
  }).call(this);
  (function() {
    if ((c_.entity === home && plants.has(c.entity))) {
      return game.events.emit("plantCollidingWithSpawn", [ c_, c ]);
    }
  }).call(this);
  (function() {
    if ((c.entity === home && rocks.has(c_.entity))) {
      return game.events.emit("plantCollidingWithSpawn", [ c, c_ ]);
    }
  }).call(this);
  (function() {
    if ((c_.entity === home && rocks.has(c.entity))) {
      return game.events.emit("plantCollidingWithSpawn", [ c_, c ]);
    }
  }).call(this);
  (function() {
    if ((ants.has(c_.entity) && plants.has(c.entity))) {
      return game.events.emit("antFoundPlant", [ c_, c ]);
    }
  }).call(this);
  (function() {
    if ((ants.has(c.entity) && plants.has(c_.entity))) {
      return game.events.emit("antFoundPlant", [ c, c_ ]);
    }
  }).call(this);
  (function() {
    if ((ants.has(c.entity) && ants.has(c_.entity))) {
      return game.events.emit("antCollision", [ c, c_ ]);
    }
  }).call(this);
  (function() {
    if (((plants.has(c.entity) && plants.has(c_.entity)) || (rocks.has(c.entity) && rocks.has(c_.entity)) || (plants.has(c.entity) && rocks.has(c_.entity)) || (rocks.has(c.entity) && plants.has(c_.entity)))) {
      return game.events.emit("staticObjectCollision", [ c, c_ ]);
    }
  }).call(this);
  var m = p.mass;
  var m_ = p_.mass;
  c_.colliding = false;
  return c.colliding = false;

})).once("error", ((err) => {
	
  console.log("error on", "collision", "of", "game.events", "given", "[ c, c_, d ]()");
  return console.log(err);

}));
game.events.on("plantCollidingWithSpawn", (([ home, plant ]) => {
	
  return applyStatic(plant);

})).once("error", ((err) => {
	
  console.log("error on", "plantCollidingWithSpawn", "of", "game.events", "given", "[ home, plant ]()");
  return console.log(err);

}));
game.events.on("staticObjectCollision", (([ o1, o2 ]) => {
	
  applyStatic(o1);
  return applyStatic(o2);

})).once("error", ((err) => {
	
  console.log("error on", "staticObjectCollision", "of", "game.events", "given", "[ o1, o2 ]()");
  return console.log(err);

}));
game.events.on("antCollision", (([ c, c_ ]) => {
	
  var v = game.systems.get(Velocity, c.entity);
  var v_ = game.systems.get(Velocity, c_.entity);
  var p = game.systems.get(Physics, c.entity);
  var p_ = game.systems.get(Physics, c_.entity);
  applyStatic(c);
  applyStatic(c_);
  updateParticle(v, v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, false, false, homePos);
  return updateParticle(v_, v_.pos, SignalField.field, SignalField.layer, game.ticker.ticks, false, false, homePos);

})).once("error", ((err) => {
	
  console.log("error on", "antCollision", "of", "game.events", "given", "[ c, c_ ]()");
  return console.log(err);

}));
game.events.on("antFoundPlant", (([ ant, plant ]) => {
	
  var av = game.systems.get(Velocity, ant.entity);
  isWin = true;
  updateParticle(av, av.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
  var pp = game.systems.get(Physics, plant.entity);
  pp.scale = pp.mass = Math.max((pp.mass - 1), 0);
  av.pos.x = homePos.x;
  av.pos.y = homePos.y;
  return null;

})).once("error", ((err) => {
	
  console.log("error on", "antFoundPlant", "of", "game.events", "given", "[ ant, plant ]()");
  return console.log(err);

}));
game.events.on("simpleCollision", (([ c, c_ ]) => {
	
  var v = game.systems.get(Velocity, c.entity);
  var v_ = game.systems.get(Velocity, c_.entity);
  var p = game.systems.get(Physics, c.entity);
  var p_ = game.systems.get(Physics, c_.entity);
  var m = p.mass;
  var m_ = p_.mass;
  v.xd = (((v.xd * (m - m_)) + (2 * m_ * v_.xd)) / (m + m_));
  v.yd = (((v.yd * (m - m_)) + (2 * m * m_)) / (m + m_));
  v_.xd = (((v_.xd * (m_ - m)) + (2 * m * v.xd)) / (m_ + m));
  v_.yd = (((v_.yd * (m_ - m)) + (2 * m * v.yd)) / (m_ + m));
  return null;

})).once("error", ((err) => {
	
  console.log("error on", "simpleCollision", "of", "game.events", "given", "[ c, c_ ]()");
  return console.log(err);

}));
nextSpawn();