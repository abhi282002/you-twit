import React, { FC } from "react";
interface HeadingProps {
  label: string;
}
const Header: FC<HeadingProps> = ({ label }) => {
  return <h1 className="font-bold text-2xl ">{label}</h1>;
};

export default Header;
