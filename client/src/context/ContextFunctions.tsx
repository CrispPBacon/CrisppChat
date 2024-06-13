import { send_data } from "../api/posts";
import { signupProps, signupTypeError } from "../interfaces";
import { green } from "../messageLogger";

const validRegex = (validate: any, pattern: RegExp) => {
  const regex = pattern;
  const isValidRegex = regex.test(validate);
  return isValidRegex;
};
export const handleSignUpError = (data: signupProps) => {
  const userData = {
    First_Name: data.firstname,
    Last_Name: data.lastname,
    Email: data.email,
    Username: data.uid,
    Password: data.pwd,
    Confirm_Password: data.confirmPwd,
    isCheck: data.isCheck,
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

  for (let key in userData) {
    if (!userData[key as keyof signupTypeError] && key !== "isCheck") {
      return `${key.includes("_") ? key.replace(/_/g, " ") : key} is empty!`;
    }
  }
  if (
    !validRegex(userData.First_Name, nameRegex) ||
    !validRegex(userData.Last_Name, nameRegex)
  ) {
    return "Please enter a valid name";
  }
  if (!validRegex(userData.Email, emailRegex)) {
    return "Please enter a valid email";
  }
  if (!userData.isCheck) {
    return "Please read Terms of Service and agree to it.";
  }
  return "";
};

export const handleAPIRequest = async (endpoint: string, data: {}) => {
  try {
    const res = await send_data(endpoint, data);
    if (!res) {
      throw new Error("Internal server error");
    }
    if (res?.error) {
      throw new Error(res.error);
    }
    if (res?.success) {
      console.log(`%c${res.success}`, green);
    }
    return res;
  } catch (error) {
    throw error;
  }
};
