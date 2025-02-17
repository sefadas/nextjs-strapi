"use client";
import { getSliders } from "@/actions/getSlider";
import React, { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import SliderSkeleton from "./Skeleton/SliderSkeleton";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const sliders = await getSliders();
        setSliders(sliders);
      } catch (error) {
        console.log("failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSliders();
  }, []);
  return (
    <div>
      {loading ? (
        <SliderSkeleton />
      ) : (
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
            {sliders.map((slider) => (
              <CarouselItem key={slider.id}>
                <Link href={slider.url}>
                  <div className="relative w-full h-[400] md:h-[450px]">
                    <Image
                      className="object-cover"
                      fill
                      alt="slider"
                      unoptimized={true}
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_URL + slider?.media?.url
                      }
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" /> */}
        </Carousel>
      )}
    </div>
  );
};

export default Slider;
