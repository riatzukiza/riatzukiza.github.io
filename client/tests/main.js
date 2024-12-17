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
  /* Array.prototype.each inc/misc.sibilant:1:1105 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1167 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
global.mixin = mixin;
global.create = create;
var { 
  BinarySearchTree
 } = require("@shared/data-structures/trees/binary-search-tree.js"),
    { 
  RedBlackTree
 } = require("@shared/data-structures/trees/red-black-tree.js");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
const rbTree=RedBlackTree.spawn();
(function() {
  /* node_modules/kit/inc/loops.sibilant:26:8 */

  var $for = null;
  for (var i = 0;i < 10;++(i))
  {
  $for = (function() {
    /* node_modules/kit/inc/loops.sibilant:28:35 */
  
    return rbTree.root.insert((Math.floor((Math.random() * ( - 10000))) + 10000));
  }).call(this);
  }
  ;
  return $for;
}).call(this);
var renderNode = (function renderNode$(node) {
  /* render-node eval.sibilant:26:0 */

  const foregroundColor=(function() {
    if (node.color === "black") {
      return "white";
    } else {
      return "black";
    }
  }).call(this);
  return createDocumentNode("div", { 'style': { 
    "background-color":node.color,
    "color":foregroundColor,
    "float":"left",
    "width":(function() {
      if (node.sibling) {
        return "50%-2px";
      } else {
        return "100%-2px";
      }
    }).call(this),
    "border-color":foregroundColor,
    "border-width":"1px",
    "border-style":"solid"
   } }, [ (function() {
    if (node.isRoot__QUERY) {
      return createDocumentNode("h1", {  }, [ "Root" ]);
    } else if (node.isOnLeft__QUERY) {
      return createDocumentNode("h2", {  }, [ "left" ]);
    } else {
      return createDocumentNode("h2", {  }, [ "right" ]);
    }
  }).call(this), createDocumentNode("div", {  }, [ node.key ]), (function() {
    if (node.left) {
      return renderNode(node.left);
    } else {
      return "";
    }
  }).call(this), (function() {
    if (node.right) {
      return renderNode(node.right);
    } else {
      return "";
    }
  }).call(this) ]);
});
createDocumentNode("div", {
  'id': "container",
  'style': { 
    "width":window.innerWidth
   }
}, [ renderNode(rbTree.root) ]).render(DocumentRoot);