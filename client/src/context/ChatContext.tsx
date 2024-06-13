import React, { createContext, useContext, useState } from "react";
import {
  chatType,
  chatProps,
  initialChatValue,
  initialChatUser,
  ChildProps,
} from "../interfaces";
import { handleAPIRequest } from "./ContextFunctions";

const ChatContext = createContext<chatProps>(initialChatValue);

function ChatProvider({ children }: ChildProps) {
  const [chat, setChat] = useState<chatType | null>(initialChatUser);
  const [searchValue, setSearchValue] = useState("");

  const selectChat = async (
    user_id: string | null,
    person_id: string | null
  ) => {
    if (!(user_id || person_id)) {
      setChat(null);
      throw new Error(`Missing ${!user_id ? "user id!" : "person id"}`);
    }

    await handleAPIRequest("/api/rooms", {
      getRoom: { user_id: user_id, person_id: person_id },
    })
      .then((res) => {
        setChat(res);
      })
      .catch((error) => {
        throw error;
      });
  };

  const getSearchResult = async (searchValue: string) => {
    if (!searchValue) {
      return [];
    }

    try {
      const res = await handleAPIRequest("/api/users", {
        search: { searchValue: searchValue },
      });
      return res;
    } catch (error) {
      console.error("Error while fetching search results:", error);
      throw error;
    }
  };

  const chatValue = React.useMemo(
    () => ({ chat, searchValue, selectChat, setSearchValue, getSearchResult }),
    [chat, searchValue, selectChat, setSearchValue, getSearchResult]
  );

  return (
    <ChatContext.Provider value={chatValue}>{children}</ChatContext.Provider>
  );
}

function useChat() {
  return useContext(ChatContext);
}

export { ChatProvider, useChat };
