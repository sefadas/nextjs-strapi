"use client";
import { Product } from "@/constans/type";
import { useProductFormStore } from "@/hooks/useForm";
import React, { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Minus, PlusIcon } from "lucide-react";
import Link from "next/link";

interface ProductFormProps {
  product: Product;
  btnVisible?: boolean;
}

const ProductForm = ({ product, btnVisible }: ProductFormProps) => {
  const {
    decrementQuantity,
    incrementQuantity,
    quantity,
    reset,
    selectedColor,
    selectedSize,
    setColor,
    setSize,
  } = useProductFormStore();

  useEffect(() => {
    reset();
  }, [product]);

  const handleColorChange = (color) => {
    setColor(color);
  };

  const handleSizeChange = (size) => {
    setSize(size);
  };

  const totalPrice = (quantity * product?.sellingPrice).toFixed(2);

  return (
    <>
      <div className="flex flex-row gap-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Color" />
          </SelectTrigger>
          <SelectContent>
            {product?.colors?.map((color) => (
              <SelectItem key={color?.id} value={color?.name}>
                {color?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            {product?.sizes?.map((size) => (
              <SelectItem key={size?.id} value={size?.name}>
                {size?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-row items-center justify-center gap-4 mt-8">
        <Button size="xs" disabled={quantity === 1} onClick={decrementQuantity}>
          <Minus />
        </Button>
        <h2>{quantity}</h2>
        <Button size="xs" onClick={incrementQuantity}>
          <PlusIcon />
        </Button>
        ${totalPrice}
      </div>
      <div className="flex flex-row gap-2 mt-8">
        <Button variant="destructive">Add To Cart</Button>
        {btnVisible && (
          <Button asChild>
            <Link href={`product/${product?.slug}`}>Detail</Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default ProductForm;
