import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

export const FormInput = (props: {
  children: ReactNode;
  label: string;
  errors: FieldError | undefined;
}) => {
  return (
    <div className="rounded-xl border border-border-gray bg-white px-3 py-2">
      <label className="w-full [&_input]:w-full [&_input]:bg-transparent [&_input]:p-1.5 [&_input]:text-text [&_input]:placeholder:text-text-gray-normal">
        <span className="inline-block pb-1 text-sm font-medium text-text-gray-dark">
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
