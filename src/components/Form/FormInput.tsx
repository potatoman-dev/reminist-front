import { ReactNode } from "react";

export const FormInput = (props: { children: ReactNode; label: string }) => {
  return (
    <label className="w-full [&_input]:w-full [&_input]:rounded-md [&_input]:border-[1px] [&_input]:border-border [&_input]:bg-surface [&_input]:p-1.5 [&_input]:text-text">
      <span className="inline-block pb-1 text-sm font-medium text-text-secondary">
        {props.label}
      </span>
      <br />
      {props.children}
    </label>
  );
};
