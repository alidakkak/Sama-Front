import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

const SearchBar = () => {
  const [active, setActive] = useState(false);

  return (
    <Paper
      component="form"
      sx={{
        p: "0px 4px",
        background: "#f4f5fc",
        display: "flex",
        alignItems: "center",
        width: "70%",
        borderRadius: "15px",
        border: "none",
        boxShadow: "none",
        transition: "0.3s",
        boxShadow: active ? "0 0 30px -4px #7e7e7e" : "0 0 16px -1px #d1d0db",
        outline: active ? "1px solid #754a8b82" : "",
      }}
      onClick={() => {
        setActive(!active);
      }}
    >
      <IconButton type="button" sx={{ p: "12px 10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className="test"
        sx={{ mr: 1, flex: 1, textAlign: "right" }}
        size="small"
        placeholder="ابحث هنا"
        inputProps={{ "aria-label": "ابحث هنا", dir: "rtl" }}
      />
    </Paper>
  );
};

export default SearchBar;
