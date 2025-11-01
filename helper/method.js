import { regEx } from './constant'
import { loadState, saveState } from '../utils/localstorage'
import axios from 'axios';
const URL = process.env.NEXT_PUBLIC_BASE_URL

// const api = new Api()

export function isValidMobileNo(mobileNo) {
  const panRegex = new RegExp(regEx.mobileNumber);
  return panRegex.test(mobileNo)
}

export function numberText(data) {
  let check = new RegExp(regEx.number);
  return check.test(data)
}

export function isValidEmail(data) {
  let check = new RegExp(regEx.email);
  return check.test(data)
}

export function alphabatesText(data) {
  let check = new RegExp(regEx.alphabates);
  return check.test(data)
}

export function alphabatesWithSpace(data) {
  let check = new RegExp(regEx.alphabatesWithSpace);
  return check.test(data)
}

export function alphaNumeric(data) {
  let check = new RegExp(regEx.alphaNumeric);
  return check.test(data)
}

export function emailOrMobileNumber(data) {
  let check = new RegExp(regEx.emailOrMobileNumber);
  return check.test(data)
}


export function fetchWithWait({ dispatch, action }) {
  return new Promise((resolve, reject) => {
    dispatch({ ...action, resolve, reject })
  })
}


// export function generateOrderId() {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   const charactersLength = characters.length;
//   for (let i = 0; i < 6; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   let orderId = result + Date.now()
//   return orderId;
// }

// export function generateCartId() {
//   let result = '';
//   const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   for (let i = 0; i < 4; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   let orderId = result + Date.now()
//   return orderId;
// }

export function sessionId() {
  var appuser = loadState("appuser");
  var userIdExpiry = loadState("userIdExpiry");

  if (!appuser || !userIdExpiry || new Date() > new Date(userIdExpiry)) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const expiryDate = new Date().setFullYear(new Date().getFullYear() + 1);
    const charactersLength = characters.length;

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    saveState('appuser', result);
    saveState('userIdExpiry', expiryDate);
    return result;
  } else {
    return appuser;
  }
}


export function setPath(key, value) {
  localStorage.setItem(key, value);
}

export function removeLocal(key) {
  localStorage.removeItem(key);
}

export function setUser(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getToken(key) {
  const token = localStorage.getItem(key);
  return token;
}




export const finalSellPrice = (data) => {
  // console.log("data is data", data)
  let finalPrice = 0
  let finalDiscont = 0;
  let baseSellPrice = 0;
  let disInPersent = 0;
  data?.forEach(element => {
    const { purchasePrice: { color, discountAmount, discountValue, promotionDiscount, currency, discountType, finalSellPrice, mrp, priceType, size, subTotal, tax, taxValue } } = element
    if (finalSellPrice !== null) {
      finalPrice = finalSellPrice;
      finalDiscont = parseFloat(discountValue);
      disInPersent = discountValue || promotionDiscount;
      baseSellPrice = mrp;
    }
  });

  // let minprice = Math.min(...finalPrice)

  let price = {
    finalPrice,
    finalDiscont,
    baseSellPrice,
    disInPersent
  }

  return { finalPrice, finalDiscont, baseSellPrice, disInPersent } = price
}


export function generateRanges(start, end, count, length) {
  // console.log("generateRangesgenerateRanges", start, end,count)
  const rangeWidth = Math.ceil((end - start) / count);
  const ranges = [];
  

 if(start !== end){
  if(length < 5 ){
    for (let i = 0; i < length; i++) {
      if(i === 0){
       let rangeStart = parseInt(start) + (i * rangeWidth);
       const rangeEnd = Math.min(parseInt(start) + ((i + 1) * rangeWidth), end);
 
       ranges.push({ start: rangeStart, end: rangeEnd });
      }else{
        let rangeStart = parseInt(start) + (i * rangeWidth) + 1;
        const rangeEnd = Math.min(parseInt(start) + ((i + 1) * rangeWidth), end);
 
       ranges.push({ start: rangeStart, end: rangeEnd });
      }
   }
  }else{
    for (let i = 0; i < count; i++) {
      if(i === 0){
        let rangeStart = parseInt(start) + (i * rangeWidth);
       const rangeEnd = Math.min(parseInt(start) + ((i + 1) * rangeWidth), end);
 
       ranges.push({ start: rangeStart, end: rangeEnd });
      }else{
        let rangeStart = parseInt(start) + (i * rangeWidth) + 1;
       const rangeEnd = Math.min(parseInt(start) + ((i + 1) * rangeWidth), end);
 
       ranges.push({ start: rangeStart, end: rangeEnd });
      }
    }
  }
  return ranges;
 }
  for (let i = 0; i < 1; i++) {
    if(i === 0){
      let rangeStart = parseInt(start) + (i * rangeWidth);
    const rangeEnd = Math.min(parseInt(start) + ((i + 1) * rangeWidth), end);

    ranges.push({ start: rangeStart, end: rangeEnd });
    }else{
      let rangeStart = parseInt(start) + (i * rangeWidth) + 1;
    const rangeEnd = Math.min(parseInt(start) + ((i + 1) * rangeWidth), end);

    ranges.push({ start: rangeStart, end: rangeEnd });
    }
  }
  return ranges;
}


export const checkPasswordStrength = (password) => {
  // Define your criteria for password strength here
  const minLength = 8;
  let score = 0;

  if (password.length >= minLength) {
    score++;
  }
  if (/[A-Z]/.test(password)) {
    score++;
  }
  if (/[a-z]/.test(password)) {
    score++;
  }
  if (/\d/.test(password)) {
    score++;
  }
  if (/[!@#$%^&*()\-=_+[\]{}|\\;:'",.<>/?]/.test(password)) {
    score++;
  }
  if (score === 0 || score === 1 || score === 2) {
    return 'Weak';
  } else if (score === 3 || score === 4) {
    return 'Good';
  } else {
    return 'Strong';
  }
};




export function numberToWords(number) {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function convertBelowThousand(num) {
      let words = '';

      if (num >= 100) {
          words += ones[Math.floor(num / 100)] + ' hundred ';
          num %= 100;
      }

      if (num >= 20) {
          words += tens[Math.floor(num / 10)] + ' ';
          num %= 10;
      }

      if (num > 0) {
          if (num < 10) words += ones[num];
          else words += teens[num - 10];
      }

      return words.trim();
  }

  if (number === 0) return 'zero';

  let words = '';

  if (number < 0) {
      words = 'minus ';
      number = Math.abs(number);
  }

  if (number >= 1e12) {
      words += convertBelowThousand(Math.floor(number / 1e12)) + ' trillion ';
      number %= 1e12;
  }

  if (number >= 1e9) {
      words += convertBelowThousand(Math.floor(number / 1e9)) + ' billion ';
      number %= 1e9;
  }

  if (number >= 1e6) {
      words += convertBelowThousand(Math.floor(number / 1e6)) + ' million ';
      number %= 1e6;
  }

  if (number >= 1e3) {
      words += convertBelowThousand(Math.floor(number / 1e3)) + ' thousand ';
      number %= 1e3;
  }

  words += convertBelowThousand(number);

  return words.trim();
}