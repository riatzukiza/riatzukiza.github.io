Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1121 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1183 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  SparseVectorField
 } = require("@shared/data-structures/fields/sparse.js");
var { 
  Signal,
  Influence
 } = require("@crash-landed/systems/signal.js");
var config = require("@crash-landed/config.js");
var GoalField = SparseVectorField.define("GoalField", { 
  maxLength:config.maxLength,
  decayRate:config.decayRate,
  _equation( x = this.x,y = this.y,t = this.t,t_ = this.t_,v = this.v,v_ = this.v_,decayRate = this.decayRate,maxLength = this.maxLength ){ 
    
      return (function() {
        if ((v.x && v.y)) {
          v.divTo((decayRate * (1 + (t - t_))));
          return (function() {
            if (v.getLength() > maxLength) {
              return v.setLength(maxLength);
            }
          }).call(this);
        }
      }).call(this);
    
   }
 });
var GoalTracker = Influence.define("GoalTracker", { 
  
 });
var GoalFinder = Signal.define("GoalFinder", { 
  interface:GoalTracker,
  field:GoalField.spawn(),
  evolve( cell,c ){ 
    
      console.log({ 
        cell,
        config
       });
      cell.addTo({ 
        x:(c.velocity.xd * config.antInfluence),
        y:(c.velocity.yd * config.antInfluence)
       });
      return console.log({ 
        cell
       });
    
   }
 });
exports.GoalFinder = GoalFinder;