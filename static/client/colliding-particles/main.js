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
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } from "/shared/dom.js";
import { 
  config
 } from "./config.js";
import { 
  gameView,
  startButton
 } from "./ui.js";
import { 
  setup
 } from "./setup.js";
import { 
  update
 } from "./update.js";
import { 
  GameSystemsManager
 } from "./workers.js";
import { 
  particles,
  vertices
 } from "./data.js";
const { 
  minMass,
  maxMass,
  actualMaximumMass,
  spawnWidth,
  spawnHeight,
  spawnArea,
  particleCount
 }=config;
async function main(){

  setup(particles, GameSystemsManager, vertices);
  var promise = Promise.resolve();
  while( true ){ 
    await update(GameSystemsManager, particles, vertices)
   };
  return null;

};
createDocumentNode("div", { 'id': "frame" }, [ createDocumentNode("div", { 'id': "container" }, [ gameView, createDocumentNode("div", {
  'id': "debug-view",
  'className': "panel",
  'style': { 
    height:(config.dimensions[1] + "px"),
    width:(Math.round(((window.innerWidth * 0.2) - 42)) + "px"),
    "overflow-y":"scroll"
   }
}, [ startButton(main) ]) ]) ]).render(DocumentBody);