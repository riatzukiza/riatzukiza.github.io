require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"@obstacles/events/simple-collision.js":[function(require,module,exports){
var { 
  Velocity
 } = require("@shared/systems/velocity.js");
var { 
  Position
 } = require("@shared/systems/position.js");
var { 
  game
 } = require("@obstacles/game.js"),
    { 
  createParticleUpdater
 } = require("@shared/field.js"),
    { 
  plants,
  ants,
  rocks
 } = require("@obstacles/entities.js"),
    { 
  Physics
 } = require("@shared/systems/physics/system.js"),
    { 
  Vector
 } = require("@shared/vectors.js");
game.events.on("simpleCollision", ((c, c_) => {
	
  var v = game.systems.get(Velocity, c.entity);
  var v_ = game.systems.get(Velocity, c_.entity);
  var p = game.systems.get(Physics, c.entity);
  var p_ = game.systems.get(Physics, c_.entity);
  var m = p.mass;
  var m_ = p_.mass;
  const pos=v.pos;
  const pos_=v_.pos;
  const vector1=Vector.spawn(v.xd, v.yd);
  const vector2=Vector.spawn(v_.xd, v_.yd);
  const theta=Math.atan2((vector1.y - vector2.y), (vector1.x - vector2.x));
  const v1=vector1.rotateTo((theta));
  const v2=vector2.rotateTo((theta));
  const u1=Vector.spawn((((v1.x * (m - m_)) / (m + m_)) + (v2.x * 2 * (m_ / (m + m_)))), v1.y).rotateTo(theta);
  const u2=Vector.spawn((((v2.x * (m_ - m)) / (m_ + m)) + (v1.x * 2 * (m / (m_ + m)))), v2.y).rotateTo(theta);
  v.xd = u1.x;
  v.yd = u1.y;
  v_.xd = u2.x;
  v_.yd = u2.y;
  v1.despawn();
  v2.despawn();
  u1.despawn();
  u2.despawn();
  return null;

})).once("error", ((err) => {
	
  console.log("error on", "simpleCollision", "of", "game.events", "given", "c(c_)");
  return console.log(err);

}));
},{"@obstacles/entities.js":"@obstacles/entities.js","@obstacles/game.js":"@obstacles/game.js","@shared/field.js":"@shared/field.js","@shared/systems/physics/system.js":"@shared/systems/physics/system.js","@shared/systems/position.js":"@shared/systems/position.js","@shared/systems/velocity.js":"@shared/systems/velocity.js","@shared/vectors.js":"@shared/vectors.js"}]},{},[]);
