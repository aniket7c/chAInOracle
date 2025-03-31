import React from "react";
import Link from "next/link";
type MobileNavProps = {
  isVisible: boolean;
};

const MobileNav: React.FC<MobileNavProps> = ({ isVisible }) => {
  return (
    <div
      className={`flex flex-col gap-5  bg-gray-50   z-50  w-[50vw] fixed  ${
        isVisible ? "left-0 " : "translate-x-[-110%]"
      }   top-[73px] p-5 py-6  transition-transform md:hidden  dark:border-r-0 duration-200  border-r-2 text-sm h-full`}
    >
    </div>
  );
};

export default MobileNav;
