import React, { FC } from "react";
interface HeadingProps {
  label: string;
}
const Heading: FC<HeadingProps> = ({ label }) => {
  return <h1 className="font-bold text-2xl ">{label}</h1>;
};

export default Heading;
