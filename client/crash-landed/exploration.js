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
game.events.on("tick", ((t) => {
	
  const pos=p.positionInterface;
  (function() {
    if ((t % 10) === 0) {
      return p.playerSprite.step();
    }
  }).call(this);
  const directionName=getCardinalDirectionName(v);
  return p.playerSprite.selectSequence(directionName);

})).once("error", ((err) => {
	
  console.log("error on", "tick", "of", "game.events", "given", "t()");
  return console.log(err);

}));