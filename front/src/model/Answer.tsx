export type Answer = {
  id?: number;
  curr_key: string;
  curr_value: string;
  value_id: string;
};

export type Response = {
  id: number;
  answers: Answer[];
};

export default Answer;
