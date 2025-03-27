"use client";
import { getProducts } from "@/actions/getProducts";
import React, { useEffect, useState } from "react";
import HomeProSkeleton from "../Skeleton/HomeProSkeleton";
import ProductItem from "./ProductItem";
import { Product } from "@/constans/type";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const RecentProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts(
          "/products?sort[0]=id:desc&filters[recent]=true&pagination[start]=0&pagination[limit]=8&populate=*"
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
          <h2 className="textone font-semibold text-2xl lg:text-3xl mb-8">
            Recent Products
          </h2>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full mb-10 px-4"
          >
            <CarouselContent className="w-full gap-4">
              {products.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <ProductItem key={product?.id} product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </>
  );
};

export default RecentProduct;
