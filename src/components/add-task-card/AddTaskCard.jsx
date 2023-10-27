import React, { useState, useContext } from "react";

// CSS
import "./addTaskCard.css";

// FONT
import "@fontsource/inter/"; // Specify weight

// IMPORTED LOCAL CONTEXTS
import { TodoAppContext } from "../../components/contexts/TodoAppContext";

// MUI IMPORTS
import {
  Alert,
  Divider,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import Snackbar from "@mui/material/Snackbar";

// DATE PICKER
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { month } from "../../data/currentDateData";

// ICONS
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const AddTaskCard = ({ taskTitle, taskDescription }) => {
  const [dueDateTime, setDueDateTime] = React.useState(null);
  // TITLE STATE
  const [title, setTitle] = useState(taskTitle);

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  // DESCRIPOTION STATE
  const [description, setDescription] = useState(taskDescription);

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  //ADD BUTTON CONTEXT
  const { toggleAddTaskButton, allTodos, setAllTodos } =
    useContext(TodoAppContext);

  // MUI THEME
  const theme = createTheme({
    typography: {
      fontFamily: "Inter",
    },
    palette: {
      primary: {
        light: "#7780e8",
        main: "#5763e3",
        dark: "#3545dc",
        contrastText: "#fff",
      },
    },
  });

  // Snackbar Toggle
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // SAVE CLICK HANDLER
  const handleSaveClick = () => {
    setSnackbarOpen(true);
    const now = new Date();
    const date = new Date(dueDateTime);
    const dueTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    console.log(
      "From AddTaskCard-Save: " +
        now +
        " " +
        title +
        " " +
        description +
        " " +
        dueTime +
        " " +
        date.getDate() +
        " " +
        month[date.getMonth()].substring(0, 3) +
        date.getFullYear()
    );
    setAllTodos([
      ...allTodos,
      {
        id: now,
        title: title,
        description: description,
        dueTime: dueTime,
        dueDate: date.getDate(),
        dueMonth: month[date.getMonth()].substring(0, 3),
        dueYear: date.getFullYear(),
      },
    ]);
    setTitle("");
    setDescription("");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Card
          sx={{
            border: 1,
            borderColor: "grey.300",
            maxWidth: "100%",
            marginTop: "1rem",
            boxShadow: 0,
          }}
        >
          <CardContent>
            <div className="todo-item-header">
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              ></div>
              <TextField
                id="standard-basic"
                label="Title"
                maxRows={4}
                multiline
                variant="standard"
                value={title}
                onChange={handleTitle}
                required
              />
              <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                variant="standard"
                sx={{ marginTop: ".5rem" }}
                value={description}
                onChange={handleDescription}
              />
            </div>
          </CardContent>

          <Divider />

          <div className="card-bottom">
            <div className="card-bottom-left">
              <CardActions>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Due Date and Time"
                      slotProps={{ textField: { size: "small" } }}
                      value={dueDateTime}
                      onChange={(newValue) => setDueDateTime(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </CardActions>
            </div>

            <div className="card-bottom-right">
              <CardActions>
                <Button
                  size="small"
                  sx={{ fontWeight: 600, color: "#5762E3" }}
                  onClick={toggleAddTaskButton}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={handleSaveClick}
                  sx={{ fontWeight: 600 }}
                  disabled={title === ""}
                >
                  Add task
                </Button>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={3000}
                  onClose={handleSnackbarClose}
                >
                  <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{ width: "100%" }}
                    variant="filled"
                  >
                    Your task is successfully added!
                  </Alert>
                </Snackbar>
              </CardActions>
            </div>
          </div>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default AddTaskCard;
