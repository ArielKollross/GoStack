// to send user id for all routes with need authenticate
declare namespace Express {
  export interface Request {
    user: {
      id:string;
    };
  }
}
