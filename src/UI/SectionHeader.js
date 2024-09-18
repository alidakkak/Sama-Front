import { Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const SectionHeader = ({ title, buttonContent, onClickButton, disabled }) => {
  return (
    <>
      {" "}
      <Stack
        alignItems="center"
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Typography
          sx={{
            textAlign: "right",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        {buttonContent ? (
          <Button
            variant="contained"
            onClick={onClickButton}
            className="mainButton"
            disabled={disabled ? disabled : false}
          >
            {buttonContent}
          </Button>
        ) : (
          <div></div>
        )}
      </Stack>
      <Divider sx={{ margin: "1rem 0" }} />
    </>
  );
};

export default SectionHeader;
