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
import { 
  DoubleBufferedArray
 } from "../typed-arrays/double-buffered.js";
import { 
  DataType
 } from "../data-types/data-type.js";
import { 
  Vector
 } from "/shared/vectors.js";
import { 
  Spawnable
 } from "/shared/data-structures/spawnable.js";
var QuadTree = require("@timohausmann/quadtree-js");
const gravitationalConstant=1e-7;
const minDist=1;
const particleSize=512;
const maxObjects=100;
const maxLevels=10;
var PhysicalProperty = DataType.define("PhysicalProperty", { 
  keys:[ "mass" ]
 });
var PhysicalProperties = DoubleBufferedArray.define("PhysicalProperties", { 
  dataType:PhysicalProperty
 });
var AttractorGroup = Spawnable.define("AttractorGroup", { 
  init( members = (this.members || []) ){ 
    
      this.members = members;
      return this;
    
   },
  get center(  ){ 
    
      return (function() {
        if (this._center) {
          return this._center;
        } else {
          return this._center = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            var center = Vector.spawn(0, 0);
            for (var member of this.members)
            {
            const a=member.pos.mult(member.mass);;
            center.addTo(a);
            a.despawn()
            }
            ;
            center.divTo(this.mass);
            return center;
          }).call(this);
        }
      }).call(this);
    
   },
  get mass(  ){ 
    
      return (function() {
        if (this._mass) {
          return this._mass;
        } else {
          return this._mass = (function() {
            /* inc/misc.sibilant:1:3986 */
          
            var mass = 0;
            for (var member of this.members)
            {
            mass += member.mass
            }
            ;
            return mass;
          }).call(this);
        }
      }).call(this);
    
   },
  clear(  ){ 
    
      (function() {
        if (this._center) {
          (function() {
            if (this._center.spawn) {
              return this._center.despawn();
            } else if ((this._center[0] && this._center[0].spawn)) {
              return this._center.each(((el) => {
              	return el.despawn();
              }));
            }
          }).call(this);
          return this._center = null;
        }
      }).call(this);
      (function() {
        if (this._mass) {
          (function() {
            if (this._mass.spawn) {
              return this._mass.despawn();
            } else if ((this._mass[0] && this._mass[0].spawn)) {
              return this._mass.each(((el) => {
              	return el.despawn();
              }));
            }
          }).call(this);
          return this._mass = null;
        }
      }).call(this);
      return this.members.length = 0;
    
   }
 });
var Particle = Spawnable.define("Particle", { 
  init( posSource = this.posSource,attractor = this.attractor,mass = this.mass,height = 256,width = 256,pos = Vector.spawn(posSource.x, posSource.y),vel = Vector.spawn(0, 0) ){ 
    
      this.posSource = posSource;this.attractor = attractor;this.mass = mass;this.height = height;this.width = width;this.pos = pos;this.vel = vel;
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
  /* self.onmessage eval.sibilant:74:0 */

  const [ [ vb1, vb2 ], [ pb1, pb2 ], [ ab1, ab2 ], [ mb1, mb2 ] ]=e.data.buffers;
  const { 
    bounds:[ minX, minY, maxX, maxY ]
   }=e.data.args;
  const velocities=Vector2DPhaseSpace.fromBuffers(vb1, vb2);
  const positions=Vector2DPhaseSpace.fromBuffers(pb1, pb2);
  const attractors=Vector2DPhaseSpace.fromBuffers(ab1, ab2);
  const masses=PhysicalProperties.fromBuffers(mb1, mb2);
  const quadsConfig={ 
    x:minX,
    y:minY,
    height:(maxY - minY),
    width:(maxX - minX)
   };
  const quads=(new QuadTree(quadsConfig, maxObjects, maxLevels));
  const particles=[];
  var minMass = 0;
  var maxMass = 0;
  for (var pos of positions.data)
  {
  const attractor=attractors.data[pos.id];;
  const mass=masses.data[pos.id].mass;;
  minMass = Math.min(minMass, mass);;
  maxMass = Math.max(maxMass, mass);;
  const particle=Particle.spawn(pos, attractor, mass);;
  particles.push(particle);
  quads.insert(particle)
  }
  ;
  const visited=(new Set());
  const groups=[];
  const lonerGroup=AttractorGroup.spawn();
  for (var pos of positions.data)
  {
  if( visited.has(pos.id) ){ 
    continue
   };
  visited.add(pos.id);
  const mass=masses[pos.id];;
  const p=Vector.spawn(pos.x, pos.y);;
  const elements=quads.retrieve({ 
    x:pos.x,
    y:pos.y,
    height:particleSize,
    width:particleSize
   }).sort(((a, b) => {
  	const d1=Math.abs(p.distanceTo(a.pos));
  const d2=Math.abs(p.distanceTo(b.pos));
  return (function() {
    if (d1 > d2) {
      return 1;
    } else {
      return -1;
    }
  }).call(this);
  }));;
  const group=AttractorGroup.spawn();;
  for (var neighbor of elements)
  {
  if( visited.has(neighbor.id) ){ 
    continue
   };
  visited.add(neighbor.id);
  group.members.push(neighbor);
  neighbor.group = group;
  }
  ;
  (function() {
    if (group.members.length) {
      return groups.push(group);
    } else {
      return group.despawn();
    }
  }).call(this)
  }
  ;
  for (var group of groups)
  {
  for (var target of group.members)
  {
  for (var affectorGroup of groups)
  {
  if( target.group === affectorGroup ){ 
    continue
   };
  const dist=affectorGroup.center.distanceTo(target.pos);;
  const usedDistance=Math.max(minDist, Math.abs(dist.getLength()));;
  const mag=Math.sqrt(((dist.x * dist.x) + (dist.y * dist.y)));;
  const intensity=Math.abs(((gravitationalConstant * affectorGroup.mass * usedDistance) / Math.pow(mag, 2)));;
  dist.setLength(intensity);
  target.vel.addTo(dist);
  dist.despawn()
  }
  ;
  for (var affector of group.members)
  {
  if( target.id === affector.id ){ 
    continue
   };
  const dist=affector.pos.distanceTo(target.pos);;
  const usedDistance=Math.max(minDist, Math.abs(dist.getLength()));;
  const mag=Math.sqrt(((dist.x * dist.x) + (dist.y * dist.y)));;
  const intensity=Math.abs(((gravitationalConstant * affector.mass * usedDistance) / Math.pow(mag, 2)));;
  dist.setLength(intensity);
  target.vel.addTo(dist);
  dist.despawn()
  }
  
  }
  
  }
  ;
  for (var particle of particles)
  {
  particle.attractor.addTo(particle.vel);
  particle.despawn()
  }
  ;
  for (var group of groups)
  {
  group.despawn()
  }
  ;
  quads.clear();
  self.postMessage([ [ vb1, pb1 ], [ vb2, pb2 ], [ ab1, ab2 ] ]);
  velocities.despawn();
  return positions.despawn();
});