class ComplexPolynomial {
  constructor(roots) {
    this.roots = roots;
    this.coefficients = null;
    this.derivative = null;
  }

  valueAt(x) {
    if (!(x instanceof ComplexNumber))
      x = new ComplexNumber(x, 0);
    if (!this.coefficients)
      this.expand();
    let result = new ComplexNumber(0, 0);
    for (let i = 0; i < this.coefficients.length; i++) {
      const component = this.coefficients[i].multiply(x.power(i));
      result = result.add(component);
    }
    return result;
  }

  derivativeAt(x) {
    if (!(x instanceof ComplexNumber))
      x = new ComplexNumber(x, 0);
    if (!this.derivative)
      this.getDerivative();
    let result = new ComplexNumber(0, 0);
    for (let i = 0; i < this.derivative.length; i++) {
      const component = this.derivative[i].multiply(x.power(i));
      result = result.add(component);
    }
    return result;
  }

  getDerivative() {
    if (this.derivative)
      return;

    if (!this.coefficients)
      this.expand();

    this.derivative = [];
    this.derivative[0] = this.coefficients[1];
    this.derivative[1] = this.coefficients[2].multiply(2);
    this.derivative[2] = this.coefficients[3].multiply(3);
  }

  // Just go with order of 3 for now
  expand() {
    if (this.roots.length > 3)
      throw new Error("Can only expand polynomials of degree 3 or less")

    this.coefficients = [];

    // for shorthand
    const a = this.roots[0] ? this.roots[0] : new ComplexNumber(0, 0);
    const b = this.roots[1] ? this.roots[1] : new ComplexNumber(0, 0);
    const c = this.roots[2] ? this.roots[2] : new ComplexNumber(0, 0);

    // this.coefficients[0] = multiplyComplex([a, b, c]).multiply(-1);
    this.coefficients[0] = a.multiply(b).multiply(c).multiply(-1);
    this.coefficients[1] = a.multiply(b).add(a.multiply(c)).add(b.multiply(c));
    this.coefficients[2] = a.add(b).add(c).multiply(-1);
    this.coefficients[3] = new ComplexNumber(1, 0);
  }
}
