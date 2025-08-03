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
import { 
  Game
 } from "@shared/game.js";
import { 
  Physics
 } from "@shared/systems/physics.js";
import { 
  PlayerSprites
 } from "@crash-landed/systems/sprites/player.js";
import { 
  PropsSprites
 } from "@crash-landed/systems/sprites/basic-props.js";
import { 
  Velocity
 } from "@shared/systems/velocity.js";
import { 
  Sight
 } from "@crash-landed/systems/sight.js";
import { 
  GroundTypes
 } from "@crash-landed/systems/floor-type.js";
import { 
  TileVisibility
 } from "@crash-landed/systems/visibility.js";
import { 
  PathFinding
 } from "@crash-landed/systems/path-finding.js";
import { 
  Metabolisim
 } from "@crash-landed/systems/metabolisim.js";
import { 
  Containers
 } from "@crash-landed/systems/containers.js";
import { 
  MentalState
 } from "@crash-landed/systems/mental-state.js";
import { 
  Item
 } from "@crash-landed/systems/item.js";
import { 
  config
 } from "@crash-landed/config.js";
import { 
  FloorSprites
 } from "@crash-landed/systems/sprites/floor.js";
import { 
  CliffSprites
 } from "@crash-landed/systems/sprites/cliff.js";
import { 
  Position
 } from "@shared/systems/position.js";
import { 
  setupTile
 } from "@crash-landed/world-gen/setup-tile.js";
import { 
  TileGraph
 } from "@shared/tiles.js";
import { 
  getCardinalDirectionName
 } from "@crash-landed/directions.js";
import { 
  UnitGroup
 } from "@shared/units.js";
import { 
  Player
 } from "@crash-landed/units.js";
var activeGameSystems = [ Position, Physics, Velocity, TileVisibility, Sight, FloorSprites, CliffSprites, PlayerSprites, PropsSprites, GroundTypes, PathFinding, Metabolisim, Containers, MentalState, Item ];
var game = null;
import { 
  TileGenerator
 } from "@crash-landed/world-gen/worker.js";
const generator=TileGenerator.spawn();
var player = null;
var p = player;
var v = null;
const gameScale=config.gameScale;
generator.start();
Game.events.on("start", (() => {
	player = Player.spawn();
p = player;
v = p.velocity.vector;
player.pos.x = 0;
player.pos.y = 0;
p.physics.scale = config.gameScale;
p.physics.forces = [];
return p.sprite.selectSequence("east");
})).once("error", ((err) => {
	console.log("error on", "start", "of", "Game.events", "given", "null");
return console.log(err);
}));
Game.events.on("load", ((saveName) => {
	return generator.load(saveName);
})).once("error", ((err) => {
	console.log("error on", "load", "of", "Game.events", "given", "saveName()");
return console.log(err);
}));
Game.events.on("save", ((saveName) => {
	return generator.save(saveName);
})).once("error", ((err) => {
	console.log("error on", "save", "of", "Game.events", "given", "saveName()");
return console.log(err);
}));
Game.events.on("tick", ((t) => {
	if( (t % 20) === 0 ){ 
  p.sprite.step()
 };
if( !(generator.busy) ){ 
  const nearestTile=game.tiles.getClosestFromWorldPos(p.pos.x, p.pos.y);;
  console.log("sending nearest tile", p.pos, nearestTile);
  generator.getLoadedTiles(nearestTile).then(((data) => {
  	return data.tiles.each(((tileData) => {
  	return setupTile(tileData, game.tiles);
  }));
  }))
 };
const directionName=getCardinalDirectionName(v);
return p.sprite.selectSequence(directionName);
})).once("error", ((err) => {
	console.log("error on", "tick", "of", "Game.events", "given", "t()");
return console.log(err);
}));
const tileSystems=[ FloorSprites, TileVisibility, GroundTypes, Containers ];
async function startGame(){

  if( !(game) ){ 
    game = create(Game)(config, activeGameSystems, config.gameSpeed);;
    const tiles=TileGraph.spawn(gameScale, tileSystems, game);;
    game.tiles = tiles;;
    UnitGroup.game = game;;
    const initialTiles=await generator.getStartingTiles(0, 0, 2);;
    initialTiles.tiles.each(((data) => {
    	return setupTile(data, tiles);
    }))
   };
  PathFinding.tiles = game.tiles;
  Sight.registerTileGraph(game.tiles);
  return game.start();

};
async function saveGame(saveName){

  await game.save(saveName);
  return game.events.emit("save", saveName);

};
async function loadGame(saveName){

  game = await Game.load(saveName);
  return game.events.emit("load", "saveName");

};
var getGame = (function getGame$() {
  /* get-game eval.sibilant:123:0 */

  return game;
});
export { 
  getGame
 };
export { 
  activeGameSystems
 };
export { 
  startGame
 };
export { 
  loadGame
 };
export { 
  saveGame
 };