import React from 'react'
import { Divider } from 'antd'
import { faWarehouse, faChartSimple, faTruck, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import Icon from './icon';
import { cn } from '@/lib/tailwindcss';
import Link from 'next/link';


const icons = [
  { name: 'Inventory', icon: faWarehouse,address:"/inventory" },
  { name: 'Sales', icon: faChartSimple,address:"/sales" },
  { name: 'Product', icon: faTruck,address:"/product" },
  { name: 'Analytics', icon: faMoneyBill,address:"/analytics" },
];

type NavbarPropsType={
  drawer: true | false
}


const Navbar = ({drawer}:NavbarPropsType) => {
  return (
    <div className={cn('p-4 pt-6 w-1/4 lg:w-1/5',drawer? "block h-full w-full":"hidden md:block dark:bg-[#000000] bg-gray-200")}>
      <div className='flex-col justify-center'>
          <div className='font-extrabold cursor-pointer dark:text-zinc-300 text-black'><Link href={'/'}>Acme.inc</Link></div>
      <Divider className='border-black' size='large'></Divider>
        <div className='flex flex-col space-y-4'>
          {icons.map((ic,index)=>(<Icon key={index} iconName={ic.icon} text={ic.name} address={ic.address}></Icon>))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
