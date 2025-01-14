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
create(HtmlElement)("html", {  }, [ create(HtmlElement)("head", {  }, [ create(HtmlElement)("style", {  }, [ "\n"+"        .panel {\n"+"            float: left;\n"+"            border-style: solid;\n"+"            border-width: 1px;\n"+"        }\n"+"        .bordered {\n"+"            border-style: solid;\n"+"            border-width: 1px;\n"+"        }\n"+"img {\n"+"position:absolute;\n"+"}\n"+"\n"+"" ]) ]), create(HtmlElement)("script", { 'src': "/socket.io/socket.io.js" }, []), (function() {
  /* eval.sibilant:22:6 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./shared").each(((file) => {
  	
    return create(HtmlElement)("script", { 'src': Path.join("/bundles/shared", file.rel) }, []);
  
  }));
}).call(this), (function() {
  /* eval.sibilant:26:6 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./client/crash-landed").each(((file) => {
  	
    return (function() {
      if (!(Path.basename(file.path) === "main.js")) {
        return create(HtmlElement)("script", { 'src': Path.join("/bundles/crash-landed", file.rel) }, []);
      }
    }).call(this);
  
  }));
}).call(this), create(HtmlElement)("body", {  }, [ create(HtmlElement)("img", {
  'id': "player-sprite",
  'src': "/sprites/Small-8-Direction-Characters_by_AxulArt/8-way-128-72.png",
  'hidden': "true"
}, []), create(HtmlElement)("img", {
  'id': "grass-sprite",
  'src': "/sprites/Pixel_art_top_down_basic_v1.1.2/TX_Tileset_Grass.png",
  'hidden': "true"
}, []), create(HtmlElement)("img", {
  'id': "cliff-sprite",
  'src': "/sprites/Pixel_art_top_down_basic_v1.1.2/TX_Tileset_Wall.png",
  'hidden': "true"
}, []), create(HtmlElement)("img", {
  'id': "props-sprite",
  'src': "/sprites/Cute_Fantasy_Free/Outdoor_decoration/Outdoor_Decor_Free.png",
  'hidden': "true"
}, []) ]), create(HtmlElement)("script", { 'src': "/bundles/crash-landed/main.js" }, []) ]);