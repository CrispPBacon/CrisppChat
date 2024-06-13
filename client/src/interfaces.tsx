import { ReactNode } from "react";

export const initialUser: userType = null;
export const InitialContext = {
  user: initialUser,
  isAuth: false,
  signup: (): Promise<void> => {
    return Promise.resolve();
  },
  login: (): Promise<void> => {
    return Promise.resolve();
  },
  logout: () => {},
  checkSession: (): Promise<void> => {
    return Promise.resolve();
  },
};

export interface userProp {
  _id: string;
  username: string;
  fullname: string;
  email: string;
}

export type userType = userProp | null;

// AUTH CONTEXT TYPE
export interface authProps {
  user: userType;
  isAuth: boolean;
  signup: (userdata: signupProps) => Promise<void>;
  login: (uid: string, pwd: string) => Promise<void>;
  logout: () => void;
  checkSession: () => Promise<void>;
}

// SIGNUP PARAMETER DATA TYPE
export interface signupProps {
  firstname: string;
  lastname: string;
  uid: string;
  email: string;
  pwd: string;
  confirmPwd: string;
  isCheck: boolean;
}

// SIGNUP ERROR HANDLER
export type signupTypeError = {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Username: string;
  Password: string;
  Confirm_Password: string;
  isCheck: boolean;
};

// CHAT APP PROPERTIES

export const initialChatUser: chatType = null;
export const initialChatValue: chatProps = {
  chat: initialUser,
  selectChat: (): Promise<void> => {
    return Promise.resolve();
  },
  setSearchValue: () => {},
  searchValue: "",
  getSearchResult: (): Promise<any> => {
    return Promise.resolve();
  },
};

export type chatType = {
  _id: string;
  name: string;
  members: string[];
  created_at: string;
  person_name: string;
} | null;

export interface chatProps {
  chat: chatType;
  searchValue: string;
  selectChat: (
    sender_id: string | null,
    receiver_id: string | null
  ) => Promise<void>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  getSearchResult: (searchValue: string) => Promise<any>;
}

/* ********************* */
export type ChildProps = { children: ReactNode };

/* MESSAGE PROPS */
export interface messageType {
  _id: string;
  chatroom_id: string;
  sender_id: string;
  content: string;
  timestasmp: string;
}

export interface inboxProps {
  _id: string;
  chatroom_id: string;
  person_id: string;
  fullname: string;
  content: string;
  seen: boolean;
  sender_id: string;
  timestamp: string;
}

// IMAGES
type details = {
  filename: string;
  description: string;
};

export type imagesType = {
  details: details;
  imageData: string;
};
