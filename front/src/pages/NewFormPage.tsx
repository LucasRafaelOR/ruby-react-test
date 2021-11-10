import {
  Card,
  CardContent,
  CardHeader,
  Alert,
  Box,
  Button,
  CardActions,
  AlertTitle,
  TextField,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { useState } from "react";
import {
  PlayArrow as PlayArrowIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import AceEditor from "react-ace";
import { Ace, edit } from "ace-builds";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-twilight";
import * as AceBeautify from "ace-builds/src-noconflict/ext-beautify";

import JSONFormPreview from "../components/JSONFormPreview";
import { KeyValuePair } from "../model/KeyValuePair";
import { NewFormParams, newForm } from "../utils/api";

const styles: { [key: string]: SxProps } = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexDirection: { xs: "column", md: "row" },
  },
  card: {
    minWidth: "250px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

const NewFormPage = () => {
  const [jsonData, setJsonData] = useState<KeyValuePair[]>([]);
  const [draftJson, setDraftJson] = useState<string>("");
  const [errorString, setErrorString] = useState<string>("");
  const [titleText, setTitleText] = useState<string>("");
  const navigate = useNavigate();

  const validateJson = () => {
    let obj: KeyValuePair[];
    let editor: Ace.Editor = edit("jsonEditor");
    try {
      obj = JSON.parse(draftJson);
      setJsonData(obj);
      setErrorString("");
      AceBeautify.beautify(editor.session);
      return true;
    } catch (error: any) {
      setJsonData([]);
      setErrorString(error?.message as string);
      return false;
    }
  };

  const handleJsonChange = (value: string) => {
    setDraftJson(value);
  };

  const save = () => {
    if (!validateJson()) return;

    let obj: KeyValuePair[] = JSON.parse(draftJson);

    const data: NewFormParams = {
      name: titleText,
      data: obj,
    };
    console.log(data);
    newForm(data).then(() => {
      navigate("/");
    });
  };

  return (
    <Box sx={styles.mainContainer}>
      <Card sx={styles.card} component="form">
        <CardHeader
          title="New Form"
          action={
            <Button
              color="secondary"
              variant="outlined"
              endIcon={<PlayArrowIcon />}
              onClick={validateJson}
            >
              Preview
            </Button>
          }
        />
        <CardContent>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            label="Title"
            variant="outlined"
            value={titleText}
            onChange={(e) => {
              setTitleText(e.target.value);
            }}
            required
          />
          <AceEditor
            placeholder="Input the JSON specification for the form"
            mode="json"
            theme="twilight"
            name="jsonEditor"
            onChange={(v) => handleJsonChange(v)}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={draftJson}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
          {errorString ? (
            <Alert sx={{ mt: 1 }} severity="error">
              <AlertTitle>Error</AlertTitle>
              {errorString}
            </Alert>
          ) : (
            ""
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button startIcon={<CloseIcon />} onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => {
              save();
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
      <Card sx={styles.card}>
        <CardHeader title="Preview" />
        <CardContent>
          {Object.keys(jsonData).length === 0 ? (
            "Input some valid JSON!"
          ) : (
            <Box sx={styles.formContainer}>
              <JSONFormPreview level={0} jsonData={jsonData} />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewFormPage;
