var { 
  Timer,
  TimeLimit
 } = require("@obstacles/systems/timer.js"),
    config = require("@obstacles/config.js");
var AntLife = TimeLimit.define("AntLife", { 
  get duration(  ){ 
    
      return config.antLife;
    
   },
  callback( e ){ 
    
      return e.despawn();
    
   }
 });
var AntLifeTimer = Timer.define("AntLifeTimer", { 
  
 });