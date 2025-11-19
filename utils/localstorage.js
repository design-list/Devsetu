import moment from "moment";

export const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if(serializedState === null) {
        return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch (err) {
    return undefined;
  }
};

export const saveState = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  }
  catch (err) {

  }
};

export const formatDate = (date, formatType = "full") => {
  if (!date) return "";

  const formats = {
    full: "DD MMMM, dddd,",
    short: "DD MMM, YY",
    time: "DD MMM, h:mm A",
  };

  return moment.utc(date).local().format(formats[formatType] || formats.full);
};



export const safeParse = (data, fallback = {}) => {
  try {
    if (typeof data === "string") return JSON.parse(data);
    return data || fallback;
  } catch {
    return fallback;
  }
};



export const capitalizeWords = (str) => {
  return str
    ?.trim()
    ?.split(/\s+/)
    ?.map(w => w[0]?.toUpperCase() || "")
    ?.join("");
}


export function isDatePassed(date) {
  const givenDate = new Date(date);
  const today = new Date();

  // remove time portion (compare pure dates)
  givenDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return givenDate < today;
}
