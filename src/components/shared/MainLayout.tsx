import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import {
  CodeIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import {
  CashIcon,
  CogIcon,
  CollectionIcon,
  FolderOpenIcon,
  GlobeAltIcon,
} from "@heroicons/react/outline";

type LayoutProps = {
  children: React.ReactNode;
};

const repoNav = [
  { name: "Connect to Github", href: "#", icon: GlobeAltIcon, current: true },
  { name: "Releases", href: "#", icon: CodeIcon, current: false },
];

const accountNav = [
  { name: "My Collection", href: "#", icon: CollectionIcon, current: true },
  { name: "Wallet", href: "#", icon: CashIcon, current: false },
  { name: "History", href: "#", icon: FolderOpenIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: false },
];

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-white shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-6">
                  <div className="flex-shrink-0 flex items-center font-bold text-xl">
                    <a href="#">
                      REPOMINT
                    </a>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Popover>

      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-3">
            <nav
              aria-label="Sidebar"
              className="sticky top-4"
            >
              <div className="pb-8 space-y-1">
                <p
                    className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider"
                    id="communities-headline"
                >
                  Repositories
                </p>

                {repoNav.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50",
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </div>
              <div>
                <p
                    className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider"
                    id="communities-headline"
                >
                  Account
                </p>

                {accountNav.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.current
                                ? "bg-gray-200 text-gray-900"
                                : "text-gray-600 hover:bg-gray-50",
                            "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                          className={classNames(
                              item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                              "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                          )}
                          aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </a>
                ))}
              </div>
            </nav>
          </div>
          <main className="lg:col-span-9 xl:col-span-9 text-gray-900">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
