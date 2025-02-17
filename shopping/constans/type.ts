// export type Category = {
//   id: number;
//   name: string;
//   slug: string;
//   image: {
//     url: string;
//   };
// };
export type Category = {
  id: number;
  name: string;
  slug: string;
  image: {
    url: string;
  };
};

export type Slider = {
  id: number;
  link: string;
  media: {
    url: string;
  };
};

export type Size = {
  id: number;
  name: string;
};

export type Color = {
  id: number;
  name: string;
};
export type Product = {
  id: number;
  name: string;
  description: string;
  slug: string;
  mrp: number;
  sellingPrice: number;
  images: ProductImage[];
  category: Category;
  colors: Size[];
  isTop: boolean;
  recent: boolean;
  sizes: Size[];
};
export type ProductImage = {
  id: number;
  url: string;
};
