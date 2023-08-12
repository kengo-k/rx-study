import { from, lastValueFrom, merge, of } from "rxjs";
import { concatAll, concatMap, delay, map, toArray } from "rxjs/operators";

it("print the all values 3 seconds after it arrives in the stream", () => {
  of(1, 2, 3, 4, 5).pipe(delay(3000)).subscribe(console.log);
});

it("print the values arriving in the stream at 100 msec intervals", () => {
  const create = (val: number) => {
    return of(val).pipe(delay(100));
  };
  const stream$ = of(create(1), create(2), create(3), create(4), create(5));
  const concatStream$ = stream$.pipe(concatAll());
  concatStream$.subscribe(console.log);
});

it("simplify the above test using `map`", () => {
  const values = [1, 2, 3, 4, 5];
  const stream$ = from(values).pipe(
    map((val) => of(val).pipe(delay(100))),
    concatAll()
  );
  stream$.subscribe(console.log);
});

it("simplify the above test further using `concatMap`", () => {
  const values = [1, 2, 3, 4, 5];
  const stream$ = from(values).pipe(
    concatMap((val) => of(val).pipe(delay(100)))
  );
  stream$.subscribe(console.log);
});

it("merge two streams that receive data at different intervals.", async () => {
  const stream1$ = of(1, 2, 3, 4, 5).pipe(
    concatMap((val) => of(val).pipe(delay(100)))
  );
  const stream2$ = of(10, 20, 30, 40, 50).pipe(
    concatMap((val) => of(val).pipe(delay(30)))
  );
  const merged$ = merge(stream1$, stream2$);
  const result = await lastValueFrom(merged$.pipe(toArray()));
  expect(result).toEqual([10, 20, 30, 1, 40, 50, 2, 3, 4, 5]);
});
