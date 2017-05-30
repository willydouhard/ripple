'use strict';
/** MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

class CubicBezier {

	constructor(mX1, mY1, mX2, mY2) {
		this.mX1 = mX1;
		this.mY1 = mY1;
		this.mX2 = mX2;
		this.mY2 = mY2;
	}

	getTiming(aX) {
		if (this.mX1 == this.mY1 && this.mX2 == this.mY2) return aX; // linear
		return this.CalcBezier(this.GetTForX(aX), this.mY1, this.mY2);
	}

	A(aA1, aA2) {return 1.0 - 3.0 * aA2 + 3.0 * aA1;}
	B(aA1, aA2) {return 3.0 * aA2 - 6.0 * aA1;}
	C(aA1) {return 3.0 * aA1;}

	CalcBezier(aT, aA1, aA2) {
		return ((this.A(aA1, aA2)*aT + this.B(aA1, aA2))*aT + this.C(aA1))*aT;
	}

	GetSlope(aT, aA1, aA2) {
		return 3.0 * this.A(aA1, aA2)*aT*aT + 2.0 * this.B(aA1, aA2) * aT + this.C(aA1);
	}

	GetTForX(aX) {
		// Newton raphson iteration
		let aGuessT = aX;
		for (let i = 0; i < 4; ++i) {
			const currentSlope = this.GetSlope(aGuessT, this.mX1, this.mX2);
			if (currentSlope == 0.0) return aGuessT;
			const currentX = this.CalcBezier(aGuessT, this.mX1, this.mX2) - aX;
			aGuessT -= currentX / currentSlope;
		}
		return aGuessT;
	}
}
