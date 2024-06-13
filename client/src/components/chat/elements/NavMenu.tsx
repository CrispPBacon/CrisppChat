import { IonIcon } from "@ionic/react";
import { chatbubbleEllipses, people } from "ionicons/icons";

export default function NavMenu() {
  return (
    <>
      <span>
        <IonIcon icon={chatbubbleEllipses} />
      </span>
      <span>
        <IonIcon icon={people} />
      </span>
    </>
  );
}
