import { RadioButtonModalOptions } from "../RadioButtonModalOptions/RadioButtonModalOptions";

interface LabelModalOptionsProps {
  // input
  inputType: string;
  inputName: string;
  inputId: string;
  inputValue: string;
  inputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputChecked: boolean;
  inputClassName: string;
  //Label
  labelClassName: string;
  // div
  dataSetFirstColor: string;
  dataSetSecondColor: string;
  containerColorsClassName: string;
  colorTitle: string;
}

export const LabelModalOptions: React.FC<LabelModalOptionsProps> = ({
  inputType,
  inputName,
  inputId,
  inputValue,
  inputOnChange,
  inputChecked,
  inputClassName,
  labelClassName,
  dataSetFirstColor,
  dataSetSecondColor,
  containerColorsClassName,
  colorTitle,
}) => {
  return (
    <label className={labelClassName} htmlFor={inputId}>
      <RadioButtonModalOptions
        inputType={inputType}
        inputName={inputName}
        inputId={inputId}
        inputValue={inputValue}
        inputOnChange={inputOnChange}
        inputChecked={inputChecked}
        inputClassName={inputClassName}
      />
      <p>{colorTitle}</p>
      <div>
        <div
          data-firstcolor={dataSetFirstColor}
          data-secondcolor={dataSetSecondColor}
          className={containerColorsClassName}
        ></div>
      </div>

      {/* <input
        type="radio"
        name="orientation-toggle-switch"
        id="orientation-square-toggle-switch"
        value="squarish"
        onChange={handleOrientationChange}
        checked={options.orientation === "squarish"}
        className={scss["toggle-switch"]}
      /> */}
    </label>
  );
};
