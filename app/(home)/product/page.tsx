'use client';

import { getProductsInfiniteQuery } from '@/queries/product-queries';
import { Spin } from 'antd';
import ProductCard from '@/components/card';
import { useRef, useEffect } from 'react';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalComponent from '@/components/modal';
import { useState } from 'react';
import { addProductMutation } from '@/mutations/product-mutations';


const InventoryPage = () => {
  const {
    data: products,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = getProductsInfiniteQuery();
  const [isModalOpen,setIsModalOpen]=useState<boolean>(false)
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (
        el.scrollTop + el.clientHeight >= el.scrollHeight - 10 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    el.addEventListener('scroll', handleScroll);

    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleModalOpen=()=>{
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="flex flex-col space-y-4 h-full">
      <p className="text-2xl font-extrabold text-zinc-700 self-center md:self-start mt-4">Products</p>
      <FloatButton tooltip={"Add a product"} icon={<PlusOutlined />} onClick={handleModalOpen} />
      <ModalComponent open={isModalOpen} toggleOpen={handleModalOpen} title='Add a Product' imageUrl="" productId='1' name='' unitPrice='' mutationFn={addProductMutation}></ModalComponent>

      <div
        ref={scrollRef}
        className="flex flex-row justify-center flex-wrap gap-3 overflow-y-auto pr-2 max-h-[700px]"
      >
        {isLoading ? (
          <Spin />
        ) : (
          products?.pages.flatMap((page) =>
            page.items.map((item: any, index: number) => (
              <ProductCard
                key={item.id}
                productId={item.id}
                imageUrl={item.imageUrl ||"/product-image.jpg"}
                name={item.name}
                unitPrice={item.unitPrice}
              />
            ))
          )
        )}
      </div>
      {isFetchingNextPage && <Spin />}
    </div>
  );
};

export default InventoryPage;
