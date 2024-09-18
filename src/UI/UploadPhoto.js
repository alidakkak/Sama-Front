import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ThemeColor } from "../Assets/Theme/Theme";

const UploadPhoto = ({ handleUpladPic, defaultImage }) => {
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState(defaultImage);

  useEffect(() => {
    if (image) {
      setImagePath(URL.createObjectURL(image));
    }
  }, [image]);
  return (
    <Box
      sx={{
        border: `3px dashed ${ThemeColor.main}`,
        backgroundImage: `url(${imagePath})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "90%",
        height: "200px",
        margin: "1rem auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={() => {
        inputRef.current.click();
      }}
    >
      {!imagePath && "تحميل صورة"}
      <input
        onChange={(e) => {
          setImage(e.target.files[0]);
          if (handleUpladPic) handleUpladPic(e.target.files[0]);
        }}
        accept="image/*"
        type="file"
        hidden
        ref={inputRef}
      />
    </Box>
  );
};

export default UploadPhoto;
