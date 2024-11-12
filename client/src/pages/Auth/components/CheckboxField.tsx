/**
 * This code was generated by Builder.io.
 */
import React from "react";

interface CheckboxFieldProps {
  label: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label }) => {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex gap-1.5 mt-4 text-slate-700">
      <input
        type="checkbox"
        id={id}
        className="flex shrink-0 my-auto w-5 h-5 rounded-md border-red-600 border-solid border-[1.5px]"
      />
      <label htmlFor={id} className="basis-auto">
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
