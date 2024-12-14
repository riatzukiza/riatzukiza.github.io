require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@shared/data-structures/spawnable.js":[function(require,module,exports){
var Spawnable = Interface.define("Spawnable", { 
  build(  ){ 
    
      return this.pool = [];
    
   },
  spawn( args ){ 
    
      return (function() {
        if (this.pool.length) {
          return this.pool.pop().init(args);
        } else {
          return create(this).apply(this, args);
        }
      }).call(this);
    
   },
  clear(  ){ 
    
      throw (new Error("No clear function defined for spawnable datatype"))
    
   },
  despawn(  ){ 
    
      this.clear();
      return this.pool.push(this);
    
   }
 });
exports.Spawnable = Spawnable;
},{}]},{},[]);
