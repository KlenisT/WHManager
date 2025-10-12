export type Product = {
  _id?: string; // MongoDB ObjectId will come as a string after serialization
  name: string;
};
