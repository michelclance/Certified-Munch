import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function Donate() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
              <nav className="flex items-center justify-between mb-8">
          <ul className="flex">
            <li className="ml-4">
              <Link href="/">
                <HomeIcon className='w-8 h-8' />
              </Link>
            </li>
          </ul>
        </nav>
      <Image src="/images/Donate.jpg" alt="Image 1" className="w-64 h-86" />
    
    </div>
  );
}
