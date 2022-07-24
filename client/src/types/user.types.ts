export interface IUser {
  user: {
    data: {
    name: string;
    password: string;
    pic: string;
    _id: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: string;
  };
  token: string;
  }
}
