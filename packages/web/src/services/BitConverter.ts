import { Buffer } from "browser-buffer";

export default class BitConverter {
  static getBytes(int: number) {
    const b = new Buffer(8);
    b[0] = int;
    b[1] = int >> 8;
    b[2] = int >> 16;
    b[3] = int >> 24;
    return Array.from(b);
  }
  static toInt(buffer: Buffer) {
    return (buffer[0] | (buffer[1] << 8) | (buffer[2] << 16) | (buffer[3] << 24)) >>> 0;
  }
}
