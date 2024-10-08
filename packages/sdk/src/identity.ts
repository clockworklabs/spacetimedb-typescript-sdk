// Helper function convert from string to Uint8Array
function hexStringToUint8Array(str: string): Uint8Array {
  let matches = str.match(/.{1,2}/g) || [];
  let data = Uint8Array.from(matches.map((byte: string) => parseInt(byte, 16)));
  return data;
}

// Helper function for converting Uint8Array to hex string
function uint8ArrayToHexString(array: Uint8Array): string {
  return Array.prototype.map
    .call(array, x => ('00' + x.toString(16)).slice(-2))
    .join('');
}

/**
 * A unique identifier for a user connected to a database.
 */
export class Identity {
  data: Uint8Array;

  get __identity_bytes(): Uint8Array {
    return this.toUint8Array();
  }

  /**
   * Creates a new `Identity`.
   */
  constructor(data: string | Uint8Array) {
    // we get a JSON with __identity_bytes when getting a token with a JSON API
    // and an Uint8Array when using BSATN
    this.data =
      data.constructor === Uint8Array
        ? data
        : hexStringToUint8Array(data as string);
  }

  /**
   * Compare two identities for equality.
   */
  isEqual(other: Identity): boolean {
    return this.toHexString() === other.toHexString();
  }

  /**
   * Print the identity as a hexadecimal string.
   */
  toHexString(): string {
    return uint8ArrayToHexString(this.data);
  }

  toUint8Array(): Uint8Array {
    return this.data;
  }

  /**
   * Parse an Identity from a hexadecimal string.
   */
  static fromString(str: string): Identity {
    return new Identity(str);
  }
}
