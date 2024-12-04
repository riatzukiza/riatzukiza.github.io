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
  plants,
  ants,
  rocks
 } = require("@obstacles/entities.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    config = require("@obstacles/config.js");
game.events.on("staticObjectCollision", ((o1, o2) => {
	
  var v = game.systems.get(Velocity, o1.entity);
  var v_ = game.systems.get(Velocity, o2.entity);
  const phys1=o1.physics;
  const phys2=o2.physics;
  const pos=v.pos;
  const pos_=v_.pos;
  const p1=Vector.spawn(pos.x, pos.y);
  const p2=Vector.spawn(pos_.x, pos_.y);
  const v1=Vector.spawn(v.xd, v.yd);
  const dv1=(phys1.volume - phys1.priorVolume);
  const dm1=(phys1.mass - phys1.priorScale);
  const gr1=(dv1 * dm1);
  v1.setLength((v1.getLength() + gr1));
  const v2=Vector.spawn(v_.xd, v_.yd);
  const dv2=(phys2.volume - phys2.priorVolume);
  const dm2=(phys2.mass - phys2.priorScale);
  const gr2=(dv2 * dm2);
  v2.setLength((v2.getLength() + gr2));
  const r=v1.distanceTo(v2);
  const s=r.getLength();
  const d=p1.distanceTo(p2);
  const dl=d.getLength();
  d.setLength((Math.max(s, 0.01) / dl));
  (function() {
    if (s > 0) {
      return d.setAngle(r.getAngle());
    }
  }).call(this);
  const a1=[ (d.x * ((o2.physics.scale + o1.physics.mass) / (o1.physics.scale + o1.physics.mass)) * (o1.physics.scale + o1.physics.mass)), (d.y * ((o2.physics.scale + o1.physics.mass) / (o1.physics.scale + o1.physics.mass)) * (o1.physics.scale + o1.physics.mass)) ];
  const a2=[ (-1 * d.x * ((o1.physics.scale + o1.physics.mass) / (o2.physics.scale + o1.physics.mass)) * (o2.physics.scale + o2.physics.mass)), (-1 * d.y * ((o1.physics.scale + o1.physics.mass) / (o2.physics.scale + o1.physics.mass)) * (o2.physics.scale + o2.physics.mass)) ];
  v.accelerate(a1);
  v_.accelerate(a2);
  p1.despawn();
  p2.despawn();
  v1.despawn();
  v2.despawn();
  d.despawn();
  return r.despawn();

})).once("error", ((err) => {
	
  console.log("error on", "staticObjectCollision", "of", "game.events", "given", "o1(o2)");
  return console.log(err);

}));