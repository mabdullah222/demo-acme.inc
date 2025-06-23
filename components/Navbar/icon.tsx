'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type IconProps = {
  text: string;
  iconName: IconDefinition;
  address: string;
};

const Icon = ({ text, iconName, address }: IconProps) => {
  const pathname = usePathname();
  const isActive = pathname === address;

  return (
    <Link
      href={address}
      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors group
        ${isActive ? 'bg-zinc-700' : 'hover:bg-zinc-800'}
      `}
    >
      <FontAwesomeIcon
        size="sm"
        icon={iconName}
        className={`text-zinc-500 ${isActive ? 'text-white' : 'group-hover:text-zinc-300'}`}
      />
      <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
        {text}
      </p>
    </Link>
  );
};

export default Icon;
