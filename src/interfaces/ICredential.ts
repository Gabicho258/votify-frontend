export interface ICredential {
  _id: string;
  user_id: string;
  process_id: string;
  password: string;
  email: string;
  was_used: boolean;
}
