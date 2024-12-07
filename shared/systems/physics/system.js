var { 
  Interface
 } = require("@kit-js/interface");
var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    { 
  Position
 } = require("@shared/systems/position.js");
var PhysicalProperties = Component.define("PhysicalProperties", { 
  _scale:1,
  _mass:1,
  priorMass:0,
  priorScale:0,
  forces:[],
  get priorDensity(  ){ 
    
      return (this.priorMass / this.priorVolume);
    
   },
  get priorVolume(  ){ 
    
      return Math.pow(this.priorScale, 3);
    
   },
  get scale(  ){ 
    
      return this._scale;
    
   },
  get mass(  ){ 
    
      return this._mass;
    
   },
  set scale( s ){ 
    
      this.priorScale = this.scale;
      return this._scale = s;
    
   },
  set mass( m ){ 
    
      this.priorMass = this.mass;
      return this._mass = m;
    
   },
  get density(  ){ 
    
      return (this.mass / this.volume);
    
   },
  get volume(  ){ 
    
      return Math.pow(this.scale, 3);
    
   },
  get velocity(  ){ 
    
      return this.system.process.systems.get(Velocity, this.entity);
    
   },
  get position(  ){ 
    
      return this.system.process.systems.get(Position, this.entity);
    
   },
  get location(  ){ 
    
      return this.position;
    
   }
 });
exports.PhysicalProperties = PhysicalProperties;
var Physics = System.define("Physics", { 
  interface:PhysicalProperties,
  _forces:[],
  registerForce( F = this.F,_forces = this._forces ){ 
    
      console.log("registering force", F);
      return create(F)(this);
    
   },
  register( forces = this.forces ){ 
    
      return this._forces = forces.map(((F) => {
      	
        return this.registerForce(F, forces);
      
      }));
    
   },
  get forces(  ){ 
    
      return this._forces;
    
   },
  _updateComponent( c ){ 
    
      return c.forces.each((function() {
        /* eval.sibilant:1:1485 */
      
        return arguments[0].apply(c);
      }));
    
   }
 });
exports.Physics = Physics;
Physics.Force = Interface.define("Physics.Force", { 
  init( physics = this.physics ){ 
    
      this.physics = physics;
      return this;
    
   },
  build(  ){ 
    
      return (function() {
        if (!(this.name === "Physics.Force")) {
          console.log("Physics.Force.build", "adding force to physics", this);
          return Physics.forces.push(this);
        }
      }).call(this);
    
   },
  apply( physicalProperties = this.physicalProperties ){ 
    
      throw (new Error("force does not have an applicator.")())
    
   }
 });