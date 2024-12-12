require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/systems/position.js":[function(require,module,exports){
var { 
  displayDecimal
 } = require("@obstacles/strings.js"),
    { 
  Position,
  PositionInterface
 } = require("@shared/systems/position.js");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
const views=(new Map());
var PositionInterface = PositionInterface.define("PositionInterface", { 
  get parentView(  ){ 
    
      return this.entity.propertyView.view;
    
   },
  get updateView__QUERY(  ){ 
    
      return (function() {
        if (this.entity.velocityInterface) {
          return this.entity.velocityInterface.updateView__QUERY;
        }
      }).call(this);
    
   },
  get view(  ){ 
    
      return (function() {
        if (views.has(this.entity)) {
          return views.get(this.entity);
        } else {
          var r = (function() {
            /* eval.sibilant:13:23 */
          
            return createDocumentNode("div", {
              'className': "panel",
              'style': { 
                width:"48%"
               }
            }, [ createDocumentNode("div", {  }, [ "position" ]), createDocumentNode("div", {  }, [ (() => {
            	
              return displayDecimal(this.x, 2);
            
            }), ", ", (() => {
            	
              return displayDecimal(this.y, 2);
            
            }) ]) ]).render(this.parentView);
          }).call(this);
          views.set(this.entity, r);
          return r;
        }
      }).call(this);
    
   }
 });
var Position = Position.define("Position", { 
  interface:PositionInterface
 });
exports.Position = Position;
exports.PositionInterface = PositionInterface;
},{"@obstacles/strings.js":"@obstacles/strings.js","@shared/dom.js":"@shared/dom.js","@shared/systems/position.js":"@shared/systems/position.js"}]},{},[]);
