export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: number;
  description: string;
  image: string;
  copies: number;
  available: boolean;
  isDeleted: {
    type: Boolean;
    default: false;
  };
}
