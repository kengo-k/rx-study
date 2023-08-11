import { lastValueFrom, of } from "rxjs";
import { filter, map, reduce, toArray } from "rxjs/operators";

// Double the value of each element in the array.
const double1 = (...values: number[]) => {
  return of(...values).pipe(
    map((num) => num * 2),
    toArray()
  );
};
it("double1", async () => {
  const observable = double1(1, 2, 3, 4, 5);
  const result = await lastValueFrom(observable);
  expect(result).toEqual([2, 4, 6, 8, 10]);
});

// An example of extracting values one by one from a stream.
const double2 = (...values: number[]) => {
  return of(...values).pipe(map((num) => num * 2));
};
it("double2", (done) => {
  const expected = [2, 4, 6, 8, 10];
  let index = 0;

  double2(1, 2, 3, 4, 5).subscribe({
    next: (val) => {
      expect(val).toEqual(expected[index]);
      index++;
    },
    complete: () => {
      done();
    },
  });
});

// Extract only the odd numbers from the array elements,
// and return the sum of the squares of each element
const oddSquare = (...values: number[]) => {
  return of(...values).pipe(
    filter((num) => num % 2 !== 0),
    map((num) => num * num),
    reduce((acc, val) => acc + val, 0)
  );
};

it("oddSquare", async () => {
  const ob = oddSquare(1, 2, 3, 4, 5);
  const result = await lastValueFrom(ob);
  expect(result).toEqual(35);
});
