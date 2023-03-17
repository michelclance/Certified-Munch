import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function Profile() {
  const { user } = useUser();
  return (
    user && (
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between mb-4 sm:mb-8">
        <p className="text-lg md:text-xl font-bold">
            calm down pobrecit, more soon...
            <br />
            <span className='text-sm'>also, if are.na folk see this, please reach out; i want your five head design advice</span>
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
                className="mx-auto w-32 h-32 rounded-full mb-4"
                src={user.picture}
                alt={user.name}
                width={128}
                height={128}
              />
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600 mt-2">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
