import { imagesType } from "../../../interfaces";
import { useEffect } from "react";
import { useChat } from "../../../context/ChatContext";

interface RightContentProps {
  images: imagesType[];
  setImage: React.Dispatch<React.SetStateAction<imagesType | null>>;
  fetchImages: (chat_id: string) => void;
}

export default function RightContent({
  images,
  setImage,
  fetchImages,
}: RightContentProps) {
  const { chat } = useChat();

  useEffect(() => {
    if (chat?._id) {
      fetchImages(chat._id);
    }
  }, [chat]);

  return (
    <div className="content">
      <div className="media">
        {images.length > 0
          ? images.map((image: imagesType, index: number) => (
              <Image
                key={index}
                src={image.imageData}
                onClick={() => setImage(image)}
              />
            ))
          : null}
      </div>
    </div>
  );
}

interface ImageProps {
  src: string;
  onClick: () => void;
}

function Image({ src, onClick }: ImageProps) {
  return (
    <div className="image-box" onClick={onClick}>
      <img src={src} alt="image" />
    </div>
  );
}
