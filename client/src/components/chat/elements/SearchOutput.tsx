import { IonIcon } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { userProp } from "../../../interfaces";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../../context/ChatContext";

interface Props {
  searchResult: userProp[];
}
export default function SearchOutput({ searchResult }: Props) {
  const { setSearchValue } = useChat();
  const navigate = useNavigate();
  return (
    <div className="main">
      {searchResult.length > 0
        ? searchResult.map((obj) => (
            <People
              fullname={obj.fullname}
              image={null}
              onSelect={() => {
                navigate(`/m/${obj._id}`);
                setSearchValue("");
              }}
              key={obj._id}
            />
          ))
        : null}
    </div>
  );
}

interface PeopleProps {
  fullname: string;
  image: string | null;
  onSelect: () => void;
}
function People({ fullname, image, onSelect }: PeopleProps) {
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
        <h1>{fullname}</h1>
      </div>
    </div>
  );
}
