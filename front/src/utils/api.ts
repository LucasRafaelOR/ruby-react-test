import axios from "axios";
import { Response } from "../model/Answer";
import { DBForm } from "../model/Form";
import { FullForm } from "../model/FullForm";
import { KeyValuePair } from "../model/KeyValuePair";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const getForms = () => {
  return instance.get<DBForm[]>("/forms");
};

export const newForm = (data: NewFormParams) => {
  return instance.post("/forms", data);
};

export const getForm = (id: number) => {
  return instance.get<GetFormReturn>(`/forms/${id}`);
};

export const getResponses = () => {
  return instance.get<Response[]>(`/responses/`);
};

export const getResponsesByFormId = (id: number) => {
  return instance.get<Response[]>(`forms/${id}/responses/`);
};

export const getResponse = (id: number) => {
  return instance.get<Response>(`/responses/${id}`);
};

export const newResponse = (r: Response) => {
  return instance.post("/responses", { data: r });
};

export type NewFormParams = {
  name: string;
  data: KeyValuePair[];
};

export type GetFormReturn = {
  name: string;
  full_object: FullForm[];
};

// export default apiService;
