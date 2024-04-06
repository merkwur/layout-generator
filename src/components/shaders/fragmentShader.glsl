precision mediump float;
uniform vec2 resolution;
uniform float pointsX[4];
uniform float pointsY[4];

varying vec2 vUv;
void main() {
float aspectRatio = resolution.x / resolution.y;
vec2 p = vec2(vUv.x, vUv.y * aspectRatio);
float minDist = 1.0; // Start with a large distance
vec3 color = vec3(0.0); // Default color
int closestIndex = -1; // To keep track of the closest point index


for(int i = 0; i < 5; i++) {
    vec2 point = vec2(pointsX[i], pointsY[i]*aspectRatio);
    float dist = distance(p, point);
    if (dist < minDist) {
        minDist = dist;
        closestIndex = i;
    }
}

// Assuming closestIndex found
if (closestIndex != -1) {
    vec2 closestPoint = vec2(pointsX[closestIndex], pointsY[closestIndex]);
    
    float r = 1.;
    float g = 0.2588;
    float b = 0.2588;
    color = vec3(r, g, b);
}

float intensity = pow((1.0 - minDist), 4.2); 
gl_FragColor = vec4(vec3(color.x, color.y, color.z) * intensity, 1.0);
}