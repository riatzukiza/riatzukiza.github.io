uniform sampler2D u_spriteTexture;  // texture we are drawing

void main() {
  gl_FragColor = texture2D(spriteTexture, gl_PointCoord);
}
