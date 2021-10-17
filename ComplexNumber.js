class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }
}


function multiplyComplex(A, B) {
  const a = A.real * B.real - A.imaginary * B.imaginary;
  const i = A.real * B.imaginary + A.imaginary * B.real;
  return new ComplexNumber(a, i);
}

function addComplex(A, B) {
  return new ComplexNumber(A.real + B.real, A.imaginary + B.imaginary);
}

function complexPower(x, n) {
  const result = new ComplexNumber(x.real, x.imaginary);
  for (let i = 0; i < n - 1; i++) {
    result = multiplyComplex(result, result);
  }
  return result;
}