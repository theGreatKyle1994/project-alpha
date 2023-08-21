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
  floor(random() * 100) <= threshold ? true : false;

//Generate a number from a range
export const applyRange = (lowerRange = 0, upperRange = 100, multiplier = 1) =>
  floor(random() * (upperRange - lowerRange) + lowerRange) * multiplier;
