import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import { imagesType } from "../../../interfaces";
import axios from "axios";

interface Props {
  image: imagesType;
  setImage: React.Dispatch<React.SetStateAction<imagesType | null>>;
  chat_id: string;
}
export default function PopUp({ image, setImage, chat_id }: Props) {
  const downloadFile = async (filename: string) => {
    const id = chat_id;
    console.log(id);
    try {
      const response = await axios.post(`/api/download/${id}/${filename}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const donwloadImg = async () => {
    downloadFile(image.details.filename);
  };

  return (
    <div className="popup-image">
      <img src={image.imageData} alt="XDXD" />
      <IonIcon icon={close} onClick={() => setImage(null)} />
      <button onClick={() => donwloadImg()}>Download</button>
      {/* <a
        style={{ zIndex: "1111" }}
        href={`http://localhost:3500/api/download/${chat?._id}/${image.details.filename}`}
      >
        Download
      </a> */}
    </div>
  );
}
