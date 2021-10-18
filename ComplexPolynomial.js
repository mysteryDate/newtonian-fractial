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

  // Just go with order of 3 for now
  expand() {
    if (this.roots.length > 3)
      throw new Error("Can only expand polynomials of degree 3 or less")

    this.coefficients = [];

    if (this.roots.length === 3) {
      // for shorthand
      const a = this.roots[0];
      const b = this.roots[1];
      const c = this.roots[2];

      this.coefficients[0] = a.multiply(b).multiply(c).multiply(-1);
      this.coefficients[1] = a.multiply(b).add(a.multiply(c)).add(b.multiply(c));
      this.coefficients[2] = a.add(b).add(c).multiply(-1);
      this.coefficients[3] = new ComplexNumber(1, 0);
    }

    if (this.roots.length === 2) {
      const a = this.roots[0];
      const b = this.roots[1];

      this.coefficients[0] = a.multiply(b);
      this.coefficients[1] = a.add(b).multiply(-1);
      this.coefficients[2] = new ComplexNumber(1, 0);
    }
  }
}

function complexNewtonStep(polynomial, guess) {
  const px = polynomial.valueAt(guess);
  const pprimex = polynomial.derivativeAt(guess);
  return guess.add(px.divide(pprimex).multiply(-1));
}

function complexFindZero(polynomial, guess, max_steps, tolerance) {
  let value = polynomial.valueAt(guess);
  let num_steps = 0;
  while (value.lengthSq() > tolerance) {
    const new_guess = complexNewtonStep(polynomial, guess);
    guess = new_guess;
    value = polynomial.valueAt(guess);
    num_steps += 1;
    if (num_steps === max_steps)
      break;
  }

  return guess;
}
