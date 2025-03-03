import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Content from '../components/content'
import { NavItem } from '../interfaces';
import cn from 'classnames';

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const { slug } = await params;
  const navigation: NavItem[] = [
    { name: 'Responsable', href: 'responsable', current: slug === 'responsable' },
    { name: 'ID Responsable', href: 'idresponsable', current: slug === 'idresponsable' },
  ]

  return (
    <div className="items-center justify-items-center pb-20">
      <main className="flex flex-col row-start-2 items-center sm:items-start w-full">
        <div className="w-full">
          <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="shrink-0">
                    <Image
                      alt="Your Company"
                      src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                      className="size-8"
                      height={32}
                      width={32}
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? 'page' : undefined}
                          className={cn(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="-mr-2 flex md:hidden">
                  <DisclosureButton className={cn('group relative inline-flex items-center justify-center rounded-md',
                    'bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white',
                    'focus:outline-none focus:ring-2 focus:ring-white',
                    'focus:ring-offset-2 focus:ring-offset-gray-800'
                    )}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={cn(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>

          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <Content page={slug} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
