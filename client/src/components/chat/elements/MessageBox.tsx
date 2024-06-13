import { useEffect, useState } from "react";
import { useChat } from "../../../context/ChatContext";
import { socket } from "../../../socket";
import WriteBox from "./WriteBox";
import { messageType } from "../../../interfaces";
import { red } from "../../../messageLogger";
import { handleAPIRequest } from "../../../context/ContextFunctions";
import { useAuth } from "../../../context/AuthContext";

interface Props {
  fetchImages: (chat_id: string) => {};
}
export default function MessageBox({ fetchImages }: Props) {
  const { chat } = useChat();
  const { user } = useAuth();
  const [messages, setMessages] = useState<messageType[]>([]);

  const getMessages = async (chat_id: string) => {
    handleAPIRequest("/api/rooms", { getMessages: { room_id: chat_id } })
      .then((res) => {
        setMessages(res.length > 0 ? res : []);
      })
      .catch((error) => {
        console.log(`%c${error.message}`, red);
      });
  };

  const messageListener = (data: messageType) => {
    if (!data) {
      return;
    }
    if (!data?.chatroom_id) {
      return;
    }
    setMessages((prev) => [...prev, data]);
  };

  useEffect(() => {
    if (chat?._id) {
      socket.emit("join_room", chat._id);
      // console.log(`%cJoined the room ${chat._id}`, "color: #8b7cff;");
      getMessages(chat._id);
    }

    return () => {
      if (chat?._id) {
        socket.emit("leave_room", chat._id);
        setMessages([]);
        // console.log(`%cLeft the room ${chat._id}`, red);
      }
    };
  }, [chat]);

  useEffect(() => {
    socket.on("received_message", messageListener);
    return () => {
      socket.off("received_message", messageListener);
    };
  }, [socket]);

  return (
    <>
      <div className="messages">
        {messages.length > 0
          ? messages
              .slice()
              .reverse()
              .map((obj, key_id) => {
                return (
                  <MessageRow
                    message={obj.content}
                    key={key_id}
                    isSender={obj.sender_id === user?._id ? true : false}
                    image={"/images/profile.jfif"}
                  />
                );
              })
          : null}
      </div>
      <WriteBox setMessages={setMessages} fetchImages={fetchImages} />
    </>
  );
}

interface MessageRowProps {
  message: string;
  isSender: boolean;
  image: string | null;
}
function MessageRow({ message, isSender, image }: MessageRowProps) {
  return (
    <div className={!isSender ? "message-row" : "message-row sender"}>
      <span className="profile-pic">
        {image ? <img src={image} alt="PROFILE" /> : null}
      </span>
      <div className="message">{message}</div>
    </div>
  );
}
