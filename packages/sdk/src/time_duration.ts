/**
 * A difference between two points in time, represented as a number of nanoseconds.
 */
export class TimeDuration {
  __time_duration_nanos: bigint;

  private static NANOS_PER_MILLIS: bigint = 1000000n;

  get nanos(): bigint {
    return this.__time_duration_nanos;
  }

  get millis(): number {
    return Number(this.nanos / TimeDuration.NANOS_PER_MILLIS);
  }

  constructor(nanos: bigint) {
    this.__time_duration_nanos = nanos;
  }

  static fromMillis(millis: number): Timestamp {
    return new TimeDuration(BigInt(millis) * TimeDuration.NANOS_PER_MILLIS);
  }
}
