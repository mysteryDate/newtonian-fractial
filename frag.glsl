precision mediump float;
const int MAX_STEPS = 5;

vec2 compMul(vec2 a, vec2 b) {
  return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

vec2 compAdd(vec2 a, vec2 b) {
  return vec2(a.x + b.x, a.y + b.y);
}

vec2 compPower(vec2 a, int n) {
  vec2 result = vec2(1, 1);
  for (int i = 1; i < 10; i++) {
    if (i > n) break;
    result = compMul(result, a);
  }
  return result;
}

vec2 compDivide(vec2 a, vec2 b) {
  vec2 result;
  result.x = (a.x * b.x + a.y * b.y) / (b.x * b.x + b.y * b.y);
  result.y = (a.y * b.x - a.x * b.y) / (b.x * b.x + b.y * b.y);
  return result;
}

vec2 compInv(vec2 a) {
  return compMul(a, vec2(-1, 0));
}

float compLengthSq(vec2 a) {
  return a.x * a.x + a.y * a.y;
}

vec2 compValueAt(vec2 coefficients[4], vec2 x) {
  vec2 result = vec2(0.0);
  for(int i = 0; i < 4; ++i) {
    result = compAdd(result,
      compMul(coefficients[i], compPower(x, i)));
  }
  return result;
}

vec2 compValueAt(vec2 coefficients[5], vec2 x) {
  vec2 result = vec2(0.0);
  for(int i = 0; i < 5; ++i) {
    result = compAdd(result,
      compMul(coefficients[i], compPower(x, i)));
  }
  return result;
}

vec2 newtonStep(vec2 coefficients[5], vec2 derivativeCoefficients[4], vec2 guess) {
  vec2 px = compValueAt(coefficients, guess);
  vec2 pprimex = compValueAt(derivativeCoefficients, guess);
  return compAdd(guess, compInv(compDivide(px, pprimex)));
}

vec2 findZero(vec2 coefficients[5], vec2 derivativeCoefficients[4], vec2 start) {
  vec2 value = compValueAt(coefficients, start);
  vec2 guess = start;
  for(int i = 0; i < MAX_STEPS; ++i) {
    vec2 new_guess = newtonStep(coefficients, derivativeCoefficients, guess);
    guess = new_guess;
    value = compValueAt(coefficients, start);
  }

  return guess;
}

int findClosestZero(vec2 value, vec2 roots[4]) {
  float minDist = 999999999.9;
  int minRoot = -1;
  for(int i = 0; i < 4; ++i) {
    vec2 r = roots[i];
    float dist = pow((r.x - value.x), 2.0) + pow((r.y - value.y), 2.0);
    if (dist < minDist) {
      minDist = dist;
      minRoot = i;
    }
  }
  return minRoot;
}

uniform vec2 u_resolution;
uniform vec2 u_coefficients[5];
uniform vec2 u_derivative[4];
uniform vec2 u_roots[4];
uniform vec3 u_colors[4];
uniform vec3 u_color;

void main() {
  vec2 st = (gl_FragCoord.xy/u_resolution.xy - vec2(0.5)) * 2.0;
  st.y *= -1.0; // So that it matches the overlay canvas

  vec2 zero = findZero(u_coefficients, u_derivative, st);
  int numRoot = findClosestZero(zero, u_roots);
  vec3 col = vec3(0.0);
  if (numRoot == 0) col = u_colors[0];
  if (numRoot == 1) col = u_colors[1];
  if (numRoot == 2) col = u_colors[2];
  if (numRoot == 3) col = u_colors[3].xyz;

  gl_FragColor = vec4(col, 1.0);
}