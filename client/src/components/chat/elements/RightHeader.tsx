import { IonIcon } from "@ionic/react";
import { add, chevronForward, settings } from "ionicons/icons";

export default function RightHeader() {
  return (
    <div className="header">
      <span id="exit-right">
        <IonIcon className="slide-arrow" icon={chevronForward} />
        <IonIcon className="slide-arrow" icon={chevronForward} />
      </span>
      <span className="profile-pic">
        <img src="/images/Instagram.jfif" alt="FRiEND" />
      </span>
      <span style={{ marginTop: ".5rem" }}>
        <IonIcon
          icon={add}
          className="circle-icon"
          style={{ backgroundColor: "rgba(76, 76, 172, 0.33)" }}
        />
        &nbsp;
        <IonIcon
          icon={settings}
          className="circle-icon"
          style={{ color: "#999999" }}
        />
      </span>
    </div>
  );
}
