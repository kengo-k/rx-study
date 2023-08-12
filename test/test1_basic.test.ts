import { lastValueFrom, of } from "rxjs";
import { filter, map, reduce, toArray } from "rxjs/operators";

// Convert the values specified by the argument into a stream.
const toStream = (...values: number[]) => {
  return of(...values);
};

// Print the value that flowed into the stream to the console.
// The argument passed to `subscribe` is called an Observer.
// An Observer is an object that has a `next` method.
// If passing a single function is equivalent to passing an Observer that only has a next method.
it("subscribe to the stream", () => {
  toStream(1, 2, 3, 4, 5).subscribe(console.log);
  // subscribe to the stream with Observer object
  toStream(1, 2, 3, 4, 5).subscribe({
    next: console.log,
    error: () => {},
    complete: () => {
      console.log("Complete!");
    },
  });
});

it("verify the value of the stream using expect", () => {
  const expected = [1, 2, 3, 4, 5];
  let index = 0;
  toStream(1, 2, 3, 4, 5).subscribe({
    next: (val) => {
      expect(val).toEqual(expected[index]);
      index++;
    },
  });
});

it("convert the stream to an array and verify the entire array.", async () => {
  const observable = toStream(1, 2, 3, 4, 5).pipe(toArray());
  const result = await lastValueFrom(observable);
  expect(result).toEqual([1, 2, 3, 4, 5]);
});

// Double the value that flowed into the stream.
const double = (...values: number[]) => {
  return toStream(...values).pipe(map((num) => num * 2));
};

it("double", async () => {
  const observable = double(1, 2, 3, 4, 5).pipe(toArray());
  const result = await lastValueFrom(observable);
  const expected = [2, 4, 6, 8, 10];
  expect(result).toEqual(expected);
});

// Extract only the odd numbers from the stream,
// and return the sum of the squares of each element
const oddSquare = (...values: number[]) => {
  return (
    toStream(...values)
      //You can split the call to pipe into multiple times.
      .pipe(filter((num) => num % 2 !== 0))
      .pipe(
        map((num) => num * num),
        reduce((acc, val) => acc + val, 0)
      )
  );
};

it("oddSquare", async () => {
  const ob = oddSquare(1, 2, 3, 4, 5, 6);
  const result = await lastValueFrom(ob);
  expect(result).toEqual(35);
});
