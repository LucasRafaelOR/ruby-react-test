export type DBKey = {
  id: number;
  form_id: number;
  type: "text" | "integer";
  mutable?: boolean;
  default?: string;
  multiple?: boolean;
};

export type DBValue = {
  id: number;
  key_id: number;
  child_form?: number;
  type: "text" | "integer" | "child";
  mutable?: boolean;
  default?: string;
  multiple?: boolean;
};

export type FullForm = {
  key: DBKey;
  value: DBValue;
  children?: FullForm[];
};
