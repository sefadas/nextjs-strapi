"use client";
import React, { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import HomeProSkeleton from "../_components/Skeleton/HomeProSkeleton";
import ProductItem from "../_components/Product/ProductItem";
import { Value } from "@radix-ui/react-select";

const SearchPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [color, setColor] = useState(searchParams.get("color") || "all");
  const [size, setSize] = useState(searchParams.get("size") || "all");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [pagesize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchColorSizeCategory();
    fetchProducts({
      search: searchParams.get("q"),
      category: searchParams.get("category"),
      color: searchParams.get("color"),
      size: searchParams.get("size"),
      page: parseInt(searchParams.get("page")) || 1,
    });
  }, [searchParams]);

  const fetchColorSizeCategory = async () => {
    try {
      const colorResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/colors`
      );
      setColors(colorResponse.data.data);

      const sizeResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sizes`
      );
      setSizes(sizeResponse.data.data);

      const categoryResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`
      );
      setCategories(categoryResponse.data.data);
    } catch (error) {
      console.log("Error fetching for searching", error);
    }
  };

  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) {
        params.append("filters[name][$contains]", filters.search);
      }

      if (filters.category && filters.category !== "all") {
        params.append("filters[category][slug][$eq]", filters.category);
      }

      if (filters.color && filters.color !== "all") {
        params.append("filters[colors][name][$eq]", filters.color);
      }

      if (filters.size && filters.size !== "all") {
        params.append("filters[sizes][name][$eq]", filters.size);
      }

      // params.append("pagination[page]", filters.page);
      // params.append("pagination[pageSize]", pageSize);

      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BACKEND_API_URL
        }/products?populate=*&${params.toString()}`
      );
      setProducts(response.data.data);
      setTotalPages(response.data.meta.pagination.pageCount);
    } catch (error) {
      console.log("errrrr", error);
    } finally {
      setLoading(false);
    }
  };

  const updateURL = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value && value !== "all") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== "page") {
      newParams.set("page", 1);
    }
    router.push(`/search?${newParams.toString()}`);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      updateURL("q", search);
    }, 2000);
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleColorChange = (value) => {
    setColor(value);
    updateURL("color", value);
  };
  const handleSizeChange = (value) => {
    setSize(value);
    updateURL("size", value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    updateURL("category", value);
  };

  const handlePageChnage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    updateURL("page", newPage);
  };

  return (
    <div className="container mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bgone borderone p-2 rounded-md">
        <Input
          className="w-full"
          placeholder="Search..."
          onChange={handleSearchChange}
        />

        {/* color select */}
        <Select onValueChange={handleColorChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Color</SelectItem>
            {colors.map((color) => (
              <SelectItem key={color.id} value={color.name}>
                {color.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* sizes select */}
        <Select onValueChange={handleSizeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Sizes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sizes</SelectItem>
            {sizes.map((sizes) => (
              <SelectItem key={sizes.id} value={sizes.name}>
                {sizes.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* category select */}
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        {loading ? (
          <HomeProSkeleton />
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8 mb-8">
              {products.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))}
            </div>

            <div className="flex justify-center items-center mt-8 mb-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      disabled={page === 1}
                      onClick={() => handlePageChange(page - 1)}
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded-md ${
                          i + 1 === page
                            ? "border border-blue-500 bg-blue-100 text-blue-700"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
