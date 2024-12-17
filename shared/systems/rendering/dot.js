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
  Vertex
 } = require("@shared/systems/rendering/vertex.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Gl
 } = require("@shared/gl.js");
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
  in vec4 a_color;
  in float a_size;

  out highp vec4 vColor;

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

    vColor       = a_color;

  }
  `,
  frag:`#version 300 es
  precision mediump float;

  in  vec4 vColor;
  out vec4 FragColor;

  void main(void) {FragColor = vColor;}
  `
 });
var vertexLayer = (function vertexLayer$(limit, game) {
  /* vertex-layer eval.sibilant:1:939 */

  uniforms.init(game);
  return game.rendering.spawn(limit, Vertex, [ uniforms.res, uniforms.scale ], [ shaders.vert, shaders.frag ]);
});
var DotInterface = Component.define("DotInterface", { 
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
    
      return this.vertex.point;
    
   },
  register(  ){ 
    
      return (function() {
        if (!(this.vertex)) {
          return this.vertex = this.system.verts.spawn();
        }
      }).call(this);
    
   },
  _clear(  ){ 
    
      this.point.x = 0;
      this.point.y = 0;
      this.point.z = 0;
      this.vertex.size = 0;
      this.vertex.color.r = 0;
      this.vertex.color.g = 0;
      this.vertex.color.b = 0;
      return this.vertex.color.a = 0;
    
   }
 });
exports.DotInterface = DotInterface;
var Dot = System.define("Dot", { 
  maxVerts:100000,
  register(  ){ 
    
      return this.verts = vertexLayer(this.maxVerts, this.game);
    
   },
  interface:DotInterface,
  spawn( entity ){ 
    
      var c = System.spawn.call(this, entity);
      return c;
    
   },
  _updateComponent( dot ){ 
    
      dot.vertex.point.x = dot.pos.x;
      dot.vertex.point.y = dot.pos.y;
      dot.vertex.point.z = dot.pos.z;
      dot.vertex.size = dot.scale;
      dot.vertex.color.r = dot.color.r;
      dot.vertex.color.g = dot.color.g;
      dot.vertex.color.b = dot.color.b;
      return dot.vertex.color.a = dot.color.a;
    
   }
 });
exports.Dot = Dot;