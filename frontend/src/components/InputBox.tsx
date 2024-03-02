import React, { FC, ChangeEvent } from "react";

interface InputBoxProps {
  type: string;
  label: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: FC<InputBoxProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-sm font-medium text-left py-1  ">
        {label}
      </label>
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-400 outline-none"
      />
    </div>
  );
};

export default InputBox;
