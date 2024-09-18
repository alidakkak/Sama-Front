import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React from "react";
import { useGetActiveTeachersQuery } from "../../../Redux/Api/TeachersApi";
import Loader from "../../../UI/Loader";

const AddTeacherToSubjectForm = ({ triggerApi }) => {
  const { data: teachers, isLoading: isLoadingGet } =
    useGetActiveTeachersQuery();
  const [teacherId, setTeacherId] = React.useState("");

  const handleChange = (event) => {
    setTeacherId(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    triggerApi(teacherId);
  };

  if (isLoadingGet) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ position: "relative" }} mb="1.5rem">
        <FormControl sx={{ zIndex: "2005" }} fullWidth>
          <InputLabel id="demo-simple-select-label">تعيين استاذ</InputLabel>
          <Select
            sx={{ background: "#fff" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="تعيين استاذ"
            size={"small"}
            onChange={handleChange}
            value={teacherId}
          >
            {teachers?.data?.map((item, i) => {
              return (
                <MenuItem key={i} sx={{ zIndex: "2005" }} value={item.id}>
                  {`${item.first_name} ${item.last_name}`}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      <Box sx={{ textAlign: "center" }}>
        <Button
          size="small"
          variant="contained"
          type="submit"
          className="submitButton"
        >
          موافق
        </Button>
      </Box>
    </form>
  );
};

export default AddTeacherToSubjectForm;
