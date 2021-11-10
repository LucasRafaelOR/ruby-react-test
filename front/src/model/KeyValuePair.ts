export type Key = {
  type: "text" | "integer";
  mutable?: boolean;
  default?: string;
  multiple?: boolean;
};

export type Value = {
  type: "text" | "integer" | "child";
  mutable?: boolean;
  default?: string;
  multiple?: boolean;
};

export type KeyValuePair = {
  key: Key;
  value: Value;
  children?: KeyValuePair[];
};
