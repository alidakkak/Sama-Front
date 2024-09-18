import { Box, Stack, Typography } from "@mui/material";
import { ThemeColor } from "../../../Assets/Theme/Theme";

const SelectSubjects = ({
  handleSelectSubject,
  subjectsIds,
  subjects,
  packageDetails,
}) => {
  const selectAllSubject = () => {
    const allSelected =
      subjectsIds.length === packageDetails?.data?.subjects.length;

    for (let i = 0; i < packageDetails?.data?.subjects.length; i++) {
      const element = packageDetails?.data?.subjects[i];
      handleSelectSubject(element.id, !allSelected);
    }
  };
  return (
    <Box>
      <Stack
        justifyContent={"flex-end"}
        alignItems={"center"}
        direction={"row"}
        mb={"1rem"}
        gap="5px"
        sx={{
          cursor: "pointer",
          borderBottom: "1px solid #eee",

          paddingBottom: "0.2rem",
          transition: "0.3s",
          borderColor:
            subjectsIds.length === packageDetails?.data?.subjects.length
              ? "gray"
              : "#eee",
          "&:hover": {
            borderColor: "gray",
            "&>div": {
              borderColor: ThemeColor.main,
            },
            "&>p": {
              color: ThemeColor.main,
            },
          },
        }}
        onClick={selectAllSubject}
      >
        <Typography
          sx={{
            fontSize: "0.8rem",
            color:
              subjectsIds.length === packageDetails?.data?.subjects.length
                ? ThemeColor.main
                : "gray",
            transition: "0.3s",
          }}
        >
          تحديد الكل
        </Typography>

        <Box
          sx={{
            width: "15px",
            height: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            transition: "0.3s",
            borderColor:
              subjectsIds.length === packageDetails?.data?.subjects.length
                ? ThemeColor.main
                : "#eee",
            background:
              subjectsIds.length === packageDetails?.data?.subjects.length
                ? ThemeColor.secondary
                : "",
          }}
        ></Box>
      </Stack>
      <Stack direction={"row"} flexWrap={"wrap"} gap={"1.4rem"}>
        {subjects?.length == 0 && <p>لا يوجد مواد</p>}
        {subjects?.map((item, i) => {
          let selectedStyle = {};
          if (subjectsIds.includes(item.id)) {
            selectedStyle = {
              borderColor: ThemeColor.main,
              background: ThemeColor.main,

              boxShadow: ThemeColor.boxShadow,
            };
          }
          return (
            <Stack
              onClick={() => {
                handleSelectSubject(item.id);
              }}
              sx={{
                border: "1px solid #ABABAB",
                padding: "0.4rem 0.5rem",
                borderRadius: "5px",
                textAlign: "right",
                background: "#fff",
                cursor: "pointer",
                transition: "0.3s",
                ...selectedStyle,
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
              key={i}
            >
              <Typography
                sx={{
                  color: subjectsIds.includes(item.id)
                    ? "white"
                    : ThemeColor.main,
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  color: subjectsIds.includes(item.id) ? "#eee" : "gray",

                  fontSize: "0.7rem",
                }}
              >
                جلسات{" "}
                <span style={{ fontWeight: "bold" }}>
                  {item.number_sessions_per_week}
                </span>
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SelectSubjects;
