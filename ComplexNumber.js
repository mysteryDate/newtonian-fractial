class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
    this.length2 = null;
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

  inv() {
    return this.multiply(-1);
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
      result.imaginary = (b*c - a*d) /(c**2 + d**2);
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
    if (!this.length2)
      this.length2 = this.real ** 2 + this.imaginary ** 2;
    return this.length2;
  }

  copy() {
    return new ComplexNumber(this.real, this.imaginary);
  }
}

(() => {
  let a = new ComplexNumber(1, 2);
  console.assert(a.real === 1);
  console.assert(a.imaginary === 2);

  a = new ComplexNumber(1, 2).multiply(new ComplexNumber(3, 4));
  console.assert(a.real === -5);
  console.assert(a.imaginary === 10);

  a = new ComplexNumber(1, -2).multiply(new ComplexNumber(-3, 4));
  console.assert(a.real === 5);
  console.assert(a.imaginary === 10);

  a = new ComplexNumber(1, 2.1).add(new ComplexNumber(-3, 4.33));
  console.assert(a.real === -2);
  console.assert(a.imaginary === 6.43);

  a = new ComplexNumber(3, 4);
  console.assert(a.lengthSq() === 25);

  a = new ComplexNumber(1, 2).divide(new ComplexNumber(-3, 4));
  console.assert(a.real === 0.2);
  console.assert(a.imaginary === -0.4);
})();