/**
 * This code was generated by Builder.io.
 */
import React from "react";

interface MenuHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({
  title,
  subtitle,
  description,
}) => (
  <header className="flex flex-col items-center">
    <h1 className="text-xl font-bold text-red-600">{title}</h1>
    <h2 className="mt-4 text-4xl font-bold text-slate-700">{subtitle}</h2>
    <p className="mt-4 text-base text-slate-700 max-md:max-w-full">
      {description}
    </p>
  </header>
);

export default MenuHeader;