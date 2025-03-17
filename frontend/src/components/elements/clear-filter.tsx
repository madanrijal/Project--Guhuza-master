"use client";
import React from "react";
import { Button } from "../ui/button";
import { useUrlParams } from "@/hooks/use-params";

const ClearFilters = () => {
  const { clearUrlParams } = useUrlParams();
  return (
    <Button
      onClick={clearUrlParams}
      className="border-gray-300 h-12 text-[15px] text-gray-600"
      variant="outline"
    >
      Clear Filters
    </Button>
  );
};

export default ClearFilters;
