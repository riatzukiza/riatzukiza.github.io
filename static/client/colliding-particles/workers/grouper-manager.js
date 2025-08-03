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
 } from "@shared/vectors.js";
import { 
  Spawnable
 } from "@shared/data-structures/spawnable.js";
import { 
  PhysicsArray
 } from "@colliding-particles/typed-arrays/physics-array.js";
import { 
  GroupIdArray
 } from "@colliding-particles/typed-arrays/group-id-array.js";
import { 
  Vector2DArray
 } from "@colliding-particles/typed-arrays/vector-2d.js";
import { 
  ThreadedSystem
 } from "@colliding-particles/system.js";
import { 
  BarycenterArray
 } from "@colliding-particles/typed-arrays/barycenter-array.js";
import { 
  ParentSystem
 } from "@colliding-particles/system.js";
import { 
  config
 } from "@colliding-particles/config.js";
const { 
  gravitationalConstant
 }=config;
var GrouperSystem = ThreadedSystem.define("GrouperSystem", { 
  url:"/client/colliding-particles/workers/grouper-system.js",
  data:[]
 });
console.log(config);
const threads=[];
for (var i = 0;config.attractorThreadCount > i;((i)++))
{
const thread=AttractorGroupSystem.spawn();;
thread.url = ("/client/colliding-particles/workers/grouper-system.js?gid=" + i);;
thread.args = { 
  threadId:i
 };;
thread.start();
threads.push(thread)
}
;
var GroupManager = ParentSystem.define("GroupManager", { 
  dataTypes:[ Vector2DArray, PhysicsArray, GroupIdArray, KdTree, BarycenterArray ],
  async update( args,data ){ 
  
    return Promise.all(threads.map(((thread) => {
    	thread.data = data;
    return thread.update();
    })));
  
 }
 });
ClusterAttractorManager.start();