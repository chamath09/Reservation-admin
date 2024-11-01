import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import Logout from "../authentication/Logout";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Lecture", href: "/lecture" },
  { name: "Lab", href: "/lab" },
  { name: "Exam", href: "/exam" },
  { name: "Notice", href: "/notice" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const imageUrls = [
  "https://img.freepik.com/free-vector/smiling-man-with-glasses_1308-174409.jpg?uid=R168750986&ga=GA1.2.293342500.1719385243&semt=ais_hybrid",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsZBVLzCNEWIPOv-p3sDy7G5QAnzHVoFlhwg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuGo_hWuoWBhpC411y-wpdhnGj78jCMZbjAg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPU6zF7UD-FZUj2NRfVJxgG5lbSxsY_zaLGQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK6B7BzZiVpd4AMu-njPyhxt_VaEpQ--2oRw&s",
];

const getRandomImage = () => {
  return imageUrls[Math.floor(Math.random() * imageUrls.length)];
};

const Nav = () => {
  const [profileImage, setProfileImage] = useState("");
  const location = useLocation();

  useEffect(() => {
    setProfileImage(getRandomImage());
  }, []);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://www.sjp.ac.lk/wp-content/uploads/2015/01/usjp-logo1.jpg"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={
                      location.pathname === item.href ? "page" : undefined
                    }
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-gray-900 text-white border-b-2 border-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              to="/notification"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </Link>

            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="User Profile"
                    src={profileImage}
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <Menu.Items
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-100"
              >
                <MenuItem>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-white-700 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-700"
                  >
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <div className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 cursor-pointer dark:text-red-400 dark:hover:bg-red-700">
                    <Logout />
                  </div>
                </MenuItem>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              aria-current={
                location.pathname === item.href ? "page" : undefined
              }
              className={classNames(
                location.pathname === item.href
                  ? "bg-gray-900 text-white border-b-2 border-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Nav;
