import axios, { AxiosError } from "axios";
import { green } from "../messageLogger";

// const apiKey = "5c1fa84a-fe34-404b-8d40-b1d49bec58a9"; IGNORE THIS

const send_data = async (url: string, data: {}) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL");
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Invalid data. Data must be a non-array object");
  }

  const response = await axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      console.error(err.message);
      return;
    });
  return response;
};

const send_image = async (url: string, file: File) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      console.error(err.message);
      return;
    });
  return response;
};

const handleImgRequest = async (endpoint: string, file: File) => {
  try {
    const res = await send_image(endpoint, file);
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

const request_image = async (url: string) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL");
  }

  const response = await axios
    .get(url, {
      responseType: "arraybuffer", // Specify responseType as 'arraybuffer' to receive binary data
    })
    .then((res) => {
      // Convert the received binary data to a base64 string
      const imageBase64 = Buffer.from(res.data, "binary").toString("base64");
      return `data:image/jpeg;base64,${imageBase64}`; // Modify this based on the image type
    })
    .catch((err) => {
      console.error(err.message);
      return;
    });
  return response;
};

export { send_data, send_image, handleImgRequest, request_image };
