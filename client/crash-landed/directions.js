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
  Interface
 } = require("@kit-js/interface");
var { 
  Vector
 } = require("@shared/vector.js");
const eigthTurn=((Math.PI * 2) / 8);
const east=0;
const southEast=eigthTurn;
const south=(eigthTurn * 2);
const southWest=(eigthTurn * 3);
const west=(eigthTurn * 4);
const northWest=(eigthTurn * 5);
const north=(eigthTurn * 6);
const northEast=(eigthTurn * 7);
const directions=[ east, southEast, south, southWest, west, northWest, north, northEast ];
exports.directions = directions;
const directionNames=[ "east", "southEast", "south", "southWest", "west", "northWest", "north", "northEast" ];
exports.directionNames = directionNames;
var getCardinalDirection = (function getCardinalDirection$(vector) {
  /* get-cardinal-direction eval.sibilant:24:0 */

  const angle=vector.getAngle();
  return directions[(Math.abs(Math.round((angle / eigthTurn))) % 8)];
});
exports.getCardinalDirection = getCardinalDirection;
var directionActions = Interface.define("directionActions", { 
  north:[ 0, 1 ],
  northEast:[ 1, 1 ],
  east:[ 1, 0 ],
  southEast:[ 1, -1 ],
  south:[ 0, -1 ],
  southWest:[ -1, -1 ],
  west:[ -1, 0 ],
  northWest:[ -1, 1 ]
 });
exports.directionActions = directionActions;
var getCardinalDirectionName = (function getCardinalDirectionName$(vector) {
  /* get-cardinal-direction-name eval.sibilant:41:0 */

  const angle=vector.getAngle();
  const i=(Math.abs(Math.round((angle / eigthTurn))) % 8);
  return directionNames[i];
});
exports.getCardinalDirectionName = getCardinalDirectionName;