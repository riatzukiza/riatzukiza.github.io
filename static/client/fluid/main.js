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
  simplex3
 } from "/shared/noise.js";
import { 
  Vector2DPhaseSpace
 } from "./typed-arrays/vector-2d.js";
import { 
  rendering,
  vertexLayer
 } from "./rendering.js";
import { 
  Thread
 } from "/shared/worker.js";
import { 
  config
 } from "./config.js";
import { 
  Ticker
 } from "/shared/ticker.js";
addEventListener("load", (() => {
	const velocities=Vector2DPhaseSpace.spawn(1024);
const positions=Vector2DPhaseSpace.spawn(1024);
const vertices=vertexLayer(1024);
var setMoveNoise = (function setMoveNoise$(v = this.v, x = this.x, y = this.y, t = 0, force = 1) {
  /* set-move-noise inc/core/function-expressions.sibilant:28:8 */

  v.setAngle((simplex3(x, y, t) * Math.PI * 2));
  return v.setLength((simplex3(x, y, t) * force));
});
var ThreadedSystem = Thread.define("ThreadedSystem", { 
  data:[],
  update(  ){ 
    
      console.log("update", this);
      return this.send(this.data.map(((data) => {
      	return [ data.currentState.buffer, data.nextState.buffer ];
      })));
    
   }
 });
var MovementSystem = ThreadedSystem.define("MovementSystem", { 
  url:"/client/fluid/workers/movement.js",
  data:[ velocities, positions ]
 });
var NoiseSystem = ThreadedSystem.define("NoiseSystem", { 
  url:"/client/fluid/workers/noise.js",
  data:[ velocities, positions ]
 });
for (var p of positions.data)
{
vertices[p.id].color.r = 255;
vertices[p.id].color.g = 10;
vertices[p.id].color.b = 10;
vertices[p.id].color.a = 255;;
vertices[p.id].size = 8;;
vertices[p.id].point.x = p.x = (1000 * Math.random());
vertices[p.id].point.y = p.y = (1000 * Math.random());
vertices[p.id].point.z = 1;
}
;
positions.step();
rendering.update();
for (var v of velocities.data)
{
const p=positions.data[v.id];;
setMoveNoise(v, p.x, p.y)
}
;
velocities.step();
console.log(vertices);
console.log(positions);
console.log(velocities);
async function main(){

  console.log("click");
  NoiseSystem.init();
  MovementSystem.init();
  NoiseSystem.start();
  MovementSystem.start();
  var promise = Promise.resolve();
  while( true ){ 
    console.log("step");
    await Promise.all([ MovementSystem.update(), NoiseSystem.update() ]);
    velocities.step();
    positions.step();
    for (var p of positions.data)
    {
    vertices[p.id].point.x = p.x;
    vertices[p.id].point.y = p.y;
    }
    ;
    rendering.update()
   };
  return null;

};
const gameView=createDocumentNode("div", {
  'id': "game-view",
  'className': "panel",
  'style': { 
    "background-color":"black"
   }
}, [ (() => {
	return rendering.context.canvas;
}) ]);
const loadSelectedGame=(() => {
	return loadGame(document.getElementById("loadSaveNameField").value);
});
const loadButton=createDocumentNode("button", { 'onclick': loadSelectedGame }, [ "load game" ]);
const loadNameField=createDocumentNode("input", {
  'type': "text",
  'id': "loadNameField"
}, []);
const loadWidget=createDocumentNode("div", { 'id': "loadGame" }, [ loadNameField, loadButton ]);
const saveSelectedGame=(() => {
	return saveGame(document.getElementById("saveNameField").value);
});
const saveButton=createDocumentNode("button", { 'onclick': saveSelectedGame }, [ "save game" ]);
const saveNameField=createDocumentNode("input", {
  'type': "text",
  'id': "saveNameField"
}, []);
const saveWidget=createDocumentNode("div", { 'id': "saveGame" }, [ saveNameField, saveButton ]);
const startButton=createDocumentNode("div", { 'id': "startGame" }, [ createDocumentNode("button", { 'onclick': main }, [ "start game" ]) ]);
return createDocumentNode("div", { 'id': "frame" }, [ createDocumentNode("div", { 'id': "container" }, [ gameView, createDocumentNode("div", {
  'id': "debug-view",
  'className': "panel",
  'style': { 
    height:(config.dimensions[1] + "px"),
    width:(Math.round(((window.innerWidth * 0.2) - 42)) + "px"),
    "overflow-y":"scroll"
   }
}, [ startButton ]) ]) ]).render(DocumentBody);
}));