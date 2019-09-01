import uuidParse from "uuid-parse";

import BitConverter from "./BitConverter";
import { generateGuid } from "./guidService";

const baseDate = new Date(1900, 0, 1).getTime();

export const generateComb = (seed?: Date) => {
  const baseGuid = generateGuid();
  const baseArray = Array.from(uuidParse.parse(baseGuid));

  const now = seed ? seed.getTime() : Date.now();

  const diff = now - baseDate;
  const diffDate = new Date(diff);

  const days = Math.floor(diff / (1000 * 3600 * 24));

  const totalMills =
    diffDate.getUTCHours() * 60 * 60 * 1000 +
    diffDate.getUTCMinutes() * 60 * 1000 +
    diffDate.getUTCSeconds() * 1000 +
    diffDate.getUTCMilliseconds();

  const mills = Math.floor(totalMills / 3.333333);

  const daysArray = BitConverter.getBytes(days);
  const millsArray = BitConverter.getBytes(mills);

  const combArray = [
    ...baseArray.slice(0, 10),
    ...daysArray.slice(0, 2).reverse(),
    ...millsArray.slice(0, 4).reverse(),
  ];

  return uuidParse.unparse(Buffer.from(combArray));
};
