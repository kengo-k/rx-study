import { lastValueFrom, merge, of } from "rxjs";
import { filter, toArray } from "rxjs/operators";

it("split the stream of numbers into even and odd.", async () => {
  const stream = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  const even = await lastValueFrom(
    stream.pipe(
      filter((value) => value % 2 === 0),
      toArray()
    )
  );
  const odd = await lastValueFrom(
    stream.pipe(
      filter((value) => value % 2 !== 0),
      toArray()
    )
  );
  expect(even).toEqual([2, 4, 6, 8, 10]);
  expect(odd).toEqual([1, 3, 5, 7, 9]);
});

it("merge multiple streams into one", async () => {
  const stream1 = of(1, 2, 3, 4, 5);
  const stream2 = of(10, 20, 30, 40, 50);
  const mergedStream = merge(stream1, stream2);
  const result = await lastValueFrom(mergedStream.pipe(toArray()));
  expect(result).toEqual([1, 2, 3, 4, 5, 10, 20, 30, 40, 50]);
});
