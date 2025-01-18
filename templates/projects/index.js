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
var navButton = (function navButton$(link, text) {
  /* nav-button eval.sibilant:15:0 */

  return html(class.span("bordered", href.a(link, text)));
});
html("\n"+"\n"+"\n"+"       <link rel='preconnect' href='https://fonts.googleapis.com'>\n"+"       <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>\n"+"       <link href='https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap' rel='stylesheet'>\n"+"".head("\n"+"* {\n"+"                                       font-family: 'Source Code Pro', serif;\n"+"                                       font-optical-sizing: auto;\n"+"                                       font-weight: 400;\n"+"                                       font-style: normal;\n"+"}\n"+"\n"+"".style(), markup(`
${".iframe-container"}{
  height:${"calc(50% - 2px)"};
  z-index:${"2"};
  display:${"inline-block"};
  position:${"relative"};
  width:${"calc(50% - 4px)"};
  float:${"left"};
}
`.style(`
${".iframe-container iframe"}{
  width:${"calc(100% - 16px)"};
  height:${"calc(100% - 16px)"};
  overflow:${"hidden"};
  pointer-events:${"none"};
  z-index:${"-100"};
}
`, `
${".panel"}{
  float:${"left"};
  border-style:${"solid"};
  border-width:${"1px"};
}
`, `
${".bordered"}{
  border-style:${"solid"};
  border-width:${"1px"};
  border-color:${"#75715e"};
}
`, `
${".focus-bordered"}{
  border-style:${"solid"};
  border-width:${"1px"};
  border-color:${"#99947c"};
}
`, `
${"body"}{
  background-color:${"#34352f"};
}
`, `
${"header"}{
  height:${"10%"};
  color:${"#f8f8f2"};
  background-color:${"#1e1f1c"};
}
`, `
${"main"}{
  height:${"80%"};
  color:${"#f8f8f2"};
  background-color:${"#1e1f1c"};
  margin-top:${"5px"};
  margin-bottom:${"3px"};
}
`, `
${"footer"}{
  height:${"10%"};
  color:${"#f8f8f2"};
  background-color:${"brown"};
  background-color:${"#1e1f1c"};
}
`, `
${"a"}{
  color:${"#cccccc"};
}
`)), src.script("https://cdn.jsdelivr.net/quicksettings/3.0/quicksettings.min.js")), src.script("/socket.io/socket.io.js"), (function() {
  /* eval.sibilant:90:6 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./shared").each(((file) => {
  	
    return markup(src.script(Path.join("/bundles/shared", file.rel)));
  
  }));
}).call(this), (function() {
  /* eval.sibilant:94:6 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./client/obstacles").each(((file) => {
  	
    return (function() {
      if (!(Path.basename(file.path) === "main.js")) {
        return markup(src.script(Path.join("/bundles/obstacles", file.rel)));
      }
    }).call(this);
  
  }));
}).call(this), id.header("header", "Welcome to the Error Log".h1(), navButton("/projects", "My Projects").nav(navButton("/prior-work", "My work for others"), navButton("/about-me", "Who am I?"), navButton("/kanban/board.html", "My kanban"), navButton("/docs", "Documentation for Lith"), navButton("/blog", "My Blog"))).body(id.main("main", FileSystem.load("./client").find(".").then(((clientDir) => {
	
  return clientDir.map(((dir) => {
  	
    return markup(href.a(("/projects/" + Path.basename(dir.path) + ".html"), target, "_blank", class.div("iframe-container", class.iframe("project-preview", frameborder, "0", height, "100%", width, "100%", src, ("/projects/" + Path.basename(dir.path) + ".html"), id, Path.basename(dir.path)))));
  
  }));

}))), id.footer("footer", id.section("links", href.a("https://www.linkedin.com/in/aaron-beavers-76b13aa7/", "linkedin"), href.a("https://x.com/anomalous_error", "Twitter/X"), href.a("https://bsky.app/profile/37707.bsky.social", "BlueSky"), href.a("https://github.com/riatzukiza", "github"), href.a("https://github.com/riatzukiza/riatzukiza.github.io", "Source code"), href.a("https://www.linkedin.com/in/aaron-beavers-76b13aa7/", "linkedin")), id.section("contact-info", href.a("mailto:foamy125@gmail.com")))));