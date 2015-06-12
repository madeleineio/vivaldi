/**
 * Set the colour to a lovely pink.
 * Note that the color is a 4D Float
 * Vector, R,G,B and A and each part
 * runs from 0.0 to 1.0
 */

uniform vec4 u_Color;

void main() {
  gl_FragColor = u_Color;
}