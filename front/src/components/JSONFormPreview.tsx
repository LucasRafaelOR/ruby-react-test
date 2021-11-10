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
import { KeyValuePair, Value } from "../model/KeyValuePair";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

type JSONFormProps = {
  jsonData: KeyValuePair[];
  level: number;
  levelName?: string;
};

const JSONFormPreview = ({ jsonData, level, levelName }: JSONFormProps) => {
  const [formData, setFormData] = useState<KeyValuePair[]>(jsonData);
  const [keyCounter, setKeyCounter] = useState<number>(0);

  const bgColors = ["#303030", "#252525"];

  levelName = typeof levelName === "undefined" ? "" : levelName;

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

  const displayKey = (kvp: KeyValuePair) => {
    return (
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Key</InputLabel>
        <OutlinedInput
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
    v: Value,
    label?: string,
    children?: KeyValuePair[],
    multiple?: boolean
  ) => {
    if (v.type === "child") {
      return (
        <>
          {label ? <Typography variant="h6">{label}</Typography> : ""}
          <JSONFormPreview
            level={level + 1}
            jsonData={children!}
            levelName={label ? `${levelName}[${label}]` : `value[${level}]`}
          />
        </>
      );
    } else {
      return (
        <TextField
          label={label ? label : "Value"}
          variant="outlined"
          value={v.default}
          type={v.type === "integer" ? "number" : v.type}
          name={`${levelName}${multiple ? `[${keyCounter}]` : ""}[${
            label ? label : `value`
          }]`}
        />
      );
    }
  };

  const displayKeyValue = (kvp: KeyValuePair) => {
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

  const appendKey = (kvp: KeyValuePair) => {
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

export default JSONFormPreview;
