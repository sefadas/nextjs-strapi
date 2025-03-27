import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductItemSkeleton = () => {
  return (
    <div className="group p-2 md:p-4 lg:h-[450px] lg:p-6 flex flex-col items-center justify-center gap-4 border borderone bgone rounded-xl hover:shadow-lg transition-all cursor-pointer duration-300">
      <Skeleton className="w-full h-[300px] p-6 skecolor" />

      <div className="flex flex-col gap-3">
        <Skeleton className="w-28 h-6 skecolor" />
        <Skeleton className="w-28 h-6 skecolor" />
      </div>

      <div className="flex flex-row gap-3">
        <Skeleton className="w-20 h-6 skecolor" />
        <Skeleton className="w-20 h-6 skecolor" />
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
