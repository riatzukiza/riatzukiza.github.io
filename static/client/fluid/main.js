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
  simplex3
 } from "/shared/noise.js";
import { 
  Vector2DPhaseSpace
 } from "./typed-arrays/vector-2d.js";
import { 
  rendering,
  vertexLayer
 } from "./rendering.js";
const velocities=Vector2DPhaseSpace.spawn(1024);
const positions=Vector2DPhaseSpace.spawn(1024);
const vertices=vertexLayer(1024);
const movement=Thread.spawn("/client/fluid/workers/movement.js");
const noise=Thread.spawn("/client/fluid/workers/noise.js");
var ThreadedSystem = Interface.define("ThreadedSystem", { 
  data:[],
  init( thread = Thread.spawn(this.threadUrl) ){ 
    
      this.thread = thread;
      return this;
    
   },
  update(  ){ 
    
      return this.thread.send(this.data.map(((data) => {
      	return [ data.currentState.buffer, data.nextState.buffer ];
      })));
    
   }
 });
var MovementSystem = ThreadedSystem.define("MovementSystem", { 
  data:[ velocities, positions ]
 });
var NoiseSystem = ThreadedSystem.define("NoiseSystem", { 
  data:[ velocities, positions ]
 });
for (var p of positions.data)
{
vertices[p.index].color.r = 10;
vertices[p.index].color.g = 10;
vertices[p.index].color.b = 255;
vertices[p.index].color.a = 1;;
vertices[p.index].point.x = p.x = (100 * Math.random());
vertices[p.index].point.y = p.y = (100 * Math.random());
}
;
for (var v of velocities.data)
{
const p=positions.data[v.index];;
setMoveNoise(v, p.x, p.y)
}
;
async function main(){

  while( true ){ 
    await Promise.all([ MovementSystem.update(), NoiseField.update() ]);
    velocities.step();
    positions.step();
    for (var p of positions.data)
    {
    vertices[p.index].point.x = p.x;
    vertices[p.index].point.y = p.y;
    }
    
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
	return (function() {
  if (game) {
    return game.rendering.context.canvas;
  } else {
    return "";
  }
}).call(this);
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
const startButton=createDocumentNode("div", { 'id': "startGame" }, [ createDocumentNode("button", { 'onclick': (() => {
	startGame();
return startInterface();
}) }, [ "start game" ]) ]);
createDocumentNode("div", { 'id': "frame" }, [ createDocumentNode("div", { 'id': "container" }, [ gameView, createDocumentNode("div", {
  'id': "debug-view",
  'className': "panel",
  'style': { 
    height:(config.dimensions[1] + "px"),
    width:(Math.round(((window.innerWidth * 0.2) - 42)) + "px"),
    "overflow-y":"scroll"
   }
}, [ startButton ]) ]) ]).render(DocumentBody);