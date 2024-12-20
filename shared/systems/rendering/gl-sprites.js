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
  Interface
 } = require("@kit-js/interface");
var { 
  Component,
  System
 } = require("@shared/ecs.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Gl
 } = require("@shared/gl.js");
var { 
  Andy
 } = require("@shared/gl.js");
var { 
  Renderable
 } = require("@shared/systems/rendering/renderable.js");
var setPoint = (function setPoint$(x, y, z, vert) {
  /* set-point eval.sibilant:20:0 */

  vert.point.x = x;
  vert.point.y = y;
  return vert.point.z = z;
});
var SpriteRenderable = Renderable.define("SpriteRenderable", { 
  init( layer = this.layer ){ 
    
      this.layer = layer;
      return this;
    
   },
  structure:(new Andy.Gl.Type.Composite({ 
    point:Andy.Type.Vector3,
    size:Andy.Type.float
   })),
  clear(  ){ 
    
      setPoint(0, 0, 0, this);
      return this.point.scale = 0;
    
   },
  despawn(  ){ 
    
      return this.layer.despawn(this);
    
   }
 });
exports.SpriteRenderable = SpriteRenderable;
var uniforms = Interface.define("uniforms", { 
  init( game = this.game ){ 
    
      this.game = game;
      return this;
    
   },
  get res(  ){ 
    
      return Gl.uniform("Vector2", "Resolution", this.game.config.dimensions);
    
   },
  scale:Gl.uniform("Float", "Scale", 1)
 });
var shaders = Interface.define("shaders", { 
  vert:`#version 300 es
  in vec3 a_point;
  in float a_size;

  uniform vec2  u_Resolution;
  uniform float u_Scale;

  vec4 clipspace_coordinate (vec3 xyz, float scale, vec2 res)
  {
    return (vec4(((xyz * vec3(1.0,1.0,1.0) * scale)
                  / vec3(res,1.0) * 1.98 - 0.99), 1.0)
            * vec4( 1.0,-1.0,1.0,1.0 ));

  }
  void main (void)
  {

    float zAxis = a_point[2];
    vec3 p = vec3(a_point);
    p.z = 1.0;

    gl_Position  = clipspace_coordinate( p, u_Scale, u_Resolution );
    gl_PointSize = a_size + zAxis;

    //size * z
    // so that the closer the vertex is (the larger z is), the larger the vertex will be relative to its physical size

  }
  `,
  frag:`uniform sampler2D u_spriteTexture;  // texture we are drawing

  void main() {
    gl_FragColor = texture2D(spriteTexture, gl_PointCoord);
  }
  `
 });
const demoImage=document.getElementById("sprite-texture");
var spriteLayer = (function spriteLayer$(limit, textureData, game) {
  /* sprite-layer eval.sibilant:65:0 */

  console.log(demoImage);
  const texture=gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureData);
  gl.generateMipmap(gl.TEXTURE_2D);
  uniforms.init(game);
  return game.rendering.spawn(limit, SpriteRenderable, [ uniforms.res, uniforms.scale ], [ shaders.vert, shaders.frag ]);
});
var Sprite = Component.define("Sprite", { 
  color:{
    r: 0,
    g: 0,
    b: 0,
    a: 0
  },
  get pos(  ){ 
    
      return this.entity.positionInterface;
    
   },
  get scale(  ){ 
    
      return this.entity.physicalProperties.scale;
    
   },
  get point(  ){ 
    
      return this.sprite.point;
    
   },
  register(  ){ 
    
      return (function() {
        if (!(this.sprite)) {
          return this.sprite = this.system.sprites.spawn();
        }
      }).call(this);
    
   },
  _clear(  ){ 
    
      this.point.x = 0;
      this.point.y = 0;
      this.point.z = 0;
      return this.sprite.size = 0;
    
   }
 });
exports.Sprite = Sprite;
var Sprites = System.define("Sprites", { 
  maxSprites:100000,
  register(  ){ 
    
      return this.sprites = spriteLayer(this.maxSprites, demoImage, this.game);
    
   },
  interface:Sprite,
  spawn( entity ){ 
    
      var c = System.spawn.call(this, entity);
      return c;
    
   },
  _updateComponent( dot ){ 
    
      dot.sprite.point.x = dot.pos.x;
      dot.sprite.point.y = dot.pos.y;
      dot.sprite.point.z = dot.pos.z;
      return dot.sprite.size = dot.scale;
    
   }
 });
exports.Sprites = Sprites;