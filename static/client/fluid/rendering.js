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
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
import { 
  Rendering
 } from "/shared/systems/rendering/rendering.js";
import { 
  Vertex
 } from "/shared/systems/rendering/vertex.js";
import { 
  Interface
 } from "/shared/kit/interface/index.js";
import { 
  config
 } from "./config.js";
const rendering=Rendering.load({ 
  dimensions:[ (1 * config.dimensions[0]), (1 * config.dimensions[1]) ],
  blend:true
 });
export { 
  rendering
 };
var shaders = Interface.define("shaders", { 
  vert:`#version 300 es
  in vec3 a_point;
  in vec4 a_color;
  in float a_size;

  out highp vec4 vColor;

  uniform vec2  u_Resolution;
  uniform float u_Scale;
  uniform vec3 u_Zoom;
  uniform vec3 u_Offset;

  vec4 clipspace_coordinate (vec3 xyz, float scale, vec2 res)
  {
    return (vec4((((xyz ) * u_Zoom * scale) + u_Offset
                  / vec3(res,1.0) * 1.98 - 0.99), 1.0)
            * vec4( 1.0,-1.0,1.0,1.0 ));

  }
  void main (void)
  {

    float zAxis = a_point[2];
    vec3 p = vec3(a_point);
    p.z = 1.0;

    gl_Position  = clipspace_coordinate( p, u_Scale, u_Resolution );
    // gl_PointSize = a_size + zAxis;

    gl_PointSize = (a_size + zAxis) * u_Scale;

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
var uniforms = Interface.define("uniforms", { 
  get res(  ){ 
    
      return (() => {
      	return Gl.uniform("Vector2", "Resolution", config.dimensions);
      });
    
   },
  get zoom(  ){ 
    
      return (() => {
      	return Gl.uniform("Vector3", "Zoom", [ 1, 1, rendering.zoomLevel ]);
      });
    
   },
  get offset(  ){ 
    
      return (() => {
      	return Gl.uniform("Vector3", "Offset", [ rendering.xOffset, rendering.yOffset, 0 ]);
      });
    
   },
  get scale(  ){ 
    
      return (() => {
      	return Gl.uniform("Float", "Scale", rendering.zoomLevel);
      });
    
   }
 });
var vertexLayer = (function vertexLayer$(limit) {
  /* vertex-layer eval.sibilant:25:0 */

  const context=rendering.context;
  const layer=rendering.spawn(limit, Vertex, [ uniforms.res, uniforms.scale, uniforms.zoom, uniforms.offset ], [ shaders.vert, shaders.frag ]);
  const verts=[];
  (function() {
    /* inc/loops.sibilant:26:8 */
  
    var $for = null;
    for (var i = 0;i < limit;++(i))
    {
    $for = (function() {
      /* inc/loops.sibilant:28:35 */
    
      return verts.push(layer.spawn());
    }).call(this);
    }
    ;
    return $for;
  }).call(this);
  return verts;
});
export { 
  vertexLayer
 };