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
    for (var i = 0; i < this.coefficients.length - 1; i++) {
      this.derivative[i] = this.coefficients[i + 1].multiply(i + 1)
    }
  }

  // Just go with order of 4 for now
  expand() {
    if (this.roots.length > 4)
      throw new Error("Can only expand polynomials of degree 3 or less")

    this.coefficients = [];

    if (this.roots.length === 4) {
      // for shorthand
      const a = this.roots[0];
      const b = this.roots[1];
      const c = this.roots[2];
      const d = this.roots[3];

      this.coefficients[0] = a.multiply(b).multiply(c).multiply(d);
      this.coefficients[1] =
        a.multiply(b).multiply(c).inv().add(
        a.multiply(b).multiply(d).inv().add(
        a.multiply(c).multiply(d).inv().add(
        b.multiply(c).multiply(d).inv())));
      this.coefficients[2] =
        a.multiply(b).add(
        a.multiply(c).add(
        a.multiply(d).add(
        b.multiply(c).add(
        b.multiply(d).add(
        c.multiply(d))))));
      this.coefficients[3] = a.inv().add(b.inv().add(c.inv().add(d.inv())));
      this.coefficients[4] = new ComplexNumber(1, 0);
    }

    if (this.roots.length === 3) {
      // for shorthand
      const a = this.roots[0];
      const b = this.roots[1];
      const c = this.roots[2];

      this.coefficients[0] = a.multiply(b).multiply(c).inv();
      this.coefficients[1] = a.multiply(b).add(a.multiply(c)).add(b.multiply(c));
      this.coefficients[2] = a.add(b).add(c).inv();
      this.coefficients[3] = new ComplexNumber(1, 0);
    }

    if (this.roots.length === 2) {
      const a = this.roots[0];
      const b = this.roots[1];

      this.coefficients[0] = a.multiply(b);
      this.coefficients[1] = a.add(b).inv();
      this.coefficients[2] = new ComplexNumber(1, 0);
    }
  }
}

function complexNewtonStep(polynomial, guess) {
  const px = polynomial.valueAt(guess);
  const pprimex = polynomial.derivativeAt(guess);
  return guess.add(px.divide(pprimex).inv());
}

function complexFindZero(polynomial, guess, max_steps) {
  let value = polynomial.valueAt(guess);
  for (var i = 0; i < max_steps; i++) {
    const new_guess = complexNewtonStep(polynomial, guess);
    guess = new_guess;
    value = polynomial.valueAt(guess);
  }

  return guess;
}
