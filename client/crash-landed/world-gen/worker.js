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
  Thread
 } = require("@shared/worker.js");
var TileGenerator = Thread.define("TileGenerator", { 
  code:"(() => {\n" +
  "	\n" +
  "  var loader = null;\n" +
  "  self.onmessage = (function self$onmessage$(m) {\n" +
  "    /* self.onmessage eval.sibilant:8:11 */\n" +
  "  \n" +
  "    return (function() {\n" +
  "      if (m.data.type === \"load\") {\n" +
  "        importScripts.apply(this, m.data.scripts);\n" +
  "        require(\"@crash-landed/hack.js\");\n" +
  "        var { \n" +
  "          TileLoader\n" +
  "         } = require(\"@crash-landed/world-gen/tile-loader.js\"),\n" +
  "            modules = require(\"@crash-landed/world-gen/modules.js\");\n" +
  "        loader = TileLoader.spawn();\n" +
  "        return self.postMessage({ \n" +
  "          type:\"done\",\n" +
  "          message:\"done loading\"\n" +
  "         });\n" +
  "      } else if (m.data.type === \"tile\") {\n" +
  "        var { \n" +
  "          SuperPosition\n" +
  "         } = require(\"@crash-landed/world-gen/super-position.js\");\n" +
  "        const tile=loader.get(m.data.x, m.data.y);\n" +
  "        const s=SuperPosition.spawn(tile);\n" +
  "        s.collapse();\n" +
  "        s.despawn();\n" +
  "        return self.postMessage({ \n" +
  "          type:\"collapsedTile\",\n" +
  "          tile:tile.data\n" +
  "         });\n" +
  "      } else if (m.data.type === \"tiles\") {\n" +
  "        var { \n" +
  "          SuperPosition\n" +
  "         } = require(\"@crash-landed/world-gen/super-position.js\");\n" +
  "        return self.postMessage({ \n" +
  "          type:\"collapsedTiles\",\n" +
  "          tiles:m.data.tiles.map(((t) => {\n" +
  "          	\n" +
  "            const tile=loader.get(t.x, t.y);\n" +
  "            const s=SuperPosition.spawn(tile);\n" +
  "            s.collapse();\n" +
  "            s.despawn();\n" +
  "            return tile.data;\n" +
  "          \n" +
  "          }))\n" +
  "         });\n" +
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
    
   }
 });
exports.TileGenerator = TileGenerator;