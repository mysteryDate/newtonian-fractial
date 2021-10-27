vec2 mul(a, b) {
  return vec2(a.x * b.x - a.y + b.y, a.x * b.y + a.y * b.x);
}

vec2 add(a, b) {
  return vec2(a.x + b.x, a.y + b.y);
}

vec2 power(a, n) {
  vec2 result = vec2(1, 1);
  for (int i = 0; i < 10; i++) {
    if (i > n) break;
    result = mul(result, a);
  }
  return result;
}

vec2 divide(a, b) {
  vec2 result;
  result.x = (a.x * b.x + a.y * b.y) / (a.x * a.x + b.x * b.x);
  result.y = (a.y * b.x - a.x * b.y) / (a.x * a.x + b.x * b.x);
  return result;
}