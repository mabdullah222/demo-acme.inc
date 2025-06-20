'use client';

import React, { useState } from 'react';
import { Divider, Select, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/providers/theme-provider';
import Navbar from './navbar';

const TitleBar = () => {
  const {theme,setTheme } = useTheme();
  const [open, setOpen] = useState<true | false >(false);

  const handleSelect = (value: 'light' | 'dark' | 'system') => {
    setTheme(value);
  };

  return (
    <div className='p-4 md:hidden'>
      <Drawer style={{backgroundColor:"black",color:"white"}} open={open} title="" onClose={() => setOpen(false)} placement="left">
        <Navbar drawer={true}/>
      </Drawer>

      <div className="flex flex-row justify-between items-center">
        <button
          className="w-10 h-10 hover:bg-gray-100 rounded-lg"
          onClick={() => setOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>

        <div className="justify-center flex-1 md:hidden flex font-extrabold">Acme.inc</div>
        {/* <Select
          defaultValue={theme}
          style={{ width: 120 }}
          onChange={handleSelect}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' }
          ]}
        /> */}
      </div>
      <Divider style={{margin:0}} className="bg-gray-100 dark:hidden" />
    </div>
  );
};

export default TitleBar;
