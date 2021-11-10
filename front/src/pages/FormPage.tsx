import {
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { Box } from "@mui/system";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getForm, getResponsesByFormId } from "../utils/api";
import { Response } from "../model/Answer";
import AddIcon from "@mui/icons-material/Add";

const FormPage = () => {
  const id = parseInt(useParams().id!);
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Response[]>();
  const [name, setname] = useState<string>();

  useEffect(() => {
    getForm(id).then((resp) => {
      setname(resp.data.name);
    });
    getResponsesByFormId(id).then((resp) => {
      setResponses(resp.data);
    });
  }, [id]);

  return (
    <Box>
      <Card sx={{ minWidth: "500px" }}>
        <CardContent>
          <CardHeader
            title={name}
            action={
              <Button
                variant="contained"
                color="primary"
                aria-label="new"
                onClick={() => {
                  navigate(`/form/${id}/new/`);
                }}
                startIcon={<AddIcon />}
              >
                New
              </Button>
            }
          />
          <List>
            {responses?.map((r: Response) => {
              return (
                <ListItem key={r.id}>
                  <ListItemButton
                    sx={{ width: "100%" }}
                    onClick={(event) => {
                      navigate(`/form/${id}/responses/${r.id}`);
                    }}
                  >
                    <ListItemText primary={r.id} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormPage;
