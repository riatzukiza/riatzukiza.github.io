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
  EntitySystem
 } from "./ecs.js";
import { 
  EventEmitter
 } from "./kit/events/index.js";
import { 
  Ticker
 } from "./ticker.js";
import { 
  OrderedMap
 } from "./data-structures/maps/ordered.js";
import { 
  Interface
 } from "./kit/interface/index.js";
var Game = Interface.define("Game", { 
  init( config = this.config,rendering = this.rendering,systemTypes = [],gameSpeed = 1,units = [],entityGroups = [],entities = create(EntitySystem)(this),events = create(EventEmitter)(),ticker = create(Ticker)((gameSpeed * 60), events),systems = create(OrderedMap)() ){ 
    
      this.config = config;this.rendering = rendering;this.systemTypes = systemTypes;this.gameSpeed = gameSpeed;this.units = units;this.entityGroups = entityGroups;this.entities = entities;this.events = events;this.ticker = ticker;this.systems = systems;
      var getSystemBySymbol = systems.get,
          setSystemBySymbol = systems.set;
      systems.getBySymbol = getSystemBySymbol;
      systems.get = (function systems$get$(proto, ent) {
        /* systems.get eval.sibilant:1:1213 */
      
        var sys = getSystemBySymbol.call(systems, proto.symbol);
        return (function() {
          if (ent) {
            return sys.get(ent);
          } else {
            return sys;
          }
        }).call(this);
      });
      systemTypes.each(((s) => {
      	return systems.push([ s.symbol, create(s)(this) ]);
      }));
      this.systems.push([ rendering.symbol, rendering ]);
      return this;
    
   },
  get ent(  ){ 
    
      return this.entities;
    
   },
  get game(  ){ 
    
      return this;
    
   },
  get process(  ){ 
    
      return this;
    
   },
  add( s = this.s,systems = this.systems,game = this.game ){ 
    
      return systems.push([ s.symbol, create(s)(this) ]);
    
   },
  save( saveName = this.saveName,systems = this.systems,rendering = this.rendering,entities = this.entities,units = this.units ){ 
    
      entities.save();
      units.save();
      return systems.each(((system) => {
      	return if( systems !== rendering ){ 
        system.save(saveName)
       };
      }));
    
   },
  load( saveName = this.saveName ){ 
    
      return systems.each(((system) => {
      	return if( systems !== rendering ){ 
        system.load(saveName)
       };
      }));
    
   },
  start( systems = this.systems,events = this.events,ticker = this.ticker,rendering = this.rendering ){ 
    
      this.stop();
      ticker.start();
      return events.on("tick", ((t) => {
      	return systems.each((function() {
        /* eval.sibilant:1:2200 */
      
        return arguments[0].update();
      }));
      })).once("error", ((err) => {
      	console.log("error on", "tick", "of", "events", "given", "t()");
      return console.log(err);
      }));
    
   },
  stop( ticker = this.ticker,events = this.events ){ 
    
      ticker.stop();
      return events.removeAllListeners("tick");
    
   },
  clear( systems = this.systems,entities = this.entities,events = this.events,ticker = this.ticker ){ 
    
      ticker.stop();
      entities.clear();
      events.removeAllListeners();
      return systems.each((function() {
        /* eval.sibilant:1:2479 */
      
        return arguments[0].clear();
      }));
    
   }
 });
export { 
  Game
 };