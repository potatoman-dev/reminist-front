export const FormError = (props: { errorMessage: string }) => {
  return (
    <div className="flex justify-center">
      <p className="w-72 text-center text-sm text-text-error md:w-full md:text-base">
        {props.errorMessage}
      </p>
    </div>
  );
};
