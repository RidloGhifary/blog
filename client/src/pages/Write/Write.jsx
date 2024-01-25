import React, { useContext, useState } from "react";
import "./write.scss";
import { DarkModeContext } from "../../context/createContext";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import imagePreview from "../../resource/placeholder.jpeg";
import CloseIcon from "@mui/icons-material/Close";
import TextEditor from "../../components/textEditor/TextEditor";

const steps = ["Setup", "Write", "Publish"];

const Write = () => {
  const { currentMode } = useContext(DarkModeContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(imagePreview);
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
    }
  };

  // TODO TAGS FUNCTION START
  const [tags, setTags] = useState([]);
  const handleKeyDown = (event) => {
    console.log(event);
    if (event.key === "Enter") {
      setTags([...tags, event.target.value.trim()]);
      event.target.value = "";
    }
  };

  const handleDeleteTags = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };
  // TODO TAGS FUNCTION END

  // TODO TEXT EDITOR FUNCTION START
  const [content, setContent] = useState("");
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
  const handleReset = () => {
    setActiveStep(0);
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
                        backgroundImage: `url(${file})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}>
                      <input type="file" name="file" onChange={handleChange} />
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
                    <div className="tagsContainer">
                      <input
                        type="text"
                        placeholder="Tags"
                        disabled={tags.length >= 5}
                        onKeyDown={handleKeyDown}
                      />
                      <div className="tags">
                        {tags?.map((tag, index) => (
                          <span className="tag" key={index}>
                            #{tag}
                            <CloseIcon
                              className="delete"
                              onClick={() => handleDeleteTags(index)}
                            />
                          </span>
                        ))}
                      </div>
                    </div>
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
                    <img src={file} alt="imagePreview" />
                  </div>
                  <h1 className="title">Lorem ipsum doler sir amet</h1>
                  <div className="content">
                    Section 1.10.32 of "de Finibus Bonorum et Malorum", written
                    by Cicero in 45 BC "Sed ut perspiciatis unde omnis iste
                    natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo
                    inventore veritatis et quasi architecto beatae vitae dicta
                    sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                    aspernatur aut odit aut fugit, sed quia consequuntur magni
                    dolores eos qui ratione voluptatem sequi nesciunt. Neque
                    porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                    consectetur, adipisci velit, sed quia non numquam eius modi
                    tempora incidunt ut labore et dolore magnam aliquam quaerat
                    voluptatem. Ut enim ad minima veniam, quis nostrum
                    exercitationem ullam corporis suscipit laboriosam, nisi ut
                    aliquid ex ea commodi consequatur? Quis autem vel eum iure
                    reprehenderit qui in ea voluptate velit esse quam nihil
                    molestiae consequatur, vel illum qui dolorem eum fugiat quo
                    voluptas nulla pariatur?" 1914 translation by H. Rackham
                    "But I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness. No one rejects, dislikes,
                    or avoids pleasure itself, because it is pleasure, but
                    because those who do not know how to pursue pleasure
                    rationally encounter consequences that are extremely
                    painful. Nor again is there anyone who loves or pursues or
                    desires to obtain pain of itself, because it is pain, but
                    because occasionally circumstances occur in which toil and
                    pain can procure him some great pleasure. To take a trivial
                    example, which of us ever undertakes laborious physical
                    exercise, except to obtain some advantage from it? But who
                    has any right to find fault with a man who chooses to enjoy
                    a pleasure that has no annoying consequences, or one who
                    avoids a pain that produces no resultant pleasure?"
                  </div>
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
