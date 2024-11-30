import { IoIosCloseCircle } from "react-icons/io";
import { useOptionsImageContext } from "../Context/useOptionsImage";
import { LabelModalOptions } from "../LabelModalOptions/LabelModalOptions";
import { colorsInputTable } from "../LabelModalOptions/colorsInputTable";
import scss from "./ModalOptions.module.scss";
import { useEffect } from "react";

interface ModalOptionsProps {
  isModalOptionsOpen: boolean; // Typ dla isModalOptionsOpen
  closeModalOptions: () => void; // Typ dla closeModalOptions
}

export const ModalOptions: React.FC<ModalOptionsProps> = ({
  isModalOptionsOpen,
  closeModalOptions,
}) => {
  const { options, setOptions } = useOptionsImageContext();

  useEffect(() => {
    // Pobieranie wszystkich elementów z klasą "color-api-box"
    const boxes = document.querySelectorAll(`.${scss["color-api-box"]}`);
    boxes.forEach((box) => {
      const element = box as HTMLElement;
      const firstColor = element.getAttribute("data-firstcolor");
      const secondColor = element.getAttribute("data-secondcolor");

      // Ustawianie zmiennych CSS na elementach
      if (firstColor) {
        element.style.setProperty("--dynamic-first-color", firstColor);
      }
      if (secondColor) {
        element.style.setProperty("--dynamic-second-color", secondColor);
      }
    });
  }, []);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setOptions((prev) => {
      if (name === "orientation-toggle-switch") {
        return { ...prev, orientation: value };
      }
      if (name === "color-toggle-switch") {
        return { ...prev, color: value };
      }
      return prev;
    });
  };

  return (
    <div
      className={`${scss["container-modal-options"]} 
      ${isModalOptionsOpen ? "" : scss["is-hide"]}`}
    >
      <IoIosCloseCircle
        className={scss["exit-icon-modal-options"]}
        onClick={() => closeModalOptions()}
      />
      <form action="">
        <p className={scss["container-orentation-title"]}>Options:</p>
        <div className={scss["container-orentation-modal-options"]}>
          <p className={scss["container-orentation-title"]}>Orientation:</p>
          <label
            className={scss["container-label-modal-options"]}
            htmlFor="orientation-all-toggle-switch"
          >
            <input
              type="radio"
              name="orientation-toggle-switch"
              id="orientation-all-toggle-switch"
              value=""
              onChange={handleOptionChange} // Obsługa zmiany
              checked={options.orientation === ""} // Sprawdzenie, czy zaznaczone
              className={scss["toggle-switch"]}
            />
            <p>All</p>
          </label>
          <label
            className={scss["container-label-modal-options"]}
            htmlFor="orientation-horizontal-toggle-switch"
          >
            <input
              type="radio"
              name="orientation-toggle-switch"
              id="orientation-horizontal-toggle-switch"
              value="landscape"
              onChange={handleOptionChange}
              checked={options.orientation === "landscape"}
              className={scss["toggle-switch"]}
            />
            <p>Horizontal</p>
          </label>
          <label
            className={scss["container-label-modal-options"]}
            htmlFor="orientation-vertical-toggle-switch"
          >
            <input
              type="radio"
              name="orientation-toggle-switch"
              id="orientation-vertical-toggle-switch"
              value="portrait"
              onChange={handleOptionChange}
              checked={options.orientation === "portrait"}
              className={scss["toggle-switch"]}
            />
            <p>Vertical</p>
          </label>
          <label
            className={scss["container-label-modal-options"]}
            htmlFor="orientation-square-toggle-switch"
          >
            <input
              type="radio"
              name="orientation-toggle-switch"
              id="orientation-square-toggle-switch"
              value="squarish"
              onChange={handleOptionChange}
              checked={options.orientation === "squarish"}
              className={scss["toggle-switch"]}
            />
            <p>Square</p>
          </label>
        </div>
        <div className={scss["container-orentation-modal-options"]}>
          <p className={scss["container-orentation-title"]}>Colors:</p>

          {/* <LabelModalOptions
            inputType="radio"
            inputName="color-toggle-switch"
            inputId="color-red-toggle-switch"
            inputValue="red"
            inputOnChange={handleOptionChange}
            inputChecked={options.color === "red"}
            labelClassName={scss["container-label-modal-options"]}
            dataSetFirstColor="red"
            dataSetSecondColor="red"
            containerColorsClassName={scss["color-api-box"]}
            colorTitle="red"
          /> */}
          {colorsInputTable.map((colorConfig) => (
            <LabelModalOptions
              key={colorConfig.inputId}
              {...colorConfig}
              inputOnChange={handleOptionChange}
              inputChecked={options.color === colorConfig.inputValue}
              inputClassName={scss["toggle-switch"]}
              labelClassName={scss["container-label-modal-options"]}
              containerColorsClassName={scss["color-api-box"]}
            />
          ))}
        </div>
      </form>

      <p>Selected orientation: {options.orientation || "all"}</p>
      <p>Selected color: {options.color || "all"}</p>
    </div>
  );
};
