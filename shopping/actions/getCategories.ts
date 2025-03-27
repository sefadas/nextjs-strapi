import { Category } from "@/constans/type";
import axios from "axios";

const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories?populate=*`;

export type ResponseWithMetadata<T> = {
  data: T;
  metadata: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      count: number;
    };
  };
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get(Urls);
  const data = res.data.data;
  return data;
};

export const getCategories2 = () =>
  axios.get<ResponseWithMetadata<Category[]>>(Urls);

// export const useGetCategories2 = (params) =>
//   useQuery({
//     queryKey: ["asdasd", params.page, params.x],
//     queryFn: () => getCategories2(params),
//   });
