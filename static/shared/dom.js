Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1831 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1893 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import '/bundles/external.js';
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
import { 
  EventEmitter
 } from "./kit/events/index.js";
var R = require("ramda");
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
      /* inc/scope.sibilant:12:9 */
    
      a[i] = node;
      return renderChildren(_parent, node, i, a);
    })(DocumentNode.wrap(c, _parent._node));
  } else {
    return _parent._node.appendChild(c);
  }
}).call(this);
}));
export { 
  renderChildren
 };
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
      (function() {
        if (_parent) {
          this._parent = _parent;
          return _parent._node.appendChild(_node);
        }
      }).call(this);
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
      this._parent = null;
      (function() {
        if (_parent) {
          _parent.children.filter(((c) => {
          	return !(_node === c);
          }));
          return _parent.emit("remove", _node);
        }
      }).call(this);
      return this;
    
   }
 });
export { 
  DocumentNode
 };
var DocumentRoot = DocumentNode.define("DocumentRoot", { 
  get _parent(  ){ 
    
      return this;
    
   },
  tagName:"html",
  _node:document.documentElement,
  _children:[]
 });
export { 
  DocumentRoot
 };
var DocumentBody = DocumentNode.define("DocumentBody", { 
  get _parent(  ){ 
    
      return this;
    
   },
  tagName:"body",
  get _node(  ){ 
    
      return document.body;
    
   },
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
export { 
  DocumentHead
 };
export { 
  DocumentBody
 };
var createDocumentNode = create(DocumentNode);
export { 
  createDocumentNode
 };