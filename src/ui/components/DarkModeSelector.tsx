"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  Listbox,
  Transition,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useTheme } from "next-themes";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/16/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ThemeOption = {
  id: string;
  name: string;
  icon: ReactNode;
};

const themeOptions: ThemeOption[] = [
  { id: "light", name: "Light", icon: <SunIcon className="w-5 h-5" /> },
  { id: "dark", name: "Dark", icon: <MoonIcon className="w-5 h-5" /> },
  {
    id: "system",
    name: "System",
    icon: <ComputerDesktopIcon className="w-5 h-5" />,
  },
];

export default function DarkModeSelector() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<ThemeOption>(themeOptions[2]); // 預設 system

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const currentTheme = resolvedTheme ?? theme; // 先用 resolvedTheme，如果還沒有就用 theme
    const option =
      themeOptions.find((opt) => opt.id === currentTheme) ?? themeOptions[2];
    setSelected(option);
  }, [mounted, resolvedTheme, theme]);

  if (!mounted) return null; // 等 mounted 後再渲染，避免 hydration mismatch

  return (
    <Listbox
      value={selected}
      onChange={(option) => {
        setSelected(option);
        setTheme(option.id);
      }}
    >
      {({ open }) => (
        <div className="relative">
          <ListboxButton className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            {selected.icon}
          </ListboxButton>

          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-50 mt-2 right-0 w-36 py-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none">
              {themeOptions.map((option) => (
                <ListboxOption
                  key={option.id}
                  value={option}
                  className={({ active, selected }) =>
                    classNames(
                      active ? "bg-gray-100 dark:bg-gray-700" : "",
                      selected
                        ? "text-purple-600 dark:text-purple-300"
                        : "text-gray-900 dark:text-gray-100",
                      "cursor-pointer select-none relative py-2 pl-10 pr-4"
                    )
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center">
                      {option.icon}
                      <span
                        className={classNames(
                          selected ? "font-semibold" : "font-normal",
                          "ml-3 block truncate text-base"
                        )}
                      >
                        {option.name}
                      </span>
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
