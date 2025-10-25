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
