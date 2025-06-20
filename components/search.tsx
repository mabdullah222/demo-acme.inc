'use client';

import { Input, AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { useState, useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { getInventoryBySearchQuery } from '@/queries/inventory-queries';
import { useEffect } from 'react';

type SearchProps = {
  handleChange:(queryString:string)=>void,
  placeholder: string;
  classNames: string;
};

const Search = ({handleChange,placeholder, classNames }: SearchProps) => {
  const [input, setInput] = useState('');
  const debounced = useDebounce(input, 400);
  const { data = [], isFetching } = getInventoryBySearchQuery(debounced,!!debounced)

  useEffect(()=>{
    if (debounced==""){
      handleChange("")
    }
  },[debounced])

  const options = useMemo<AutoCompleteProps['options']>(() =>
    data.map((item: any,index: number) => ({
    key:index,
      value: item.name,
    })),
    [data]
  );


  return (
    <div className={classNames}>
      <AutoComplete
        value={input}
        options={options}
        onSearch={setInput}                     
        onSelect={handleChange}
        popupMatchSelectWidth={252}
        style={{ width: 300 }}
        notFoundContent={debounced && !isFetching ? 'No results' : null}
      >
        <Input.Search
          size="middle"
          placeholder={placeholder}
          enterButton
          loading={isFetching}
        />
      </AutoComplete>
    </div>
  );
};

export default Search;
