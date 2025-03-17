import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useUrlParams } from "@/hooks/use-params";

interface PaginationProps {
  totalPages: number | undefined;
}

export function Pagination({ totalPages = 10 }: PaginationProps) {
  const { getUrlParam, setUrlParam } = useUrlParams();
  const [currentPage, setCurrentPage] = React.useState<number>(
    Number(getUrlParam("page")) || 1
  );
  const pageNumbers = [];
  const maxVisiblePages = 5;

  useEffect(() => {
    setCurrentPage(Number(getUrlParam("page")) || 1);
  }, [getUrlParam("page")]);

  const handlePageChange = (newPage: number) => {
    setUrlParam({ page: newPage });
    setCurrentPage(newPage);
  };

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }
  }

  return (
    <nav
      className="flex justify-end items-center space-x-2"
      aria-label="Pagination"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ArrowLeft2 className="size-6 stroke-dark" />
      </Button>
      {pageNumbers.map((number, index) => (
        <React.Fragment key={index}>
          {number === "..." ? (
            <span className="px-3 py-2">...</span>
          ) : (
            <Button
              variant={currentPage === number ? "default" : "ghost"}
              size="icon"
              onClick={() => handlePageChange(number as number)}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {number}
            </Button>
          )}
        </React.Fragment>
      ))}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ArrowRight2 className="size-6 stroke-dark" />
      </Button>
    </nav>
  );
}
