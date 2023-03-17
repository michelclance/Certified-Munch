import { HomeIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function Donate() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
              <nav className="flex items-center justify-between mb-8">
          <ul className="flex">
            <li className="ml-4">
              <a href="/">
                <HomeIcon className='w-8 h-8' />
              </a>
            </li>
          </ul>
        </nav>
      <img src="/images/Donate.jpg" alt="Image 1" className="w-64 h-86" />
    
    </div>
  );
}
