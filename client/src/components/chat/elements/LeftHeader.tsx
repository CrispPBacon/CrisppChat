import { IonIcon } from "@ionic/react";
import { close, ellipse, menuSharp, search } from "ionicons/icons";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";

export default function LeftHeader() {
  const [menu, setMenu] = useState(false);
  const { logout } = useAuth();
  const { searchValue, setSearchValue } = useChat();

  return (
    <div className="header">
      <div className="title">
        <h1>Chats</h1>
        <IonIcon icon={menuSharp} onClick={() => setMenu(!menu)} />
        {menu ? (
          <ul>
            <li onClick={logout}>Logout</li>
          </ul>
        ) : null}
      </div>
      <span id="search-bar">
        <IonIcon icon={search} id="search-icon" />
        <input
          type="text"
          placeholder="Search user or chat"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IonIcon
          icon={close}
          id="search-clear"
          onClick={() => setSearchValue("")}
        />
      </span>
      {searchValue ? null : (
        <span id="newMessage">
          <h4 style={{ letterSpacing: "2px", fontWeight: "300" }}>New</h4>
          <IonIcon icon={ellipse} />
          <span>1</span>
        </span>
      )}
    </div>
  );
}
