Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
import { 
  game,
  activeGameSystems
 } from "./game.js";
import { 
  startInterface
 } from "./dom.js";
import { 
  Position
 } from "/shared/systems/position.js";
import { 
  Sight
 } from "./systems/sight.js";
import { 
  player,
  ItemGroup
 } from "./units.js";
import { 
  getCardinalDirectionName
 } from "./directions.js";
import { 
  tiles
 } from "./tiles.js";
import { 
  PathFinding
 } from "./systems/path-finding.js";
import { 
  Velocity
 } from "/shared/systems/velocity.js";
import { 
  getTileNoise
 } from "./noise.js";
import { 
  config
 } from "./config.js";
const p=player;
const v=p.velocity.vector;
const gameScale=config.gameScale;
p.physics.scale = config.gameScale;
p.physics.forces = [];
game.tiles = tiles;
PathFinding.tiles = tiles;
Velocity.realTime__QUERY = false;
Position.wraps__QUERY = false;
Sight.registerTileGraph(tiles);
p.sprite.selectSequence("east");
import { 
  TileGenerator
 } from "./world-gen/worker.js";
var setupTile = (function setupTile$(tileData) {
  /* setup-tile eval.sibilant:49:0 */

  const tile=tiles.get(tileData.x, tileData.y);
  tile.entity.ground.type = tileData.type;
  const v=getTileNoise(tile.x, tile.y);
  (function() {
    if (((v.x + v.y) > 16 && tile.entity.ground.type === "floweryGrass")) {
      const item=ItemGroup.spawn();
      item.physics.scale = config.gameScale;
      const tileContainer=tile.entity.container;
      item.pos.x = tile.worldPos.x;
      item.pos.y = tile.worldPos.y;
      return tileContainer.add(item.entity);
    }
  }).call(this);
  const groundStats=tile.entity.ground.stats;
  const x_=(Math.abs(Math.round((tile.x * v.x))) % (groundStats.spriteCoordMaxX - groundStats.spriteCoordMinX));
  const y_=(Math.abs(Math.round((tile.y * v.y))) % (groundStats.spriteCoordMaxY - groundStats.spriteCoordMinY));
  const coords=[ (x_ + tile.entity.ground.stats.spriteCoordMinX), (y_ + tile.entity.ground.stats.spriteCoordMinY) ];
  return tile.entity.floorSprite.selectTile(...coords);
});
game.events.on("start", ((const, generator, TileGenerator.spawn()) => {
	generator.start();
return generator.getStartingTiles(0, 0, 2).then(((initialTiles) => {
	initialTiles.tiles.each(((data) => {
	return setupTile(data);
}));
return game.events.on("tick", ((t) => {
	if( (t % 20) === 0 ){ 
  p.sprite.step()
 };
if( !(generator.busy) ){ 
  const nearestTile=tiles.getClosestFromWorldPos(p.pos.x, p.pos.y);;
  console.log("sending nearest tile", p.pos, nearestTile);
  generator.getLoadedTiles(nearestTile).then(((data) => {
  	return data.tiles.each(((tileData) => {
  	return setupTile(tileData);
  }));
  }))
 };
const directionName=getCardinalDirectionName(v);
return p.sprite.selectSequence(directionName);
})).once("error", ((err) => {
	console.log("error on", "tick", "of", "game.events", "given", "t()");
return console.log(err);
}));
}));
})).once("error", ((err) => {
	console.log("error on", "start", "of", "game.events", "given", "const generator=TileGenerator.spawn();");
return console.log(err);
}));
addEventListener("load", (() => {
	
}));
startInterface(game);