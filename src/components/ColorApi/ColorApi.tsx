import { useEffect } from "react";
import scss from "./ColorApi.module.scss";

const allowedColors = [
  {
    name: "black_and_white",
    firstColor: "black",
    secondColor: "white",
  },
  {
    name: "black",
    firstColor: "black",
    secondColor: "black",
  },
  {
    name: "yellow",
    firstColor: "yellow",
    secondColor: "yellow",
  },
];

export const ColorApi: React.FC = () => {
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

  return (
    <div>
      {allowedColors.map(({ name, firstColor, secondColor }) => (
        <div key={name}>
          <div
            data-firstcolor={firstColor}
            data-secondcolor={secondColor}
            className={scss["color-api-box"]}
          ></div>
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};
