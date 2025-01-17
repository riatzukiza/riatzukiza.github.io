require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/world-gen/worker.js":[function(require,module,exports){
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1123 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1185 */

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
  "          if (!(self.loader)) {\n" +
  "            importScripts.apply(this, m.data.scripts);\n" +
  "            require(\"@crash-landed/hack.js\");\n" +
  "            var { \n" +
  "              TileLoader\n" +
  "             } = require(\"@crash-landed/world-gen/tile-loader.js\"),\n" +
  "                modules = require(\"@crash-landed/world-gen/modules.js\");\n" +
  "            self.loader = TileLoader.spawn();\n" +
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
  "        return loader.emit(m.data.type, m.data);\n" +
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
  getNear( x,y ){ 
    
   }
 });
exports.TileGenerator = TileGenerator;
},{"@shared/worker.js":"@shared/worker.js"}]},{},[]);
