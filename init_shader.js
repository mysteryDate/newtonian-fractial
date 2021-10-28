let gl, glProgram;

function init(shadercode) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, `
    attribute vec2 pos;
    varying vec2 v_uv;
    void main() {
      v_uv = pos;
      gl_Position = vec4(pos, 0, 1);
    }`);
  gl.compileShader(vertexShader);
  gl.attachShader(glProgram, vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, shadercode);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(fragmentShader));
  }

  gl.attachShader(glProgram, fragmentShader);
  gl.linkProgram(glProgram);
  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(glProgram));
  }

  gl.useProgram(glProgram);

  const bf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bf);
  gl.bufferData(gl.ARRAY_BUFFER, new Int8Array([-3, 1, 1, -3, 1, 1]),
    gl.STATIC_DRAW);

  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.BYTE, 0, 0, 0);

  gl.uniform2f(gl.getUniformLocation(glProgram, "u_resolution"), gl.canvas.width,
    gl.canvas.height);
  gl.drawArrays(6, 0, 3);
}

function updateShader(roots, coefficients, derivativeCoefficients, colors) {
  gl.uniform2fv(gl.getUniformLocation(glProgram, "u_coefficients"), coefficients);
  gl.uniform2fv(gl.getUniformLocation(glProgram, "u_derivative"), derivativeCoefficients);
  gl.uniform2fv(gl.getUniformLocation(glProgram, "u_roots"), roots);
  gl.uniform3fv(gl.getUniformLocation(glProgram, "u_colors"), colors);
  gl.drawArrays(6, 0, 3);
}

function createShaderCanvas(canvas, path, roots, coefficients, derivativeCoefficients, colors) {
  gl = canvas.getContext("webgl");
  glProgram = gl.createProgram();

  canvas.onmousemove = function(e) {
    const x = e.clientX / canvas.clientWidth;
    const y = 1.0 - e.clientY / canvas.clientHeight;
    gl.uniform2f(gl.getUniformLocation(glProgram, "u_mouse"), x, y);
  }

  fetch(path).then(response => response.text())
    .then((data) => {
      init(data);
      gl.uniform2fv(gl.getUniformLocation(glProgram, "u_coefficients"), coefficients);
      gl.uniform2fv(gl.getUniformLocation(glProgram, "u_derivative"), derivativeCoefficients);
      gl.uniform2fv(gl.getUniformLocation(glProgram, "u_roots"), roots);
      gl.uniform3fv(gl.getUniformLocation(glProgram, "u_colors"), colors);
      gl.drawArrays(6, 0, 3);
    });
};

