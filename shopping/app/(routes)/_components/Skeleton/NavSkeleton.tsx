import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const NavSkeleton = () => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="w-12 h-6 skecolor" />
      ))}
    </div>
  );
};

export default NavSkeleton;
