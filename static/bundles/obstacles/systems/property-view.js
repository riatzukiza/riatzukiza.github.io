require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/systems/property-view.js":[function(require,module,exports){
var { 
  Component,
  System
 } = require("@shared/ecs.js");
var { 
  renderChildren,
  createDocumentNode,
  DocumentNode,
  DocumentBody,
  DocumentHead,
  DocumentRoot
 } = require("@shared/dom.js");
var displayDecimal = (function displayDecimal$(d = this.d, n = 6) {
  /* display-decimal node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (Math.round((Math.pow(10, n) * d)) / Math.pow(10, n));
});
const views=(new Map());
var PropertyView = Component.define("PropertyView", { 
  register(  ){ 
    
   },
  get parentView(  ){ 
    
      return this.system.view;
    
   },
  get view(  ){ 
    
      return (function() {
        if (views.has(this.entity)) {
          return views.get(this.entity);
        } else {
          return (function(value) {
            /* node_modules/kit/inc/scope.sibilant:12:9 */
          
            views.set(this.entity, value);
            return value;
          })((function() {
            /* node_modules/kit/inc/macros.sibilant:30:25 */
          
            return createDocumentNode("div", {
              'id': ("entity-panel" + this.entity.id),
              'className': "panel",
              'style': { 
                width:"99%"
               }
            }, [ createDocumentNode("div", {  }, [ "entity", this.entity.id ]) ]).render(this.parentView);
          }).call(this));
        }
      }).call(this);
    
   }
 });
var ViewPanel = System.define("ViewPanel", { 
  interface:PropertyView,
  pageSize:10,
  page:0,
  cursor:0,
  get pages(  ){ 
    
      return (this.components.length / this.pageSize);
    
   },
  get parentView(  ){ 
    
      return require("@obstacles/dom.js").debugView;
    
   },
  get view(  ){ 
    
      return (function() {
        if (views.has(this)) {
          return views.get(this);
        } else {
          return (function(value) {
            /* node_modules/kit/inc/scope.sibilant:12:9 */
          
            views.set(this, value);
            return value;
          })((function() {
            /* node_modules/kit/inc/macros.sibilant:30:25 */
          
            return createDocumentNode("div", {
              'id': "view-panel-top",
              'className': "panel"
            }, [ createDocumentNode("h4", {  }, [ "Entities" ]), createDocumentNode("button", { 'onclick': (() => {
            	
              return (function() {
                if (this.page > 0) {
                  return ((this.page)--);
                }
              }).call(this);
            
            }) }, [ "prev" ]), createDocumentNode("button", { 'onclick': (() => {
            	
              return (function() {
                if (this.page < this.pages) {
                  return ((this.page)++);
                }
              }).call(this);
            
            }) }, [ "next" ]) ]).render(this.parentView);
          }).call(this));
        }
      }).call(this);
    
   },
  _prepare(  ){ 
    
      return this.cursor = 0;
    
   },
  _updateComponent( c,t ){ 
    
      return (function() {
        if ((this.game.ticker.ticks % 10) === 0) {
          c.view.remove();
          (function() {
            if (Math.floor((this.cursor / this.pageSize)) === this.page) {
              c.entity.aspects.each(((a) => {
              	
                const c_=c.entity[a.interface.name];
                return (function() {
                  if (c_.updateView__QUERY) {
                    return c.view.append(c_.view);
                  }
                }).call(this);
              
              }));
              return c.view.render(this.view);
            }
          }).call(this);
          return ((this.cursor)++);
        }
      }).call(this);
    
   }
 });
exports.ViewPanel = ViewPanel;
exports.PropertyView = PropertyView;
},{"@obstacles/dom.js":"@obstacles/dom.js","@shared/dom.js":"@shared/dom.js","@shared/ecs.js":"@shared/ecs.js"}]},{},[]);
