export type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  available: boolean;
  genre: string;
};

export type GenreSummary = {
  genre: string;
  count: number;
  percentage: number;
};
