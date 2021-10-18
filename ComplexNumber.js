class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  multiply(A) {
    const result = this.copy();
    if (A instanceof ComplexNumber) {
      result.real = A.real * this.real - A.imaginary * this.imaginary;
      result.imaginary = A.real * this.imaginary + A.imaginary * this.real;
    } else if (typeof(A) === "number") {
      result.real *= A;
      result.imaginary *= A;
    } else {
      throw new Error("Must multiply with either a number or a complex number");
    }
    return result;
  }

  divide(A) {
    const result = this.copy();
    if (typeof(A) === "number") {
      result.real /= A;
      result.imaginary /= A;
    } else if (A instanceof ComplexNumber) {
      const a = this.real;
      const b = this.imaginary;
      const c = A.real;
      const d = A.imaginary;
      result.real = (a*c + b*d) / (c**2 + d**2);
      result.imaginary = (b*c + a*d) /(c**2 + d**2);
    } else {
      throw new Error("Must divide with either a number or a complex number");
    }
    return result;
  }

  add(A) {
    const result = this.copy();
    if (A instanceof ComplexNumber) {
      result.real += A.real;
      result.imaginary += A.imaginary;
    } else if (typeof(A) === "number") {
      result.real += A;
    } else {
      throw new Error("Must add with either a number or a complex number")
    }
    return result;
  }

  power(n) {
    if (n === 0)
      return new ComplexNumber(1, 0);
    let result = this.copy();
    for (let i = 0; i < n - 1; i++) {
      result = result.multiply(this);
    }
    return result;
  }

  lengthSq() {
    return this.real ** 2 + this.imaginary ** 2;
  }

  copy() {
    return new ComplexNumber(this.real, this.imaginary);
  }
}


// console.assert(false, "HI");