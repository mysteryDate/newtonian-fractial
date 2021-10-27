precision mediump float;
#define TAU 6.283185
uniform vec2 u_resolution;
uniform float u_time;

float smoothmin(float a, float b, float k)
{
    float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
    return mix(b, a, h) - k*h*(1.0-h);
}

void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution.xy - 0.5;
    uv.x *= u_resolution.x/u_resolution.y;

    float d = 9999.0;
    vec3 col;
    for (int i = 0; i < 24; i++) {
      float t = pow(fract(u_time * 0.2 + (float(i) * 0.4)), 2.0);
      vec2 o = vec2(sin(t*TAU), cos(t*TAU)) * 0.3;
      float dist = length(uv+o) - 0.02;
      if (dist < d)
        col = mix(vec3(0.3, 0.6, 1.0), vec3(1.0, 0.4, 0.3), cos(t*TAU)*0.5+0.5);
      d = smoothmin(d, dist, 0.04);
    }
    col = mix(col, vec3(1.0, 1.0, 0.9), smoothstep(0.0, 0.005, d));

    gl_FragColor = vec4(col, 1.0);
}
