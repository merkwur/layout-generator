precision mediump float;
uniform vec2 resolution;

varying vec2 vUv;

void main() {
    float aspectRatio = resolution.x / resolution.y;
    vec2 p = vec2(vUv.x, vUv.y * aspectRatio);
    gl_FragColor = vec4(p.x, p.y, .5 , 1.0);
}

