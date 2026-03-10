/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const regex = {
  email:
    /^(?:[\w!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
  pinCode: /^[1-9][0-9]{5}$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  percent: /^[1-9][0-9]?$|^100$/,
  onlyNumber: /^[1-9]+[0-9]*$/,
  onlyAlphabet: /^[A-Za-z ]+$/,
  mobile: /^[6-9]\d{9}$/,
  number: /^\d+$/,
  isbn: /^(978|979)\d{10}$/,
};

// <-------- Validate Mobile ---------->
export const validateMobile = (phone) => {
  if (phone?.toString().length < 1) {
    return false;
  } else if (phone?.toString().length == 10 && regex.mobile.test(phone)) {
    return true;
  } else {
    return false;
  }
};

export const validateMobiles = (input) => {
  const regex = /\d+/g; // Match one or more digits
  const matches = input.match(regex);
  if (matches) {
    const maxNumbers = 10;
    const joinedMatches = matches.join("").slice(0, maxNumbers);
    return joinedMatches;
  }
  return "";
};

// <-------- Validate Pincode ---------->
export const validatePincode = (pincode) => {
  if (pincode?.toString().length < 1) {
    return false;
  } else if (
    pincode?.toString().length == 6 &&
    regex.onlyNumber.test(pincode)
  ) {
    return true;
  } else {
    return false;
  }
};
// <----- validate required ----------->
export const required = (value) => {
  if (!value || !value.toString().trim().length) {
    return true;
  }
  return false;
};
// <----- validate password ------------->
export const validatePassword = (password) => {
  if (password != "" && regex.password.test(password)) {
    return true;
  }
  return false;
};
// <----- validate email ------------->
export const validateEmail = (email) => {
  if (email && email.length < 1) {
    return false;
  } else if (email && regex.email.test(email)) {
    return true;
  } else {
    return false;
  }
};
// <------validate percent------>
export const validatePercent = (discount) => {
  if (discount && regex.percent.test(discount)) {
    return true;
  } else {
    return false;
  }
};
export const validateOnlyNumber = (number) => {
  if (number && regex.onlyNumber.test(number)) {
    return true;
  } else {
    return false;
  }
};
export const validateOnlyAlphabet = (text) => {
  if (text && regex.onlyAlphabet.test(text)) {
    return true;
  } else {
    return false;
  }
};
// <--------- check file size -------->
export const checkIfFilesAreCorrectSize = (file, sizeLimit) => {
  let valid = true;
  if (file) {
    if (Math.ceil(file.size / (1024 * 1024)) > sizeLimit) {
      valid = false;
    }
  }
  return valid;
};
// <--------- check object and array value -------->
export const hasObjectValues = (value) => {
  if (
    (value && Object.keys(value).length > 0) ||
    (value && Array.isArray(value) && value.length > 0)
  ) {
    return true;
  }
  return false;
};
// <--------- check enter input only number -------->
export const isNumber = (input) => {
  return regex?.number.test(input);
};
export const extractNumbers = (input) => {
  const regex = /\d+/g; // Match one or more digits
  const matches = input.match(regex);
  if (matches) {
    const maxNumbers = 6;
    const joinedMatches = matches.join("").slice(0, maxNumbers);
    return joinedMatches;
  }
  return "";
};
export const extractPincode = (input) => {
  const regex = /\d+/g; // Match one or more digits
  const matches = input.match(regex);
  if (matches) {
    const maxNumbers = 6;
    const joinedMatches = matches.join("").slice(0, maxNumbers);
    return joinedMatches;
  }
  return "";
};
export const extractAlphabate = (input) => {
  const regex = /[^a-zA-Z\s]+/g; // Match one or more digits
  const alphabetsOnly = input.replace(regex, "");
  return alphabetsOnly;
};
export const numberValidation = (input, sizeLimit) => {
  const regex = /\d+/g; // Match one or more digits
  const matches = input.match(regex);
  if (matches) {
    const maxNumbers = sizeLimit;
    const joinedMatches = matches.join("").slice(0, maxNumbers);
    return joinedMatches;
  }
  return "";
};
export const alphabetValidation = (input, sizeLimit) => {
  const regex = /[^a-zA-Z\s]/g; // Match one or more digits
  const alphabetsOnly = input.replace(regex, "");
  if (alphabetsOnly) {
    const maxNumbers = sizeLimit;
    const joinedMatches = alphabetsOnly.slice(0, maxNumbers);
    return joinedMatches;
  }
  return "";
};
export const alphaNumericValidation = (input, sizeLimit) => {
  const regex = /[^a-zA-Z0-9\s]/g; // Match one or more digits
  const alphaNumeric = input.replace(regex, "");
  if (alphaNumeric) {
    const maxLimit = sizeLimit;
    const joinedMatches = alphaNumeric.slice(0, maxLimit);
    return joinedMatches;
  }
  return "";
};
export const limitInput = (input, sizeLimit) => {
  if (input) {
    const value = input.slice(0, sizeLimit);
    return value;
  }
  return "";
};
export const emailValidation = (input) => {
  const regex = /[^a-zA-Z0-9.@\s]/g; // Match one or more digits
  const alphabetsOnly = input.replace(regex, "");
  if (alphabetsOnly) {
    const maxNumbers = 50;
    const joinedMatches = alphabetsOnly.slice(0, maxNumbers);
    return joinedMatches;
  }
  return "";
};
export const parkingValidation = (input) => {
  const regex = /[^a-zA-Z0-9\s]/g; // Match one or more digits
  const alphabetsOnly = input.replace(regex, "");
  if (alphabetsOnly) {
    const maxNumbers = 15;
    const joinedMatches = alphabetsOnly.slice(0, maxNumbers);
    return joinedMatches;
  }
  return "";
};
export const colorValidation = (input) => {
  const regex = /[^a-zA-Z\s]/g; // Match one or more digits
  const alphabetsOnly = input.replace(regex);
  if (alphabetsOnly) {
    const maxNumbers = 15;
    const joinedMatches = alphabetsOnly.slice(0, maxNumbers);
    return joinedMatches;
  }
  return "";
};
export const processInput = (input) => {
  var pattern = /^.{0,40}$/; // Regular expression pattern
  return pattern.test(input) ? input : input.slice(0, 40);
};

export const formatDateCreatedAt = (inputDate) => {
  // Create a new Date object from the input string
  var date = new Date(inputDate);

  // Extract day, month, and year
  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 as month starts from 0
  var year = date.getFullYear();

  // Format the date as dd-mm-yyyy
  // var formattedDate = day + "-" + month + "-" + year;
  var formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
};

export const yyymmdd_to_ddmmyy = (inputData) => {
  var parts = inputData?.split("-");
  var new_date_str = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return new_date_str;
};

export const getDaysLeft = (freeTrialEndDate) => {
  // Get the current date
  const currentDate = new Date();

  // Format the current date as dd-mm-yyyy
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const todayDateStr = `${day}-${month}-${year}`;

  const startDateStr = todayDateStr;
  const endDateStr = freeTrialEndDate;

  // Split date strings into parts
  const startDateParts = startDateStr?.split("-");
  const endDateParts = endDateStr?.split("-");

  // Create date objects
  const startDate = new Date(
    startDateParts[2],
    startDateParts[1] - 1,
    startDateParts[0]
  );
  const endDate = new Date(
    endDateParts[2],
    endDateParts[1] - 1,
    endDateParts[0]
  );

  // Calculate time difference
  const timeDiff = endDate.getTime() - currentDate.getTime();

  // Calculate days left
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysLeft;
};

export const formatDate = (inputDate) => {
  const parts = inputDate.split("/");

  if (parts.length === 3) {
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}-${month}-${year}`;
  }

  return "Invalid date";
};

//for magazine
export const isValidMeaningfulText = (text) => {
  if (!text || typeof text !== "string") return { isValid: false };

  const cleaned = text.trim();

  if (cleaned.length < 4) return { isValid: false };

  const vowels = cleaned.match(/[aeiou]/gi) || [];
  const consonants = cleaned.match(/[bcdfghjklmnpqrstvwxyz]/gi) || [];
  if (vowels.length < 1 || consonants.length < 2) return { isValid: false };

  const repeatedPattern = /^([a-zA-Z]{2,})\1+$/i;
  if (repeatedPattern.test(cleaned)) return { isValid: false };

  const commonGibberish = [
    "asdf",
    "qwerty",
    "zxcv",
    "ghjk",
    "dfgh",
    "poiuy",
    "lkjh",
  ];
  const lower = cleaned.toLowerCase();
  if (commonGibberish.some((word) => lower.includes(word)))
    return { isValid: false };

  const validPattern = /^[a-zA-Z0-9\s,'-.&()]+$/;
  if (!validPattern.test(cleaned)) return { isValid: false };

  // Sentence Case Conversion
  const formattedText = cleaned
    .toLowerCase()
    .replace(/(^\w{1})|(\.\s*\w{1})/g, (match) => match.toUpperCase());

  return { isValid: true, formattedText };
};

// === ISBN Simple Validation ===
// Checks if ISBN starts with 978 and has exactly 13 digits
// ✅ Simple validation: starts with 978 and is 13 digits
export const validateISBN = (isbn) => {
  if (!isbn || typeof isbn !== "string") return false;
  const cleaned = isbn.replace(/[^0-9]/g, "");
  const regex = /^978\d{10}$/;
  return regex.test(cleaned);
};

// === Format ISBN to 978-x-xxx-xxxxx-x format ===
export const formatISBN = (isbn) => {
  const cleaned = isbn.replace(/[^0-9]/g, "");
  if (cleaned.length !== 13 || !/^978/.test(cleaned)) return isbn; // return original if invalid

  // Insert hyphens based on standard positions (grouping: 978 - 1 - 234 - 56789 - 0)
  return `${cleaned.slice(0, 3)}-${cleaned[3]}-${cleaned.slice(
    4,
    7
  )}-${cleaned.slice(7, 12)}-${cleaned[12]}`;
};

export const AppointmentDateFormat = (date) => {
  if (!date) return "";

  const formatted = new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return formatted;
};

const useLoadGoogleMaps = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }&libraries=places`; // ✅ must include &libraries=places
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);

    return () => {
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return loaded;
};

export default useLoadGoogleMaps;
