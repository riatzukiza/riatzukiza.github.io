var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
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
var { 
  Thread
 } = require("@shared/worker.js");
var TileGenerator = Thread.define("TileGenerator", { 
  code:"(() => {\n" +
  "	\n" +
  "  self.onmessage = (function self$onmessage$(m) {\n" +
  "    /* self.onmessage eval.sibilant:7:11 */\n" +
  "  \n" +
  "    return (function() {\n" +
  "      if (m.data.type === \"load\") {\n" +
  "        return (function() {\n" +
  "          if (!(self.tileGrid)) {\n" +
  "            importScripts.apply(this, m.data.scripts);\n" +
  "            require(\"@crash-landed/hack.js\");\n" +
  "            var { \n" +
  "              TileGrid\n" +
  "             } = require(\"@crash-landed/world-gen/tile-grid.js\"),\n" +
  "                modules = require(\"@crash-landed/world-gen/modules.js\");\n" +
  "            self.tileGrid = TileGrid.spawn();\n" +
  "            require(\"@crash-landed/world-gen/events.js\");\n" +
  "            return self.postMessage({ \n" +
  "              type:\"done\",\n" +
  "              message:\"done loading\"\n" +
  "             });\n" +
  "          } else {\n" +
  "            throw (new Error(\"Trying to load after loading.\"))\n" +
  "          }\n" +
  "        }).call(this);\n" +
  "      } else {\n" +
  "        return tileGrid.events.emit(m.data.type, m.data);\n" +
  "      }\n" +
  "    }).call(this);\n" +
  "  });\n" +
  "  return self.onmessage;\n" +
  "\n" +
  "})()",
  load(  ){ 
    
      return this.send({ 
        type:"load",
        scripts:window._workerScripts
       });
    
   },
  getTile( x,y ){ 
    
      return this.send({ 
        type:"tile",
        x,
        y
       });
    
   },
  getTiles( tiles ){ 
    
      return this.send({ 
        type:"tiles",
        tiles
       });
    
   },
  getLoadedTiles( playerTile ){ 
    
      console.log(playerTile);
      return this.send({ 
        type:"getLoadedTiles",
        x:playerTile.x,
        y:playerTile.y
       });
    
   },
  getStartingTiles( x,y,n ){ 
    
      return this.send({ 
        type:"getStartingTiles",
        x,
        y,
        n
       });
    
   },
  getNear( x = this.x,y = this.y,n = 3 ){ 
    
      return this.send({ 
        type:"chunksNear",
        x,
        y,
        n
       });
    
   }
 });
exports.TileGenerator = TileGenerator;