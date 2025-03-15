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
const velocities=VectorPhaseSpace.create(1024);
const positions=VectorPhaseSpace.create(1024);
const vertices=vertexLayer(1024);
const movement=Thread.spawn("/client/save-pos-demo/workers/movement.js");
const noiseField=Thread.spawn("/client/save-pos-demo/workers/noise-field.js");
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
var MovementSystem = Interface.define("MovementSystem", { 
  update(  ){ 
    
      return movement.send([ velocities.currentState.buffer, movement.currentState.buffer, velocities.nextState.buffer, movement.nextState.buffer ]);
    
   }
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

  return while( true ){ 
    await Promise.all([ MovementSystem.update(), NoiseField.update() ]);
    velocities.step();
    positions.step();
    for (var p of positions.data)
    {
    vertices[p.index].point.x = p.x;
    vertices[p.index].point.y = p.y;
    }
    
   };

};