import React from 'react';

interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ placeholder, value, type, disabled, onChange }) => {
  return (
    <input
      className=" border-neutral-800 focus:border-sky-500 focus:border-2 disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed w-full p-4 text-lg text-white transition bg-black border-2 rounded-md outline-none"
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
    />
  );
};
