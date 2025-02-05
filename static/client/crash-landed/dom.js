Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
import { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } from "/shared/dom.js";
import { 
  rendering
 } from "./rendering.js";
import { 
  config
 } from "./config.js";
var displayDecimal = (function displayDecimal$(d = this.d, n = 6) {
  /* display-decimal inc/core/function-expressions.sibilant:28:8 */

  return (Math.round((Math.pow(10, n) * d)) / Math.pow(10, n));
});
const gameView=createDocumentNode("div", {
  'id': "game-view",
  'className': "panel",
  'style': { 
    "background-color":"black"
   }
}, [ rendering.context.canvas ]);
const debugView=createDocumentNode("div", {
  'id': "debug-view",
  'className': "panel",
  'style': { 
    height:(config.dimensions[1] + "px"),
    width:(Math.round(((window.innerWidth * 0.2) - 42)) + "px"),
    "overflow-y":"scroll"
   }
}, []);
var container = createDocumentNode("div", { 'id': "container" }, [ gameView, debugView ]);
export { 
  container
 };
export { 
  gameView
 };
export { 
  debugView
 };
var startInterface = (function startInterface$(game) {
  /* start-interface eval.sibilant:36:0 */

  createDocumentNode("div", { 'id': "frame" }, [ container ]).render(DocumentBody);
  return game.events.on("tick", ((t) => {
  	return (function() {
    if ((t % config.uiPollingRate) === 0) {
      
    }
  }).call(this);
  })).once("error", ((err) => {
  	console.log("error on", "tick", "of", "game.events", "given", "t()");
  return console.log(err);
  }));
});
export { 
  startInterface
 };