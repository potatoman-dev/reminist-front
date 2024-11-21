import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

export const FormInput = (props: {
  children: ReactNode;
  label: string;
  errors: FieldError | undefined;
}) => {
  return (
    <div>
      <label className="w-full [&_input]:w-full [&_input]:rounded-md [&_input]:border-[1px] [&_input]:border-border [&_input]:bg-surface [&_input]:p-1.5 [&_input]:text-text [&_input]:placeholder:opacity-50">
        <span className="inline-block pb-1 text-sm font-medium text-text-secondary">
          {props.label}
        </span>
        <br />
        {props.children}
      </label>
      {props.errors && (
        <p className="my-1 text-xs text-text-error opacity-80">
          {props.errors.message}
        </p>
      )}
    </div>
  );
};
