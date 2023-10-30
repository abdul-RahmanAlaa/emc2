import { useState, useEffect } from "react";
import axiosInstance from "../Api/axios";

const Home = () => {
  const [images, setImages] = useState("");
  const [preview, setPreviews] = useState("");

  const UImg_URL = "post-create-image";

  // preview
  useEffect(() => {
    if (!images) return;

    let tmp = [];
    for (let i = 0; i < images.length; i++) {
      tmp.push(URL.createObjectURL(images[i]));
    }

    const imagesUrls = tmp;

    setPreviews(imagesUrls);

    //free memory
    return () => {
      for (let i = 0; i < imagesUrls.length; i++) {
        URL.revokeObjectURL(imagesUrls[i]);
      }
    };
  }, [images]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", images);
    await axiosInstance
      .post(UImg_URL, formData)
      .then((response) => {
        // Handle successful upload
        console.log(response.data);
      })
      .catch((error) => {
        // Handle upload error
        console.error("Error uploading image", error);
      });


  };

  return (
    <>
      <section>
        <form onSubmit={handelSubmit}>
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/webp"
            multiple
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImages(e.target.files);
              }
            }}
          />
          <div>
            {preview &&
              preview.map((image, index) => {
                return <img className="preview" key={index} src={image} />;
              })}
          </div>

          <button type="submit">submit</button>
        </form>
      </section>
    </>
  );
};

export default Home;
