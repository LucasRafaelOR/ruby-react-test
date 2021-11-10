import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { DBValue, FullForm } from "../model/FullForm";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { Response } from "../model/Answer";

type JSONFormProps = {
  jsonData: FullForm[];
  response?: Response;
  level: number;
  disabled?: boolean;
};

const JSONForm = ({ jsonData, level = 0, disabled = true }: JSONFormProps) => {
  const [formData, setFormData] = useState<FullForm[]>(jsonData);
  const [keyCounter, setKeyCounter] = useState<number>(0);
  const FORM_VALUES = [];

  const bgColors = ["#303030", "#252525"];

  useEffect(() => {
    setFormData(jsonData);
  }, [jsonData]);

  const styles: { [key: string]: SxProps } = {
    rootContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginLeft: 5,
      paddingX: "10px",
      marginBottom: "5px",
      backgroundColor: bgColors[level % 2],
    },
  };

  const displayKey = (kvp: FullForm) => {
    return (
      <FormControl variant="outlined" disabled={disabled}>
        <InputLabel htmlFor="outlined-adornment-password">Key</InputLabel>
        <OutlinedInput
          name={`form[${kvp.value.id}][key]`}
          type={kvp.key.type === "integer" ? "number" : kvp.key.type}
          endAdornment={
            kvp.key.multiple ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    appendKey(kvp);
                  }}
                  color="secondary"
                  edge="end"
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ) : (
              ""
            )
          }
          label="Key"
        />
      </FormControl>
    );
  };

  const displayValue = (
    v: DBValue,
    label?: string,
    children?: FullForm[],
    multiple?: boolean
  ) => {
    if (v.type === "child") {
      return (
        <>
          {label ? <Typography variant="h6">{label}</Typography> : ""}
          <JSONForm
            level={level + 1}
            jsonData={children!}
            disabled={disabled}
          />
        </>
      );
    } else {
      return (
        <TextField
          name={`form[${v.id}][value]${multiple ? "[]" : ""}`}
          label={label ? label : "Value"}
          variant="outlined"
          type={v.type === "integer" ? "number" : v.type}
          disabled={disabled}
        />
      );
    }
  };

  const displayKeyValue = (kvp: FullForm) => {
    return (
      <>
        {kvp.key.mutable ? displayKey(kvp) : ""}
        {displayValue(
          kvp.value,
          kvp.key.default,
          kvp.children,
          kvp.key.multiple
        )}
      </>
    );
  };

  const appendKey = (kvp: FullForm) => {
    setFormData([...formData, kvp]);
    setKeyCounter(keyCounter + 1);
  };

  return (
    <Box
      component={level === 0 ? "form" : "div"}
      sx={level === 0 ? styles.rootContainer : styles.container}
      id={"jsonFORM" + (level !== 0 ? `_child_${level}` : "")}
    >
      {formData.map((i, idx) => {
        return (
          <Box sx={{ marginTop: "10px" }} key={idx}>
            {displayKeyValue(i)}
          </Box>
        );
      })}
    </Box>
  );
};

export default JSONForm;
