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
var Needs = Component.define("Needs", { 
  caloriesStored:2000,
  caloriesMax:5000,
  hungerThreshold:1000,
  satiatedThreshold:2000,
  rest:(48 * 60),
  maxRest:(48 * 60),
  totalSleepDeprivationThreshold:(24 * 60),
  partialSleepDeprivationThreshold:(40 * 60),
  starvationThreshold:500,
  health:1000,
  eat( item ){ 
    
      caloriesStored = Math.min((this.caloriesStored + item.itemInterface.calories), this.caloriesMax);
      return item.despawn();
    
   },
  isResting__QUERY:false,
  get restEfficiency(  ){ 
    
      return 1;
    
   },
  get isHungry__QUERY(  ){ 
    
      return this.hungerThreshold > this.caloriesStored;
    
   },
  get isStarving__QUERY(  ){ 
    
      return this.starvationThreshold > this.caloriesStored;
    
   },
  get isTired__QUERY(  ){ 
    
      return this.partiallySleepDeprived;
    
   },
  get isSleepDeprived__QUERY(  ){ 
    
      return this.totallySleepDeprived;
    
   },
  get isDieing__QUERY(  ){ 
    
      return (this.isStarving__QUERY || this.isSleepDeprived__QUERY);
    
   },
  get partiallySleepDeprived(  ){ 
    
      return this.partialSleepDeprivationThreshold > this.rest;
    
   },
  get totallySleepDeprived(  ){ 
    
      return this.totalSleepDeprivationThreshold > this.rest;
    
   },
  get hungerEfficiencyModifier(  ){ 
    
      return (this.hungerThreshold / Math.max(this.storedCalories, this.starvationThreshold));
    
   },
  get sleepEfficiencyModifier(  ){ 
    
      return (this.partialSleepDeprivationThreshold / Math.max(this.rest, this.totalSleepDeprivationThreshold));
    
   },
  get activityLevel(  ){ 
    
      return (function() {
        if (isResting__QUERY) {
          return 1;
        } else {
          return 11;
        }
      }).call(this);
    
   },
  get metabolicEfficiency(  ){ 
    
      return (this.activityLevel * this.sleepEfficiencyModifier * this.hungerEfficiencyModifier);
    
   }
 });
var Metabolisim = System.define("Metabolisim", { 
  interface:Calories,
  _updateComponent( c ){ 
    
      (function() {
        if (c.isResting__QUERY) {
          c.rest += c.restEfficiency;
          return (function() {
            if (c.rest >= c.maxRest) {
              return c.isResting__QUERY = false;
            }
          }).call(this);
        } else {
          return ((c.rest)--);
        }
      }).call(this);
      decrBy(c.calories, c.metabolicEfficiency);
      (function() {
        if (c.isDieing__QUERY) {
          return decrBy(c.health, (0.1 * c.metabolicEfficiency));
        }
      }).call(this);
      return (function() {
        {
          return c.health <= 0;
        }
      }).call(this);
    
   }
 });