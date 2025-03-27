import { Product } from "@/constans/type";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface ProductImagesProps {
  images: Product["images"];
}

const ProductImages = ({ images }: ProductImagesProps) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  const hasCarouselImages = images.length > 1;
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {images?.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              className="rounded-3xl scale-95 w-full group-hover:scale-100 transition-all duration-700"
              width={500}
              alt="alt"
              height={200}
              unoptimized={true}
              src={backendUrl + image.url}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {hasCarouselImages && <CarouselPrevious className="left-0" />}
      {hasCarouselImages && <CarouselNext className="right-0" />}
    </Carousel>
  );
};

export default ProductImages;
