export interface RadioButtonModalOptionsProps {
  inputType: string;
  inputName: string;
  inputId: string;
  inputValue: string;
  inputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputChecked: boolean;
  inputClassName: string;
}

export const RadioButtonModalOptions: React.FC<
  RadioButtonModalOptionsProps
> = ({
  inputType,
  inputName,
  inputId,
  inputValue,
  inputOnChange,
  inputChecked,
  inputClassName,
}) => {
  return (
    <input
      type={inputType}
      name={inputName}
      id={inputId}
      value={inputValue}
      onChange={inputOnChange}
      checked={inputChecked}
      className={inputClassName}
    />
  );
};
