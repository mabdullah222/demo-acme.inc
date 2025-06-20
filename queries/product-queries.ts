import { getProducts } from "@/lib/actions/product-actions";
import { useInfiniteQuery } from "@tanstack/react-query";


export const getProductsInfiniteQuery = (limit = 10) =>
  useInfiniteQuery({
    queryKey: ["product", "infinite", limit],
    queryFn: ({ pageParam = "" }) => getProducts(limit, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined}
  });