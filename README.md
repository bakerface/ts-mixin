# ts-mixin
**A type-only package for creating mixins in TypeScript**

``` typescript
import type { Mixin } from "ts-mixin";

interface AmountFeatures {
  getAmount(): number;
  setAmount(n: number): void;
}

interface AddFeatures {
  add(a: number): void;
}

const withAdd: Mixin<AddFeatures, AmountFeatures> = (Base) =>
  class extends Base implements AddFeatures {
    add(n: number): void {
      this.setAmount(this.getAmount() + n);
    }
  };

interface SubtractFeatures {
  subtract(n: number): void;
}

const withSubtract: Mixin<SubtractFeatures, AddFeatures> = (Base) =>
  class extends Base implements SubtractFeatures {
    subtract(n: number): void {
      return this.add(-n);
    }
  };

class Amount implements AmountFeatures {
  constructor(private amount: number) {}

  getAmount(): number {
    return this.amount;
  }

  setAmount(n: number): void {
    this.amount = n;
  }
}

const Calculator = withSubtract(withAdd(Amount));

const calculator = new Calculator(0);
calculator.add(5);
calculator.subtract(3);
calculator.getAmount(); // 2
```
