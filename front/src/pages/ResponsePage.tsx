import { Button, Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getResponse, getForm } from "../utils/api";
import { Response } from "../model/Answer";
import SaveIcon from "@mui/icons-material/Save";
import JSONForm from "../components/JSONForm";
import { FullForm } from "../model/FullForm";

const ResponsePage = () => {
  const formId = parseInt(useParams().form_id!);
  const id = parseInt(useParams().id!);
  const navigate = useNavigate();
  const [response, setResponse] = useState<Response>();
  const [form, setForm] = useState<FullForm[]>();

  useEffect(() => {
    getForm(formId).then((resp) => {
      setForm(resp.data.full_object);
    });

    getResponse(id).then((resp) => {
      setResponse(resp.data);
    });
  }, [id]);

  return (
    <Box>
      <Card sx={{ minWidth: "500px" }}>
        <CardContent>
          <CardHeader
            title={`Response: ${id}`}
            action={
              <Button
                variant="contained"
                color="primary"
                aria-label="new"
                onClick={() => navigate("/new")}
                startIcon={<SaveIcon />}
              >
                Edit
              </Button>
            }
          />
          {form ? (
            <JSONForm
              jsonData={form}
              level={0}
              response={response}
              disabled={true}
            />
          ) : (
            <Skeleton />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResponsePage;
