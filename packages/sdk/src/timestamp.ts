/**
 * A point in time, represented as a number of nanoseconds since the Unix epoch.
 */
export class Timestamp {
  __timestamp_nanos_since_unix_epoch: bigint;

  private static NANOS_PER_MILLIS: bigint = 1000000n;

  get nanosSinceUnixEpoch(): bigint {
    return this.__timestamp_nanos_since_unix_epoch;
  }

  constructor(nanos: bigint) {
    this.__timestamp_nanos_since_unix_epoch = nanos;
  }

  /**
   * The Unix epoch, the midnight at the beginning of January 1, 1970, UTC.
   */
  static UNIX_EPOCH: Timestamp = new Timestamp(0n);

  /**
   * Get a `Timestamp` representing the execution environment's belief of the current moment in time.
   */
  static now(): Timestamp {
    return Timestamp.fromDate(new Date());
  }

  /**
   * Get a `Timestamp` representing the same point in time as `date`.
   */
  static fromDate(date: Date): Timestamp {
    const millis = date.getTime();
    const nanos = BigInt(millis) * Timestamp.NANOS_PER_MILLIS;
    return new Timestamp(nanos);
  }

  /**
   * Get a `Date` representing approximately the same point in time as `this`.
   *
   * This method truncates to millisecond precision,
   * and throws `RangeError` if the `Timestamp` is outside the range representable as a `Date`.
   */
  toDate(): Date {
    const nanos = this.__timestamp_nanos_since_unix_epoch;
    const millis = nanos / Timestamp.NANOS_PER_MILLIS;
    if (
      millis > BigInt(Number.MAX_SAFE_INTEGER) ||
      millis < BigInt(Number.MIN_SAFE_INTEGER)
    ) {
      throw new RangeError(
        "Timestamp is outside of the representable range of JS's Date"
      );
    }
    return new Date(Number(millis));
  }
}
