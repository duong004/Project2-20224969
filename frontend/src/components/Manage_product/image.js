// ImageUpload.js
import React, { useState } from "react";

const ImageUpload = () => {
  const CLOUD_NAME = "ddgrjo6jr";
  const UPLOAD_PRESET = "my-app";
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Vui lòng chọn một hình ảnh để tải lên.");
      return;
    }
console.log(image);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData, // Gửi FormData trực tiếp mà không cần JSON.stringify
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi tải lên hình ảnh.");
      }

      const data = await response.json(); // Chuyển đổi phản hồi thành JSON
      setUrl(data.secure_url);
      console.log("Uploaded Image URL:", data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Đã xảy ra lỗi khi tải lên hình ảnh.");
    }
  };

  return (
    <div>
      <h2>Tải lên hình ảnh với Cloudinary</h2>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Tải lên</button>
      {url && (
        <div>
          <h3>Hình ảnh đã tải lên:</h3>
          <img src={url} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;



