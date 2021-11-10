import {
  Card,
  CardContent,
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { getForms } from "../utils/api";
import { DBForm } from "../model/Form";
import { useNavigate } from "react-router";

const HomePage = () => {
  const [forms, setForms] = useState<DBForm[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getForms().then((f) => {
      setForms(f.data);
    });
  }, []);

  return (
    <Card sx={{ minWidth: "500px" }}>
      <CardHeader
        title="Registered Forms"
        action={
          <Button
            variant="contained"
            color="primary"
            aria-label="new"
            onClick={() => navigate("/new")}
            startIcon={<AddIcon />}
          >
            New
          </Button>
        }
      />
      <CardContent>
        <List>
          {forms.map((f: DBForm) => {
            return (
              <ListItem key={f.id}>
                <ListItemButton
                  sx={{ width: "100%" }}
                  onClick={(event) => {
                    navigate(`/form/${f.id}`);
                  }}
                >
                  <ListItemText primary={f.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default HomePage;
