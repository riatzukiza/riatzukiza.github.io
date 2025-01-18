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
  /* nav-button eval.sibilant:18:0 */

  return html(class.span("bordered", href.a(link, text)));
});
html("\n"+"\n"+"\n"+"       <link rel='preconnect' href='https://fonts.googleapis.com'>\n"+"       <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>\n"+"       <link href='https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap' rel='stylesheet'>\n"+"".head("\n"+"* {\n"+"                                       font-family: 'Source Code Pro', serif;\n"+"                                       font-optical-sizing: auto;\n"+"                                       font-weight: 400;\n"+"                                       font-style: normal;\n"+"}\n"+"\n"+"".style(), html(`
.panel{
  float:${"left"};
  border-style:${"solid"};
  border-width:${"1px"};
}
`.style(`
.bordered{
  border-style:${"solid"};
  border-width:${"1px"};
  border-color:${"#75715e"};
}
`, `
.focus-bordered{
  border-style:${"solid"};
  border-width:${"1px"};
  border-color:${"#99947c"};
}
`, `
body{
  background-color:${"#34352f"};
}
`, `
header{
  height:${"10%"};
  color:${"#f8f8f2"};
  background-color:${"#1e1f1c"};
}
`, `
main{
  height:${"80%"};
  color:${"#f8f8f2"};
  background-color:${"#1e1f1c"};
  margin-top:${"5px"};
  margin-bottom:${"3px"};
}
`, `
footer{
  height:${"10%"};
  color:${"#f8f8f2"};
  background-color:${"brown"};
  background-color:${"#1e1f1c"};
}
`, `
a{
  color:${"#cccccc"};
}
`)), src.script("https://cdn.jsdelivr.net/quicksettings/3.0/quicksettings.min.js")), src.script("/socket.io/socket.io.js"), (function() {
  /* eval.sibilant:81:6 */

  var { 
    FileSystem
   } = require("kit-file-system"),
      Path = require("path");
  return FileSystem.load("./shared").each(((file) => {
  	
    return markup(src.script(Path.join("/bundles/shared", file.rel)));
  
  }));
}).call(this), (function() {
  /* eval.sibilant:85:6 */

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
}).call(this), id.header("header", "Welcome to the Error Log".h1(), navButton("/projects", "My Projects").nav(navButton("/prior-work", "My work for others"), navButton("/about-me", "Who am I?"), navButton("/kanban/board.html", "My kanban"), navButton("/docs", "Documentation for Lith"), navButton("/blog", "My Blog"))).body(id.main("main", "I dabble and so can you".h2().article("No one should be getting rich. Period.".section("Everyone should eat.", "It is now easier than ever to build new and unique software.", "Even grandma can do it."), "*INSERT COOL CHAT INTERFACE RUNNING ON YOUR BROWSER TO AN LLM*".section(), "This is your friend. It is free, it is private. If your computer gets hot when you use it, you know why. It's answering your questions with it.".section(), "Pretty much everything on this website will do that. Your phone/computer/tablet/toaster is a pretty powerful computer.".section(), "And this website will use it. Efficiently. Most graphics are done using low level webgl shaders. Most code heavily optimized. All of it in a language I designed myself (including the templating language I used to make this page) I call 'lith' as in a Lisp with a lisp".section())), id.footer("footer", id.section("links", href.a("https://www.linkedin.com/in/aaron-beavers-76b13aa7/", "linkedin"), href.a("https://x.com/anomalous_error", "Twitter/X"), href.a("https://bsky.app/profile/37707.bsky.social", "BlueSky"), href.a("https://github.com/riatzukiza", "github"), href.a("https://github.com/riatzukiza/riatzukiza.github.io", "Source code"), href.a("https://www.linkedin.com/in/aaron-beavers-76b13aa7/", "linkedin")), id.section("contact-info", href.a("mailto:foamy125@gmail.com")))));