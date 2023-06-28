export class BinaryWriter {
  private buffer: Buffer;
  private position: number = 0;

  constructor(size: number) {
    this.buffer = Buffer.alloc(size);
  }

  writeBoolean(value: boolean) {
    this.buffer.writeUInt8(value ? 1 : 0, this.position);
    this.position += 1;
  }

  writeByte(value: number) {
    this.buffer.writeUInt8(value, this.position);
    this.position += 1;
  }

  writeBytes(value: Uint8Array) {
    // value.copy(this.buffer, this.position);
    this.position += value.length;
  }

  writeInt16(value: number) {
    this.buffer.writeInt16LE(value, this.position);
    this.position += 2;
  }

  writeUInt16(value: number) {
    this.buffer.writeUInt16LE(value, this.position);
    this.position += 2;
  }

  writeInt32(value: number) {
    this.buffer.writeInt32LE(value, this.position);
    this.position += 4;
  }

  writeUInt32(value: number) {
    this.buffer.writeUInt32LE(value, this.position);
    this.position += 4;
  }

  writeFloat(value: number) {
    this.buffer.writeFloatLE(value, this.position);
    this.position += 4;
  }

  writeDouble(value: number) {
    this.buffer.writeDoubleLE(value, this.position);
    this.position += 8;
  }

  writeString(value: string) {
    const length = this.buffer.write(value, this.position);
    this.position += length;
  }

  getBuffer(): Buffer {
    return this.buffer;
  }
}
