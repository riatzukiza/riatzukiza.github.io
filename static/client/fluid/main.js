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
  simplex3
 } from "/shared/noise.js";
import { 
  Vector2DPhaseSpace
 } from "./typed-arrays/vector-2d.js";
import { 
  DoubleBufferedArray
 } from "./typed-arrays/double-buffered.js";
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
import { 
  Vector
 } from "/shared/vectors.js";
var ThreadedSystem = Thread.define("ThreadedSystem", { 
  data:[],
  update( args ){ 
    
      return this.send({ 
        args,
        buffers:this.data.map(((data) => {
        	return [ data.currentState.buffer, data.nextState.buffer ];
        }))
       });
    
   }
 });
var PhysicalProperties = DoubleBufferedArray.define("PhysicalProperties", { 
  keys:[ "mass" ]
 });
const particleCount=1024;
const velocities=Vector2DPhaseSpace.spawn(particleCount);
const attractors=Vector2DPhaseSpace.spawn(particleCount);
const physicalProperties=PhysicalProperties.spawn();
const positions=Vector2DPhaseSpace.spawn(particleCount);
const vertices=vertexLayer(particleCount);
var MovementSystem = ThreadedSystem.define("MovementSystem", { 
  url:"/client/fluid/workers/movement.js",
  data:[ velocities, positions, attractors ]
 });
var NoiseSystem = ThreadedSystem.define("NoiseSystem", { 
  url:"/client/fluid/workers/noise.js",
  data:[ velocities, positions ]
 });
var AttractorSystem = ThreadedSystem.define("AttractorSystem", { 
  url:"/client/fluid/workers/attractors.js",
  data:[ velocities, positions, attractors ]
 });
var setMoveNoise = (function setMoveNoise$(v = this.v, x = this.x, y = this.y, t = 0, force = 1, noiseZ = 100) {
  /* set-move-noise inc/core/function-expressions.sibilant:28:8 */

  const v_=Vector.spawn();
  const angle=(simplex3(x, y, (noiseZ * 25 * t)) * Math.PI * 2);
  const length=(simplex3(x, y, (noiseZ * t)) * force);
  v_.setLength(length);
  v_.setAngle(angle);
  v.addTo(v_);
  return v_.despawn();
});
var updateMotes = (function updateMotes$(positions, verts) {
  /* update-motes eval.sibilant:53:0 */

  for (var p of positions.data)
  {
  verts[p.id].color.r = 255;
  verts[p.id].color.g = 10;
  verts[p.id].color.b = 10;
  verts[p.id].color.a = 255;;
  verts[p.id].size = 256;
  verts[p.id].intensity = 0.9;;
  verts[p.id].point.x = p.x;
  verts[p.id].point.y = p.y;
  verts[p.id].point.z = 1;
  }
  ;
  return null;
});
var randomlyPlaceParticles = (function randomlyPlaceParticles$() {
  /* randomly-place-particles eval.sibilant:65:0 */

  for (var p of positions.data)
  {
  p.x = ((10000 * Math.random()) - 10000);;
  p.y = ((10000 * Math.random()) - 10000);
  }
  ;
  return null;
});
var getBounds = (function getBounds$(positions) {
  /* get-bounds eval.sibilant:71:0 */

  var minX = 0,
      minY = 0,
      maxX = 0,
      maxY = 0;
  for (var p of positions.data)
  {
  (function() {
    if (p.x < minX) {
      return minX = p.x;
    }
  }).call(this);
  (function() {
    if (p.y < minY) {
      return minY = p.y;
    }
  }).call(this);
  (function() {
    if (p.x > maxX) {
      return maxX = p.x;
    }
  }).call(this);
  (function() {
    if (p.y > maxY) {
      return maxY = p.y;
    }
  }).call(this)
  }
  ;
  return [ minX, minY, maxX, maxY ];
});
var handleLoad = (function handleLoad$() {
  /* handle-load eval.sibilant:81:0 */

  randomlyPlaceParticles();
  updateMotes(positions, vertices);
  positions.step();
  velocities.step();
  rendering.update();
  console.log(vertices);
  console.log(positions);
  console.log(velocities);
  var wait = (function wait$(n) {
    /* wait eval.sibilant:109:2 */
  
    return (new Promise(((success, fail) => {
    	var resolve = success,
        reject = fail;
    return setTimeout(resolve, n);
    })));
  });
  async function draw(){
  
    while( true ){ 
      await (new Promise(((success, fail) => {
      	var resolve = success,
          reject = fail;
      return requestAnimationFrame((() => {
      	rendering.update();
      return resolve();
      }));
      })))
     };
    return null;
  
  };
  async function main(){
  
    NoiseSystem.init();
    MovementSystem.init();
    AttractorSystem.init();
    NoiseSystem.start();
    MovementSystem.start();
    AttractorSystem.start();
    const drawer=draw();
    var promise = Promise.resolve();
    while( true ){ 
      await Promise.all([ NoiseSystem.update(), AttractorSystem.update({ 
        bounds:getBounds(positions)
       }), MovementSystem.update() ]);
      positions.step();
      velocities.step();
      attractors.step();
      for (var p of positions.data)
      {
      const v=velocities.data[p.id];;
      const a=attractors.data[p.id];;
      vertices[p.id].color.g = Math.abs(Math.round(((256 * v.getLength()) / 2)));;
      vertices[p.id].color.b = Math.abs(Math.round((64 * a.getLength())));;
      vertices[p.id].point.x = p.x;
      vertices[p.id].point.y = p.y;
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
});
addEventListener("load", handleLoad);