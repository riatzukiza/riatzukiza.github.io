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
  rendering
 } = require("@obstacles/rendering.js"),
    { 
  ants,
  rocks,
  plants
 } = require("@obstacles/entities.js"),
    { 
  game
 } = require("@obstacles/game.js"),
    { 
  vectorPool,
  trailPool
 } = require("@shared/vectors.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  RockPanel
 } = require("@obstacles/dom/rocks.js"),
    config = require("@obstacles/config.js");
var displayDecimal = (function displayDecimal$(d = this.d, n = 6) {
  /* display-decimal node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (Math.round((Math.pow(10, n) * d)) / Math.pow(10, n));
});
console.log("We got this from dom", { 
  game
 });
console.log("tick");
const gameView=createDocumentNode("div", {
  'id': "game-view",
  'className': "panel"
}, [ rendering.context.canvas ]);
const debugView=createDocumentNode("div", {
  'id': "debug-view",
  'className': "panel",
  'style': { 
    height:(config.dimensions[1] + "px"),
    width:(Math.round(((window.innerWidth * 0.2) - 24)) + "px"),
    "overflow-y":"scroll"
   }
}, []);
DocumentNode.render = (function DocumentNode$render$(_parent = this._parent, attributes = this.attributes, tagName = this.tagName, _node = this._node, children = this.children) {
  /* Document-node.render node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  _node.innerHTML = "";
  this._parent = _parent;
  _parent._node.appendChild(_node);
  attributes.each(((a, k) => {
  	
    return (function() {
      if (k === "style") {
        return a.each(((a_, k_) => {
        	
          return this.style[k_] = a_;
        
        }));
      } else {
        return _node[k] = a;
      }
    }).call(this);
  
  }));
  children.each(renderChildren(this));
  this.emit("render");
  return this;
});
var container = createDocumentNode("div", { 'id': "container" }, [ gameView, debugView ]);
createDocumentNode("div", { 'id': "frame" }, [ container ]).render(DocumentRoot);
var startInterface = (function startInterface$() {
  /* start-interface eval.sibilant:61:0 */

  return game.events.on("tick", ((t) => {
  	
    return (function() {
      if ((t % 300) === 0) {
        var antMass = 0;
        var antWins = 0;
        var antLosses = 0;
        ants.group.each(((ant) => {
        	
          return antMass += game.systems.get(Physics, ant).mass;
        
        }));
        ants.group.each(((ant) => {
        	
          return antWins += (game.systems.get(Physics, ant).velocity.winCount || 0);
        
        }));
        ants.group.each(((ant) => {
        	
          return antLosses += (game.systems.get(Physics, ant).velocity.looseCount || 0);
        
        }));
        const antMassRaw=antMass.toPrecision(12).split(".");
        const rockViews=[];
        rocks.group.each(((rock) => {
        	
          const phys=game.systems.get(Physics, rock);
          const dot=game.systems.get(Dot, rock);
          const pos=phys.position;
          return rockViews.push(RockPanel.spawn(rock));
        
        }));
        debugView.clear();
        return createDocumentNode("div", {  }, [ createDocumentNode("div", { 'className': "panel " }, [ createDocumentNode("h3", {  }, [ "Ants" ]), createDocumentNode("div", {  }, [ "count:", ants.size ]), createDocumentNode("div", {  }, [ "total mass:", createDocumentNode("toFixed", {  }, [ (Math.round((1000 * antMass)) / 1000), 4 ]) ]), createDocumentNode("div", {  }, [ "total wins:", antWins ]), createDocumentNode("div", {  }, [ "total losses:", antLosses ]), createDocumentNode("div", {  }, [ "win/loss:", displayDecimal((antWins / antLosses)) ]) ]), createDocumentNode("div", { 'className': "panel" }, [ createDocumentNode("h3", {  }, [ "Rocks" ]), rockViews ]), createDocumentNode("div", { 'className': "panel" }, [ createDocumentNode("h3", {  }, [ "Pools" ]), createDocumentNode("div", {  }, [ "vector buckets", vectorPool.buckets.length ]), createDocumentNode("div", {  }, [ "trail buckets", trailPool.buckets.length ]) ]), createDocumentNode("div", {  }, [ "plants:", plants.size ]), createDocumentNode("div", {  }, [ "rocks:", rocks.size ]) ]).render(debugView);
      }
    }).call(this);
  
  })).once("error", ((err) => {
  	
    console.log("error on", "tick", "of", "game.events", "given", "t()");
    return console.log(err);
  
  }));
});
exports.startInterface = startInterface;