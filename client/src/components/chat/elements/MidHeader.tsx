import { useEffect, useState } from "react";
import { useChat } from "../../../context/ChatContext";
// import { send_data } from "../../../api/posts";

export default function MidHeader() {
  const [name, setName] = useState("");
  const { chat } = useChat();

  useEffect(() => {
    if (chat?.person_name) {
      setName(chat.person_name);
    }
  }, [chat]);

  return (
    <div className="conversation-header">
      <div className="conversation-head group">
        <span className="profile-pic">
          <img src="/images/profile.jfif" alt="PROFILE" />
        </span>
        <span>
          <h1>{name}</h1>
        </span>
      </div>
    </div>
  );
}
