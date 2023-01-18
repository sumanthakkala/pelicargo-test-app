export interface ImageData {
  id: string | number;
  imgWidth: number;
  imgHeight: number;
  url: string;
  alt: string;
}

export interface ImageResults {
  unsplash: ImageData[];
  pexels: ImageData[];
  page: number;
}
