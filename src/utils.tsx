import firstNames from "./data/first-names.json";
import lastNames from "./data/middle-names.json";
import countries from "./data/countries.json";
import animals from "./data/animals.json";
import colors from "./data/colors.json";

const getRandomHexColor = () => {
  const randomValue = Math.floor(Math.random() * 0xffffff);
  const hexValue = randomValue.toString(16);
  const color = hexValue.padStart(6, "0");

  return "#" + color;
};

const getRandomFromArray = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
const getFirstName = () => {
  return getRandomFromArray(firstNames);
};

const getLastName = () => {
  return getRandomFromArray(lastNames);
};

const getCountry = () => {
  return countries[Math.floor(Math.random() * countries.length)];
};

const getEmail = (first: string, last: string, email: string) => {
  return `${first.toLowerCase()}.${last.toLowerCase()}@${email}`;
};

const getBirthday = () => {
  const start: Date = new Date(2020, 0, 1);
  const end: Date = new Date(1940, 0, 24);
  var date = new Date(
    +start + Math.random() * (end.valueOf() - start.valueOf())
  );

  return date.toLocaleDateString("en-US");
};

const getAge = (birthday: string) => {
  var today = new Date();
  var birthDate = new Date(birthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const getTel = () => {
  return Math.floor(Math.random() * 1000000000);
};

const getPassword = () => {
  const animal = getRandomFromArray(animals);
  const color = getRandomFromArray(colors);
  const replaceVovels = (word: string) => {
    return word
      .replace("o", "0")
      .replace("i", "!")
      .replace("a", "4")
      .replace("e", "€");
  };

  return replaceVovels(color) + replaceVovels(animal);
};

const getUsername = (firstName: string, lastName: string) => {
  return firstName.toLowerCase() + "." + lastName.toLowerCase();
};

const getIsOnline = () => {
  const status = ["true", "false"];
  return getRandomFromArray(status);
};
export {
  getRandomFromArray,
  getAge,
  getRandomHexColor,
  getFirstName,
  getLastName,
  getPassword,
  getUsername,
  getEmail,
  getCountry,
  getTel,
  getBirthday,
  getIsOnline,
};
