"use client";
import { getProducts } from "@/actions/getProducts";
import React, { useEffect, useState } from "react";
import ProductDetailSkeleton from "../../_components/Skeleton/ProductDetailSkeleton";
import ProductImages from "../../_components/Product/ProductImages";
import { Product } from "@/constans/type";
import ProductForm from "../../_components/Product/ProductForm";
import RecentProduct from "../../_components/Product/RecentProduct";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [productDetail, setProductDetail] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const product = await getProducts(
          `/products?filters[slug][$eq]=${params.slug}&populate=*`
        );
        setProductDetail(product);
      } catch (error) {
        console.log("Failed to fetch details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, []);

  return (
    <>
      {loading ? (
        <ProductDetailSkeleton />
      ) : (
        <div className="mt-10 container">
          {productDetail.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8 container"
            >
              <div>
                <ProductImages images={product.images} />
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-semibold textone">
                  {product?.name}
                </h2>
                <h2 className="text-lg font-semibold text-color3 dark:text-amber-300">
                  {product?.category.name}
                </h2>
                <p>{product?.description}</p>

                <div className="flex gap-3">
                  {product?.sellingPrice && (
                    <h2 className="font-bold text-color3 text-3xl">
                      ${product?.sellingPrice}
                    </h2>
                  )}

                  <h2
                    className={
                      product?.sellingPrice
                        ? "line-through text-gray-500"
                        : undefined
                    }
                  >
                    ${product?.mrp}
                  </h2>
                </div>
                <ProductForm product={product} btnVisible={false} />
              </div>
            </div>
          ))}
        </div>
      )}

      <RecentProduct />
    </>
  );
};

export default ProductDetailPage;
