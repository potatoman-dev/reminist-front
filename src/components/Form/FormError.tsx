export const FormError = (props: { errorMessage: string }) => {
  return (
    <div className="flex justify-center">
      <p className="w-60 text-center text-xs text-text-error md:w-72 md:text-sm">
        {props.errorMessage}
      </p>
    </div>
  );
};
