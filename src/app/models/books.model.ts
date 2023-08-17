export interface Book {
    id?: number;
    title: string;
    author: string;
    category: string;
    isbn: string;
    version: string;
    price: number;
    pdfFile: File
    coverPhoto: string| File 
    olderVersion?: string;
    edition?: string;
    releaseDate?: Date | null;
    describtion: string;

  }