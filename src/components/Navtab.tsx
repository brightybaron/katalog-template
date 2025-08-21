// NavTab.tsx
import { useState } from "react";

type Tab = {
  name: string;
};

type NavTabProps = {
  tabs: Tab[];
};

function NavTab({ tabs }: NavTabProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      {tabs.map((tab, index) => (
        <li key={index}>
          <button
            id={`${tab.name}-tab`}
            className={`w-full text-left capitalize hover:cursor-pointer ${
              activeTab === index
                ? " text-stone-800 font-semibold"
                : " text-gray-700 font-medium"
            }`}
            onClick={() => handleClick(index)}
          >
            {tab.name}
          </button>
        </li>
      ))}
    </>
  );
}

export default NavTab;
