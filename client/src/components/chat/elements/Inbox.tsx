import { IonIcon } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import TimeAgo from "react-timeago";
import { inboxProps } from "../../../interfaces";
import { useNavigate } from "react-router-dom";

type inboxType = { inbox: inboxProps[] };
export default function Inbox({ inbox }: inboxType) {
  const navigate = useNavigate();

  return (
    <div className="main inbox">
      {/* <Conversation
        fullname="Allan Soriano"
        recentMsg="Hello World"
        image={"/images/profile.jfif"}
        timestamp="2024-06-02T07:22:00.887+00:00"
        onSelect={() => {
          alert("HELLO");
        }}
      /> */}
      {inbox.length > 0
        ? inbox
            .sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
            .map((obj, key_id) => (
              <Conversation
                fullname={obj.fullname}
                recentMsg={
                  obj.content.length > 18
                    ? obj.content.slice(0, 17) + "..."
                    : obj.content
                }
                image={null}
                timestamp={obj.timestamp}
                onSelect={() => {
                  navigate(`/m/${obj.person_id}`);
                }}
                key={key_id}
                seen={obj.person_id === obj.sender_id ? obj.seen : true}
              />
            ))
        : null}
    </div>
  );
}

interface ConversationProps {
  fullname: string;
  recentMsg: string | null;
  timestamp: string | null;
  image: string | null;
  seen: boolean;
  onSelect: () => void;
}
function Conversation({
  fullname,
  recentMsg,
  timestamp,
  image,
  seen,
  onSelect,
}: ConversationProps) {
  return (
    <div className="profile" onClick={onSelect}>
      <span>
        {image ? (
          <img src={image} alt="PROFILE" />
        ) : (
          <IonIcon icon={personCircleOutline} />
        )}
      </span>
      <div className="profile-details">
        <h1 style={!seen ? { color: "white", fontWeight: "400" } : {}}>
          {fullname}
        </h1>
        {recentMsg ? (
          <p style={!seen ? { color: "white", fontWeight: "400" } : {}}>
            {recentMsg}
          </p>
        ) : null}
        {timestamp ? (
          <span style={!seen ? { color: "white", fontWeight: "400" } : {}}>
            <TimeAgo date={timestamp} />
          </span>
        ) : null}
      </div>
    </div>
  );
}
