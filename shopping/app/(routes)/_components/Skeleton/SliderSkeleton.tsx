import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SliderSkeleton = () => {
  return (
    <div className="w-full h-[400] md:h-[450px]">
      <Skeleton className="h-full skecolor" />
    </div>
  );
};

export default SliderSkeleton;
