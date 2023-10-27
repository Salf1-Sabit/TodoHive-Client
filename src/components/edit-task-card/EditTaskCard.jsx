import React, { useState, useContext } from "react";

// CSS
import "./editTaskCard.css";

// FONT
import "@fontsource/inter/"; // Specify weight

// IMPORTED LOCAL CONTEXTS
import { TodoAppContext } from "../../components/contexts/TodoAppContext";
import { TodoCardContext } from "../../components/contexts/TodoCardContext";

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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// TIME PICKER
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

// ICONS
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const AddTaskCard = ({ taskTitle, taskDescription }) => {
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
  const { allTodos, setAllTodos } = useContext(TodoAppContext);
  const { toggleEditTaskButton } = useContext(TodoCardContext);

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

  const handleSaveClick = () => {
    setSnackbarOpen(true);
    const now = new Date();
    console.log(now, title, description);
    setAllTodos([
      ...allTodos,
      { id: now, title: title, description: description },
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
                  <DatePicker
                    label="Due date"
                    sx={{ width: 2 / 6 }}
                    slotProps={{ textField: { size: "small" } }}
                  />
                  <MobileTimePicker
                    label="Time"
                    sx={{ width: 2 / 6 }}
                    slotProps={{ textField: { size: "small" } }}
                  />
                </LocalizationProvider>
              </CardActions>
            </div>

            <div className="card-bottom-right">
              <CardActions>
                <Button
                  size="small"
                  sx={{ fontWeight: 600, color: "#5762E3" }}
                  onClick={toggleEditTaskButton}
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
                    Your task is successfully updated!
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
