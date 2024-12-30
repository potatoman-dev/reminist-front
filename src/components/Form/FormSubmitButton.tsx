export const FormSubmitButton = (props: { text: string }) => {
  return (
    <button
      className="w-48 rounded-full bg-primary py-3 text-white"
      type="submit"
    >
      {props.text}
    </button>
  );
};
