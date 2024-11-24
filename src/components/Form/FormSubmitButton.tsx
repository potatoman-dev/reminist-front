export const FormSubmitButton = (props: { text: string }) => {
  return (
    <button
      className="w-48 rounded-md bg-primary py-3 text-on-primary"
      type="submit"
    >
      {props.text}
    </button>
  );
};