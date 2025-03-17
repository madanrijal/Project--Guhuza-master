"use client";

import { debounce } from "@/utils/debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useUrlParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const memoizedSearchParams = useMemo(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);

  const getUrlParam = useCallback(
    (key: string): string | undefined => {
      return memoizedSearchParams.get(key) || undefined;
    },
    [memoizedSearchParams]
  );

  const setUrlParam = useMemo(
    () =>
      debounce((updates: Record<string, string | number | null>) => {
        const newParams = new URLSearchParams(memoizedSearchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
          if (value === null || value === undefined || value === "") {
            newParams.delete(key);
          } else {
            newParams.set(key, String(value));
          }
        });

        const newSearch = newParams.toString();
        const currentSearch = memoizedSearchParams.toString();

        if (newSearch !== currentSearch) {
          const query = newSearch ? `?${newSearch}` : "";
          router.push(`${pathname}${query}`);
        }
      }, 300),
    [memoizedSearchParams, router, pathname]
  );

  const deleteUrlParam = useCallback(
    (key: string) => {
      const newParams = new URLSearchParams(memoizedSearchParams.toString());
      newParams.delete(key);

      const newSearch = newParams.toString();
      const currentSearch = memoizedSearchParams.toString();

      if (newSearch !== currentSearch) {
        const query = newSearch ? `?${newSearch}` : "";
        router.push(`${pathname}${query}`);
      }
    },
    [memoizedSearchParams, router, pathname]
  );

  const clearUrlParams = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return {
    getUrlParam,
    setUrlParam,
    deleteUrlParam,
    clearUrlParams,
  };
}
