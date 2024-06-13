import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { IonIcon } from "@ionic/react";
import { attachOutline, happyOutline, send } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { messageType } from "../../../interfaces";
import { useChat } from "../../../context/ChatContext";
import { socket } from "../../../socket";
import { useAuth } from "../../../context/AuthContext";
import { handleImgRequest } from "../../../api/posts";

type WriteBoxType = {
  setMessages: React.Dispatch<React.SetStateAction<messageType[]>>;
  fetchImages: (chat_id: string) => {};
};
export default function WriteBox({ setMessages, fetchImages }: WriteBoxType) {
  const writeBoxRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showEmoji, setShowEmoji] = useState(false);

  const { chat } = useChat();
  const { user } = useAuth();

  const onSend = (message: string | undefined) => {
    if (!chat || !message) {
      console.log("%cMissing input for sending message", "color: red;");
      return;
    }
    writeBoxRef.current!.innerText = "";
    socket.emit(
      "send_message",
      {
        room_id: chat._id,
        sender_id: user?._id,
        receiver_id:
          chat.members[0] !== user?._id ? chat.members[0] : chat.members[1],
        message: message,
      },
      (response: messageType) => {
        if (response) {
          setMessages((prev) => [...prev, response]);
        }
      }
    );
  };

  useEffect(() => {
    socket.on("message_sent_response", () => {
      if (chat?._id) {
        fetchImages(chat._id);
      }
    });
    return () => {
      socket.off("message_sent_response");
    };
  }, [socket]);

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13 && event.shiftKey) {
      event.preventDefault();
      document.execCommand("insertHTML", false, "<br><br>");
      return;
    }
    if (event.keyCode === 13) {
      event.preventDefault();
      const text = writeBoxRef.current?.innerText;
      onSend(text);
      return;
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    writeBoxRef.current!.innerText += emoji.native;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }

    await handleImgRequest(`/api/upload/chatrooms/${chat?._id}`, file)
      .then((res) => {
        console.log(res);
        if (chat?._id) {
          fetchImages(chat._id);
          socket.emit("upload_image", chat.members);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    event.target.value = "";
  };

  return (
    <div className="middle-footer">
      <div
        id="write-box"
        contentEditable
        data-placeholder="Enter text here..."
        ref={writeBoxRef}
        onKeyDown={handleKeyDown}
      />
      <span id="write-box-attr">
        <span className="write-emoji-container">
          {showEmoji ? (
            <span>
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </span>
          ) : null}
          <IonIcon
            id="write-emoji"
            icon={happyOutline}
            onClick={() => setShowEmoji(!showEmoji)}
          />
        </span>
        <span>
          <IonIcon
            id="write-attach"
            icon={attachOutline}
            onClick={() => {
              fileInputRef.current?.click();
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </span>
        <IonIcon
          id="write-send"
          icon={send}
          onClick={() => console.log(writeBoxRef.current?.innerText)}
        />
      </span>
    </div>
  );
}
