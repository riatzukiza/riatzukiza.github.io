require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@crash-landed/systems/visibility.js":[function(require,module,exports){
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
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  List
 } = require("@shared/data-structures/list.js");
var VisibleStatus = Component.define("VisibleStatus", { 
  _visible__QUERY:false,
  _explored__QUERY:false,
  get visible__QUERY(  ){ 
    
      return this._visible__QUERY;
    
   },
  get explored__QUERY(  ){ 
    
      return this._explored__QUERY;
    
   },
  set visible__QUERY( v ){ 
    
      this._visible__QUERY = v;
      this.sprite.redraw();
      return this.entity.container.objects.each(((o) => {
      	
        return o.entity.components.each(((c) => {
        	
          return (function() {
            if (c.redraw) {
              return c.redraw();
            }
          }).call(this);
        
        }));
      
      }));
    
   },
  set explored__QUERY( e ){ 
    
      this._explored__QUERY = e;
      this.sprite.redraw();
      return this.entity.container.objects.each(((o) => {
      	
        return o.entity.components.each(((c) => {
        	
          return (function() {
            if (c.redraw) {
              return c.redraw();
            }
          }).call(this);
        
        }));
      
      }));
    
   },
  get sprite(  ){ 
    
      return this.entity.floorSprite;
    
   }
 });
var TileVisibility = System.define("TileVisibility", { 
  interface:VisibleStatus,
  _updateAll(  ){ 
    
   },
  _updateComponent( c ){ 
    
   }
 });
exports.TileVisibility = TileVisibility;
},{"@shared/data-structures/list.js":"@shared/data-structures/list.js","@shared/ecs.js":"@shared/ecs.js"}]},{},[]);
