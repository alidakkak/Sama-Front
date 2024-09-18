import { Box } from "@mui/material";
import React, { useState } from "react";
import PanelHeader from "../../UI/PanelHeader";
import FilterUI from "../../UI/FilterUI";
import DatePicker from "react-datepicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MUITable from "../../UI/MUITable";
import "react-datepicker/dist/react-datepicker.css";
import ChunkLayout from "../../Layout/ChunkLayout";

const Presence = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box>
      <PanelHeader title={"الحضور"} buttonContent={"اضافة حضور"} />

      <ChunkLayout>
        <Box>
          <FilterUI>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <Box sx={{ transform: "scale(0.82)" }}>
              <FormControl
                sx={{ minWidth: 120, fontSize: "1rem", padding: "0" }}
                size="small"
              >
                <InputLabel sx={{}} id="demo-select-small-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={age}
                  label="Age"
                  sx={{ padding: "0" }}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </FilterUI>
        </Box>
        <Box my="1rem">
          <MUITable columns={colums} data={data} />
        </Box>
      </ChunkLayout>
    </Box>
  );
};

export default Presence;

const colums = [
  { name: "المعرف", key: "id" },
  { name: "الاسم", key: "name" },
  { name: "اسم الاب", key: "father_name" },
  { name: "الدورة", key: "course" },
  { name: "وقت الدخول", key: "inter_time" },
  { name: "وقت الخروج", key: "exit_time" },
];

const data = [
  {
    id: "1",
    name: "صالح السيد",
    father_name: "وائل",
    course: "بكالوريا علمي",
    inter_time: "12:00",
    exit_time: "16:00",
  },
];
