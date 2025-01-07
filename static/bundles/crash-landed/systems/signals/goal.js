require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/systems/signals/goal.js":[function(require,module,exports){
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
},{"@crash-landed/config.js":"@crash-landed/config.js","@crash-landed/systems/signal.js":"@crash-landed/systems/signal.js","@shared/data-structures/fields/sparse.js":"@shared/data-structures/fields/sparse.js"}]},{},[]);
