export interface Iuser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  cart?: [];
}
