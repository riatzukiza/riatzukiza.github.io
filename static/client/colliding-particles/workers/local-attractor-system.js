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
import '/bundles/external.js';
import { 
  Vector
 } from "/shared/vectors.js";
import { 
  Spawnable
 } from "/shared/data-structures/spawnable.js";
import { 
  PhysicsArray
 } from "../typed-arrays/physics-array.js";
import { 
  GroupIdArray
 } from "../typed-arrays/group-id-array.js";
import { 
  Vector2DArray
 } from "../typed-arrays/vector-2d.js";
import { 
  config
 } from "../config.js";
const { 
  gravitationalConstant
 }=config;
var calculateGravitationalIntensity = (function calculateGravitationalIntensity$(target, affector) {
  /* calculate-gravitational-intensity eval.sibilant:14:0 */

  const dist=affector.pos.distanceTo(target.pos);
  const usedDistance=Math.abs(dist.getLength());
  if( Math.pow(usedDistance, 2) < Math.pow((2 * target.scale), 2) ){ 
    dist.x = 0;
    dist.y = 0;;
    return dist;
   };
  const mag=Math.sqrt(((dist.x * dist.x) + (dist.y * dist.y)));
  dist.setLength(Math.abs(((-1 * gravitationalConstant * affector.mass * target.mass * usedDistance) / Math.pow(mag, 2))));
  return dist;
});
var LocalParticle = Spawnable.define("LocalParticle", { 
  init( posSource = this.posSource,physSource = this.physSource,groupIdSource = this.groupIdSource,nearGravitySource = this.nearGravitySource,mass = physSource.mass,scale = physSource.scale,groupId = groupIdSource.groupId,height = scale,width = scale,pos = Vector.spawn(posSource.x, posSource.y),vel = Vector.spawn(0, 0) ){ 
    
      this.posSource = posSource;this.physSource = physSource;this.groupIdSource = groupIdSource;this.nearGravitySource = nearGravitySource;this.mass = mass;this.scale = scale;this.groupId = groupId;this.height = height;this.width = width;this.pos = pos;this.vel = vel;
      return this;
    
   },
  get x(  ){ 
    
      return this.posSource.x;
    
   },
  get y(  ){ 
    
      return this.posSource.y;
    
   },
  clear(  ){ 
    
      this.posSource = null;
      this.pos.despawn();
      this.vel.despawn();
      this.pos = null;
      this.vel = null;
      this.width = null;
      return this.height = null;
    
   },
  get id(  ){ 
    
      return this.posSource.id;
    
   }
 });
self.onmessage = (function self$onmessage$(e) {
  /* self.onmessage eval.sibilant:65:0 */

  const [ [ pb1, pb2 ], [ mb1, mb2 ], [ gb1, gb2 ], [ nb1, nb2 ] ]=e.data.buffers;
  const { 
    groupId
   }=e.data.args;
  const positions=Vector2DArray.fromBuffers(pb1, pb2);
  const phys=PhysicsArray.fromBuffers(mb1, mb2);
  const groupIds=GroupIdArray.fromBuffers(gb1, gb2);
  const nearGravity=Vector2DArray.fromBuffers(nb1, nb2);
  const particles=[];
  for (var pos of positions.data)
  {
  const gid=groupIds.data[pos.id];;
  if( gid.groupId === groupId ){ 
    const particle=LocalParticle.spawn(pos, phys.data[pos.id], gid, nearGravity.data[pos.id]);;
    particles.push(particle)
   }
  }
  ;
  for (var target of particles)
  {
  for (var affector of particles)
  {
  if( target.id === affector.id ){ 
    continue
   };
  const intensity=calculateGravitationalIntensity(target, affector);;
  target.vel.addTo(intensity);
  intensity.despawn()
  }
  
  }
  ;
  for (var particle of particles)
  {
  particle.nearGravitySource.x = particle.vel.x;
  particle.nearGravitySource.y = particle.vel.y;;
  particle.despawn()
  }
  ;
  self.postMessage([]);
  positions.despawn();
  nearGravity.despawn();
  phys.despawn();
  return groupIds.despawn();
});