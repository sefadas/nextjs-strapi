"use client";
import { getProducts } from "@/actions/getProducts";
import React, { useEffect, useState } from "react";
import HomeProSkeleton from "../Skeleton/HomeProSkeleton";
import ProductItem from "./ProductItem";
import { Product } from "@/constans/type";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts(
          "/products?sort[0]=id:desc&filters[isTop]=true&pagination[start]=0&pagination[limit]=8&populate=*"
        );
        setProducts(products);
      } catch (error) {
        console.log("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <HomeProSkeleton />
      ) : (
        <div className="mt-10 container">
          <h2 className="textone font-semibold text-2xl lg:text-3xl">
            Shop By Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8 mb-8">
            {products.map((product) => (
              <ProductItem key={product?.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
