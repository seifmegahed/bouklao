export default function InputField(props: {
  label: string;
  value: string;
  error: boolean;
  required?: boolean;
  onChange: (value: string) => void;
  textField?: boolean;
  disabled?: boolean;
  errorMessage?: string;
}) {
  return (
    <div className="w-full relative flex flex-col">
      <div className="h-8"></div>
      {props?.textField ? (
        <textarea
          disabled={props.disabled}
          required={props.required}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.label}
          className="peer w-full p-3 focus:outline-none rounded-xl resize-none focus:placeholder-white"
          rows={5}
        />
      ) : (
        <input
          disabled={props.disabled}
          required={props.required}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          type="text"
          placeholder={props.label}
          className="peer w-full h-12 p-3 focus:outline-none border outline-none rounded-xl focus:placeholder-white"
        />
      )}
      <div
        className={
          props.value === ""
            ? "absolute top-9 left-1 p-2 peer-focus:visible peer-focus:-translate-x-1 peer-focus:-translate-y-10 peer-focus:scale-125 invisible duration-300 transition-all ease-in-out"
            : "absolute top-9 left-1 p-2 -translate-x-1 -translate-y-10 scale-125"
        }
      >
        {props.label}
      </div>
      <div
        className={`text-xs px-2 text-red-500 ${!props.error && "invisible"}`}
      >
        {props.errorMessage ?? "Required"}
      </div>
    </div>
  );
}
