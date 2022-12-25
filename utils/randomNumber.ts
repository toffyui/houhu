export const randomNumber = (min: number = 0, max: number) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
