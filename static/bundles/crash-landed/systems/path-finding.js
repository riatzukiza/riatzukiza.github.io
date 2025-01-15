require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/systems/path-finding.js":[function(require,module,exports){
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
  Spawnable
 } = require("@shared/data-structures/spawnable.js"),
    { 
  List
 } = require("@shared/data-structures/list.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    { 
  System,
  Component
 } = require("@shared/ecs.js"),
    config = require("@crash-landed/config.js");
var removeFromArray = (function removeFromArray$(el, array) {
  /* remove-from-array eval.sibilant:8:0 */

  const index=array.indexOf(el);
  return (function() {
    if (index > -1) {
      return array.splice(index, 1);
    }
  }).call(this);
});
var calculateDistanceCost = (function calculateDistanceCost$(start, end) {
  /* calculate-distance-cost eval.sibilant:12:0 */

  const startV=Vector.spawn(start.x, start.y);
  const endV=Vector.spawn(end.x, end.y);
  const distance=startV.distanceTo(endV);
  const dLength=Math.round(distance.getLength());
  startV.despawn();
  endV.despawn();
  return ((function() {
    if (end.entity.visibleStatus.explored__QUERY) {
      return (2 * (1 / end.entity.ground.stats.movementSpeed));
    } else {
      return 1;
    }
  }).call(this) * dLength);
});
const MOVE_STRAIGHT_COST=10;
const MOVE_DIAGONAL_COST=14;
var PathNode = Spawnable.define("PathNode", { 
  init( tile = this.tile,start = this.start,end = this.end,parent = null ){ 
    
      this.tile = tile;this.start = start;this.end = end;this.parent = parent;
      (function() {
        {
          return tile === end;
        }
      }).call(this);
      this._hCost = calculateDistanceCost(tile, end);
      (function() {
        if (isNaN(this._hCost)) {
          throw (new Error("Got a non number h cost"))
        }
      }).call(this);
      return this;
    
   },
  parent:null,
  tile:null,
  next:null,
  get gCost(  ){ 
    
      (function() {
        if (this.parent === this) {
          throw (new Error("TIme traveler detected, cannot be own parent."))
        }
      }).call(this);
      return (function() {
        if (this.tile === this.start) {
          return 0;
        } else if (!(this.parent)) {
          return Math.round((Number.MAX_SAFE_INTEGER / 2));
        } else {
          return (this.parent.gCost + calculateDistanceCost(this.parent.tile, this.tile));
        }
      }).call(this);
    
   },
  get fCost(  ){ 
    
      return (this.gCost + this.hCost);
    
   },
  get hCost(  ){ 
    
      return this._hCost;
    
   },
  get pathTo(  ){ 
    
      var path = List.spawn();
      var node = this;
      return (function() {
        var while$432 = undefined;
        while (node) {
          while$432 = (function() {
            path.unshift(node);
            node = node.parent;
            return path;
          }).call(this);
        };
        return while$432;
      }).call(this);
    
   },
  clear(  ){ 
    
      this.parent = null;
      this.tile = null;
      this.next = null;
      this.start = null;
      this.end = null;
      return this._hCost = null;
    
   }
 });
var CurrentPath = Component.define("CurrentPath", { 
  start:null,
  end:null,
  currentNode:null,
  get nextNode(  ){ 
    
      return this.currentNode.next;
    
   },
  nodeList:null,
  get pos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  get vel(  ){ 
    
      return this.entity.velocityInterface;
    
   }
 });
var PathFinding = System.define("PathFinding", { 
  interface:CurrentPath,
  tiles:null,
  open:[],
  closed:(new Set()),
  currentNode:null,
  activeNodes:(new Map()),
  get nextOpenNode(  ){ 
    
      return this.open.reduce(((currentBest, node) => {
      	
        return (function() {
          if (node.fCost < currentBest.fCost) {
            return node;
          } else {
            return currentBest;
          }
        }).call(this);
      
      }), this.open[0]);
    
   },
  _prepare(  ){ 
    
      this.open.length = 0;
      this.closed.clear();
      return null;
    
   },
  _updateComponent( c ){ 
    
      if( (c.start !== null && c.end !== null && c.start === c.end) ){ 
        c.start = null;
        c.end = null;
        c.currentNode = null;
       };
      (function() {
        if (c.currentNode) {
          const pos=c.pos;
          const vel=c.vel.vector;
          const occupiedTile=this.tiles.getClosestFromWorldPos(pos.x, pos.y);
          return (function() {
            if (occupiedTile === c.currentNode.item.tile) {
              const posV=Vector.spawn(pos.x, pos.y);
              const tilePosV=Vector.spawn(c.nextNode.item.tile.worldPos.x, c.nextNode.item.tile.worldPos.y);
              const d=tilePosV.distanceTo(posV);
              vel.setLength((occupiedTile.entity.ground.stats.movementSpeed * (0.5 * config.gameScale)));
              vel.setAngle(d.getAngle());
              d.despawn();
              posV.despawn();
              return tilePosV.despawn();
            } else if ((occupiedTile === c.end || c.end !== c.currentNode.item.end)) {
              console.log("found end");
              vel.setLength(0);
              for (var [ tile, node ] of this.activeNodes)
              {
              this.activeNodes.delete(tile);
              node.despawn()
              }
              ;
              c.nodeList.despawn();
              c.currentNode = null;
              c.start = null;
              c.end = null;
              return c.nodeList = null;
            } else if (occupiedTile === c.nextNode.item.tile) {
              c.currentNode = c.nextNode;
              const posV=Vector.spawn(pos.x, pos.y);
              const tilePosV=Vector.spawn(c.nextNode.item.tile.worldPos.x, c.nextNode.item.tile.worldPos.y);
              const d=tilePosV.distanceTo(posV);
              vel.setLength(64);
              vel.setAngle(d.getAngle());
              posV.despawn();
              tilePosV.despawn();
              return d.despawn();
            }
          }).call(this);
        }
      }).call(this);
      return (function() {
        if ((c.start && c.end && !(c.currentNode))) {
          this.open.length = 0;
          this.closed.clear();
          const startingNode=(function() {
            if (this.activeNodes.has(c.start)) {
              return this.activeNodes.get(c.start);
            } else {
              var r = (function() {
                /* inc/misc.sibilant:1:689 */
              
                return PathNode.spawn(c.start, c.start, c.end);
              }).call(this);
              this.activeNodes.set(c.start, r);
              return r;
            }
          }).call(this);
          this.open.push(startingNode);
          return (function() {
            var while$433 = undefined;
            while (this.open.length) {
              while$433 = (function() {
                const currentNode=this.nextOpenNode;
                return (function() {
                  if (currentNode.tile === c.end) {
                    c.nodeList = currentNode.pathTo;
                    c.currentNode = c.nodeList.head;
                    return this.open.length = 0;
                  } else {
                    removeFromArray(currentNode, this.open);
                    this.closed.add(currentNode.tile);
                    for (var neighbor of currentNode.tile.edges)
                    {
                    if( this.closed.has(neighbor) ){ 
                      continue
                     };
                    const neighborNode=(function() {
                      if (this.activeNodes.has(neighbor)) {
                        return this.activeNodes.get(neighbor);
                      } else {
                        var r = (function() {
                          /* inc/misc.sibilant:1:689 */
                        
                          return PathNode.spawn(neighbor, c.start, c.end);
                        }).call(this);
                        this.activeNodes.set(neighbor, r);
                        return r;
                      }
                    }).call(this);;
                    (function() {
                      if ((currentNode.gCost + calculateDistanceCost(currentNode.tile, neighborNode.tile)) < neighborNode.gCost) {
                        neighborNode.parent = currentNode;
                        return (function() {
                          if (!(this.open.includes(neighborNode))) {
                            return this.open.push(neighborNode);
                          }
                        }).call(this);
                      }
                    }).call(this)
                    }
                    ;
                    return null;
                  }
                }).call(this);
              }).call(this);
            };
            return while$433;
          }).call(this);
        }
      }).call(this);
    
   }
 });
exports.PathFinding = PathFinding;
exports.CurrentPath = CurrentPath;
},{"@crash-landed/config.js":"@crash-landed/config.js","@shared/data-structures/list.js":"@shared/data-structures/list.js","@shared/data-structures/spawnable.js":"@shared/data-structures/spawnable.js","@shared/ecs.js":"@shared/ecs.js","@shared/vectors.js":"@shared/vectors.js"}]},{},[]);
