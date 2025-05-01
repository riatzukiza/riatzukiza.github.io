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
var AnimationController = Interface.define("AnimationController", { 
  
 });
var MoteSpawnController = Interface.define("MoteSpawnController", { 
  
 });
var MoteDespawnController = Interface.define("MoteDespawnController", { 
  
 });
var RandomWalkController = Interface.define("RandomWalkController", { 
  
 });
var PositionController = Interface.define("PositionController", { 
  
 });
var VelocityController = Interface.define("VelocityController", { 
  
 });
var AccelerationController = Interface.define("AccelerationController", { 
  
 });
var PositionData = GameComponent.define("PositionData", { 
  dataKeys:[ "x", "y" ]
 });
var PositionArray = GameComponentArray.define("PositionArray", { 
  dataType:PositionData
 });
var Position = Component.define("Position", { 
  get x(  ){ 
    
      return this.pos.x;
    
   },
  get y(  ){ 
    
      return this.pos.y;
    
   }
 });
const positions=PositionArray.spawn(1024);
const velocities=VelocityArray.spawn(1024);
const accelerations=AccelerationArray.spawn(1024);
const noise=NoiseArray.spawn(1024);
var MainThreadSystem = System.define("MainThreadSystem", { 
  docString:"Main-thread-system"
 });
var WorkerSystem = System.define("WorkerSystem", { 
  docString:"Worker-thread-system"
 });
var MovementSystem = WorkerSystem.define("MovementSystem", { 
  controller:PositionController
 });
var GameController = Interface.define("GameController", { 
  init( game = create(Game)(config, activeGameSystems, config.gameSpeed) ){ 
    
      this.game = game;
      return this;
    
   },
  get events(  ){ 
    
      return this.game.events;
    
   },
  pause( game = this.game ){ 
    
      return game.stop();
    
   },
  start( game = this.game ){ 
    
      return game.start();
    
   }
 });