import React, { useContext, useState } from "react";
import "./write.scss";
import { DarkModeContext } from "../../context/createContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import imagePreview from "../../resource/placeholder.jpeg";
import TextEditor from "../../components/textEditor/TextEditor";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const steps = ["Setup", "Write", "Publish"];

const Write = () => {
  const { currentMode } = useContext(DarkModeContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  // TODO TEXT EDITOR FUNCTION START
  const handleEditorChange = (value) => {
    setContent(value);
  };
  // TODO TEXT EDITOR FUNCTION END
  const handleNext = () => {
    window.scrollTo(0, 0);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    window.scrollTo(0, 0);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = async () => {
    const imgUrl = await upload();
    const dataPost = {
      title: title,
      description: content,
      img: imgUrl ? imgUrl : file,
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      category: category,
    };

    await axios.post("/posts", dataPost);
    navigate("/");
    // setActiveStep(0);
  };

  return (
    <div className={`writepage ${currentMode && "dark"}`}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step
                key={label}
                sx={{
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: "teal", // circle color (COMPLETED)
                  },
                  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                    {
                      color: "blue", // Just text label (COMPLETED)
                    },
                  "& .MuiStepLabel-root .Mui-active": {
                    color: "teal", // circle color (ACTIVE)
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    {
                      color: "blue", // Just text label (ACTIVE)
                    },
                  "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                    fill: "white", // circle's number (ACTIVE)
                  },
                }}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, textAlign: "center" }}>
              All steps completed - you&apos;re finished <br />
              Click Finish to upload your creation
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Finish</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, padding: "10px" }}>
              {activeStep === 0 && (
                <div className="firstStep">
                  <div className="inputContainer">
                    <label
                      className="fileUpload"
                      style={{
                        backgroundImage: `url(${
                          file ? URL.createObjectURL(file) : imagePreview
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}>
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                  </div>
                  <div className="another">
                    <input
                      type="text"
                      placeholder="Title"
                      className="inputTitle"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <FormControl
                      fullWidth
                      sx={{ m: 1, minWidth: 120 }}
                      size="small"
                      className="formSelect">
                      <InputLabel id="demo-select-small-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}>
                        <MenuItem value={"programming"}>Programming</MenuItem>
                        <MenuItem value={"design"}>Design</MenuItem>
                        <MenuItem value={"technology"}>Technology</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}
              {activeStep === 1 && (
                <div className="secondStep">
                  <TextEditor value={content} onChange={handleEditorChange} />
                </div>
              )}
              {activeStep === 2 && (
                <div className="thirdStep">
                  <div className="imagePreview">
                    <img
                      src={file ? URL.createObjectURL(file) : imagePreview}
                      alt="imagePreview"
                    />
                  </div>
                  <h1 className="title">{title}</h1>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(content),
                    }}></div>
                </div>
              )}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, color: `${currentMode ? "white" : "black"}` }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Publish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
};

export default Write;
