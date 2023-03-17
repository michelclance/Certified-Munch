import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function Donate() {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center justify-between mb-8">
      <p className="text-lg md:text-xl font-bold">
          help me keep the lights on;; broke boy asking graciously 🙇
          <br />
          <span className='text-sm'>
            consider yourself an angel investor with 0 equity :*
          </span>
        </p>

        <ul className="flex">
          <li className="ml-4">
            <Link href="/">
              <HomeIcon className='w-8 h-8' />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="mb-4">

          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/images/Donate.jpg"
              alt="Image 1"
              width={300}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
