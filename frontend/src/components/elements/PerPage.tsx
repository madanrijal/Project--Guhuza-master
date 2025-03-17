import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUrlParams } from "@/hooks/use-params";

const PerPage = () => {
  const { getUrlParam, setUrlParam } = useUrlParams();
  const value = getUrlParam("perPage") || 5;
  return (
    <div className="flex items-center space-x-2">
      <Select
        value={value.toString()}
        onValueChange={(val) => {
          setUrlParam({ perPage: parseInt(val) });
        }}
      >
        <SelectTrigger className="w-[70px] border-gray-300 py-3">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-0">
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
      <span>Entries per page</span>
    </div>
  );
};

export default PerPage;
