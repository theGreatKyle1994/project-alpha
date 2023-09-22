const { floor, random } = Math;

//Create an async waiting delay
export const wait = (ms, msg = "") =>
  new Promise((res) =>
    setTimeout(() => {
      if (msg) console.log(msg);
      res();
    }, ms)
  );

//Use a chance system out of 100
export const applyChance = (threshold = 50) =>
  random() * 101 <= threshold ? true : false;

//Generate a number from a range
export const applyRange = (lowerRange = 0, upperRange = 100, multiplier = 1) =>
  floor(random() * (upperRange - lowerRange) + lowerRange) * multiplier;

// Generates unique ID
export const generateID = (size = 10, prefix = "", suffix = "") => {
  const charArray = [...Array(94)].map((_, i) => String.fromCharCode(i + 33));
  return (
    prefix +
    [...Array(size)]
      .map(() => charArray[floor(random() * charArray.length - 1)])
      .join("") +
    suffix
  );
};
