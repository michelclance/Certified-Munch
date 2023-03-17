import { Fragment, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  FolderIcon,
  InboxIcon,
  PresentationChartBarIcon,
  XMarkIcon,
  BuildingStorefrontIcon,
  ChevronLeftIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import RecipeSuggestions from '../components/RecipeSuggestions'
import Image from 'next/image';
import Slider from '../components/rightslider';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link'


const navigation = [
  { name: 'Pantry', href: '/Pantry', icon: BuildingStorefrontIcon, current: false },
  { name: 'Saved Recipes', href: '/SavedRecipes', icon: FolderIcon, current: false },
  { name: 'Feedback', href: '/Feedback', icon: InboxIcon, current: false },
  { name: 'Donate', href: '/Donate', icon: CurrencyDollarIcon, current: false },
]

function classNames(...classes: (string | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
const NavBar = () => {
  const router = useRouter();
  const recipeSuggestions: string | string[] = router.query.recipeSuggestions || "";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  
  return (
    <>
    <header>
      <title>Certified Munch</title>
    </header>
    <div>
    <button
  type="button"
  onClick={() => setOpen(true)}
  className="absolute right-4 top-4 w-16 h-16 text-black rounded-full flex items-center justify-center focus:outline-none"
>
  <ChevronLeftIcon className="h-6 w-6" />
</button>


      <Slider open={open} setOpen={setOpen} />
    </div>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                           {/*Img goes */}
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="flex justify-between">
  {user ? (
    <>
      <Link className="text-gray-500 hover:text-gray-700 py-2 px-4" href="/profile">
        Profile
      </Link>
      <Link className="text-red-500 hover:text-red-700 py-2 px-4" href="/api/auth/logout">
        Logout
      </Link>
    </>
  ) : (
    <Link className="text-gray-500 py-2 px-4 rounded" href="/api/auth/login">
      Login
    </Link>
  )}
</div>


                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-2">
  <Image
    src="/images/munch.jpeg"
    alt="Munch Logo"
    width={200}
    height={100}
  />
</div>
              <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex justify-between">
  {user ? (
    <>
      <Link className="text-gray-500 hover:text-gray-700 py-2 px-4" href="/profile">
        Profile
      </Link>
      <Link className="text-red-500 hover:text-red-700 py-2 px-4" href="/api/auth/logout">
        Logout
      </Link>
    </>
  ) : (
    <Link className="text-gray-500 py-2 px-4 rounded" href="/api/auth/login">
      Login
    </Link>
  )}
</div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Recipe Suggestions</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div>
              <RecipeSuggestions recipeSuggestions={recipeSuggestions} />
            </div>
          </div>
        </div>
      </div>
    </main>
        </div>
      </div>
    </>
  )
}
export default NavBar