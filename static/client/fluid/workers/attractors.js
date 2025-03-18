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
import '/bundles/external.js';
import { 
  Vector2DPhaseSpace
 } from "../typed-arrays/vector-2d.js";
var QuadTree = require("@timohausmann/quadtree-js");
import { 
  Vector
 } from "/shared/vectors.js";
const bounds=[ 10000001000000 ];
self.onmessage = (function self$onmessage$(e) {
  /* self.onmessage eval.sibilant:10:0 */

  const [ [ vb1, vb2 ], [ pb1, pb2 ], [ ab1, ab2 ] ]=e.data.buffers;
  const { 
    bounds:[ minX, minY, maxX, maxY ]
   }=e.data.args;
  const velocities=Vector2DPhaseSpace.fromBuffers(vb1, vb2);
  const positions=Vector2DPhaseSpace.fromBuffers(pb1, pb2);
  const attractors=Vector2DPhaseSpace.fromBuffers(ab1, ab2);
  const quads=(new QuadTree({ 
    x:minX,
    y:minY,
    height:(Math.abs(minY) + Math.abs(maxY)),
    width:(Math.abs(minX) + Math.abs(maxX))
   }, 100, 1000));
  for (var pos of positions.data)
  {
  quads.insert({ 
    x:pos.x,
    y:pos.y,
    id:pos.id,
    height:256,
    width:256
   })
  }
  ;
  const visited=(new Set());
  const groups=[];
  for (var pos of positions.data)
  {
  if( visited.has(pos.id) ){ 
    continue
   };
  visited.add(pos.id);
  const elements=quads.retrieve({ 
    x:pos.x,
    y:pos.y,
    height:9192,
    width:9192
   });;
  const attraction=attractors.data[pos.id];;
  const center=Vector.spawn(pos.x, pos.y);;
  const group=Vector.spawn(attraction.x, attraction.y);;
  group.center = center;;
  group.members = [];;
  const p=Vector.spawn(pos.x, pos.y);;
  var i = 0;;
  groups.push(group);
  for (var neighbor of elements)
  {
  if( i > 100 ){ 
    break
   };
  if( pos.id === neighbor.id ){ 
    continue
   };
  if( visited.has(neighbor.id) ){ 
    continue
   };
  ((i)++);
  visited.add(neighbor.id);
  group.members.push(neighbor);
  const p_=Vector.spawn(neighbor.x, neighbor.y);;
  const dist=p.distanceTo(p_);;
  const middleDist=dist.div(2);;
  center.addTo(middleDist);
  middleDist.despawn();
  const intensity=(1 / dist.getLength());;
  dist.setLength(intensity);
  group.addTo(dist);
  pos.addTo(dist);
  dist.despawn();
  p_.despawn()
  }
  ;
  p.despawn()
  }
  ;
  for (var group of groups)
  {
  for (var group.members of )
  {
  
  }
  
  }
  ;
  quads.clear();
  self.postMessage([ [ vb1, pb1 ], [ vb2, pb2 ], [ ab1, ab2 ] ]);
  velocities.despawn();
  return positions.despawn();
});