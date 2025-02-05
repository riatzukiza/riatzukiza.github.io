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

  return create(HtmlElement)("html", {  }, [ create(HtmlElement)("span", { 'class': "bordered" }, [ create(HtmlElement)("a", { 'href': link }, [ text ]) ]) ]);
});
create(HtmlElement)("html", {  }, [ create(HtmlElement)("head", {  }, [ "\n"+"\n"+"\n"+"       <link rel='preconnect' href='https://fonts.googleapis.com'>\n"+"       <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>\n"+"       <link href='https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap' rel='stylesheet'>\n"+"", create(HtmlElement)("style", {  }, [ "\n"+"* {\n"+"                                       font-family: 'Source Code Pro', serif;\n"+"                                       font-optical-sizing: auto;\n"+"                                       font-weight: 400;\n"+"                                       font-style: normal;\n"+"}\n"+"\n"+"" ]), create(HtmlElement)("html", {  }, [ create(HtmlElement)("style", {  }, [ `
.panel{
  float:${"left"};
  border-style:${"solid"};
  border-width:${"1px"};
}
`, `
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
` ]) ]), create(HtmlElement)("script", { 'src': "https://cdn.jsdelivr.net/quicksettings/3.0/quicksettings.min.js" }, []) ]), create(HtmlElement)("script", { 'src': "/socket.io/socket.io.js" }, []), create(HtmlElement)("body", {  }, [ create(HtmlElement)("header", { 'id': "header" }, [ create(HtmlElement)("h1", {  }, [ "Welcome to the Error Log" ]), create(HtmlElement)("nav", {  }, [ navButton("/projects", "My Projects"), navButton("/prior-work", "My work for others"), navButton("/about-me", "Who am I?"), navButton("/kanban/board.html", "My kanban"), navButton("/docs", "Documentation for Lith"), navButton("/blog", "My Blog") ]) ]), create(HtmlElement)("main", { 'id': "main" }, [ create(HtmlElement)("article", {  }, [ create(HtmlElement)("h2", {  }, [ "I dabble and so can you" ]), create(HtmlElement)("section", {  }, [ "No one should be getting rich. Period.", "Everyone should eat.", "It is now easier than ever to build new and unique software.", "Even grandma can do it." ]), create(HtmlElement)("section", {  }, [ "*INSERT COOL CHAT INTERFACE RUNNING ON YOUR BROWSER TO AN LLM*" ]), create(HtmlElement)("section", {  }, [ "This is your friend. It is free, it is private. If your computer gets hot when you use it, you know why. It's answering your questions with it." ]), create(HtmlElement)("section", {  }, [ "Pretty much everything on this website will do that. Your phone/computer/tablet/toaster is a pretty powerful computer." ]), create(HtmlElement)("section", {  }, [ "And this website will use it. Efficiently. Most graphics are done using low level webgl shaders. Most code heavily optimized. All of it in a language I designed myself (including the templating language I used to make this page) I call 'lith' as in a Lisp with a lisp" ]) ]) ]), create(HtmlElement)("footer", { 'id': "footer" }, [ create(HtmlElement)("section", { 'id': "links" }, [ create(HtmlElement)("a", { 'href': "https://www.linkedin.com/in/aaron-beavers-76b13aa7/" }, [ "linkedin" ]), create(HtmlElement)("a", { 'href': "https://x.com/anomalous_error" }, [ "Twitter/X" ]), create(HtmlElement)("a", { 'href': "https://bsky.app/profile/37707.bsky.social" }, [ "BlueSky" ]), create(HtmlElement)("a", { 'href': "https://github.com/riatzukiza" }, [ "github" ]), create(HtmlElement)("a", { 'href': "https://github.com/riatzukiza/riatzukiza.github.io" }, [ "Source code" ]), create(HtmlElement)("a", { 'href': "https://www.linkedin.com/in/aaron-beavers-76b13aa7/" }, [ "linkedin" ]) ]), create(HtmlElement)("section", { 'id': "contact-info" }, [ create(HtmlElement)("a", { 'href': "mailto:foamy125@gmail.com" }, []) ]) ]) ]) ]);