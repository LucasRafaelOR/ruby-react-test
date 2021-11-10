import { Button, Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getResponse, getForm } from "../utils/api";
import { Response } from "../model/Answer";
import SaveIcon from "@mui/icons-material/Save";
import JSONForm from "../components/JSONForm";
import { FullForm } from "../model/FullForm";

const NewResponsePage = () => {
  const formId = parseInt(useParams().form_id!);
  const navigate = useNavigate();
  const [response, setResponse] = useState<Response>();
  const [form, setForm] = useState<FullForm[]>();

  useEffect(() => {
    getForm(formId).then((resp) => {
      console.log(resp);
      setForm(resp.data.full_object);
    });
  }, [formId]);

  return (
    <Box>
      <Card sx={{ minWidth: "500px" }}>
        <CardContent>
          <CardHeader
            title="New Response"
            action={
              <Button
                variant="contained"
                color="primary"
                aria-label="new"
                onClick={() => navigate("/new")}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            }
          />
          {form !== undefined ? (
            <JSONForm
              jsonData={form}
              level={0}
              response={response}
              disabled={false}
            />
          ) : (
            <Skeleton />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewResponsePage;
