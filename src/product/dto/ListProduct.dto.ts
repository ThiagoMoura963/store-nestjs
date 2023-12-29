class ListProductPropertyDTO {
  name: string;
  description: string;
}

class ListProductImageDTO {
  url: string;
  description: string;
}

export class ListProductDTO {
  id: string;
  userId: string;
  name: string;
  price: number;
  count: number;
  description: string;
  category: string;
  properties: ListProductPropertyDTO[];
  images: ListProductImageDTO[];
}
