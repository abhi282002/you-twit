import React, { FC, ChangeEvent } from "react";

interface InputBoxProps {
  type: string;
  label: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: FC<InputBoxProps> = ({
  type,
  label,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-400 outline-none"
      />
    </div>
  );
};

export default InputBox;
