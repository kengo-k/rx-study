import { of } from "rxjs";
import { map } from "rxjs/operators";

export const doubleNumbers = () => {
  return of(1, 2, 3, 4, 5).pipe(map((num) => num * 2));
};

describe("doubleNumbers", () => {
  it("should double each number", (done) => {
    const expected = [2, 4, 6, 8, 10];
    let index = 0;

    doubleNumbers().subscribe({
      next: (val) => {
        expect(val).toEqual(expected[index]);
        index++;
      },
      complete: () => {
        done();
      },
    });
  });
});
