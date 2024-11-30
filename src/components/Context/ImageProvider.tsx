import React, { ReactNode } from "react";
import { ImageContext } from "./useOptionsImage";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface Options {
  orientation: string;
  color: string;
}
// Typ dla kontekstu
export interface ImageContextType {
  options: Options; // Obiekt zawierający orientację
  setOptions: React.Dispatch<React.SetStateAction<Options>>; // Funkcja zmiany opcji
}
// Typ dla propsów w providerze
interface ImageProviderProps {
  children: ReactNode;
}

// Komponent dostawcy kontekstu
export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [options, setOptions] = useLocalStorage(
    { orientation: "", color: "" }, // Wartość początkowa
    "__options_storage_key" // Klucz w localStorage
  );

  // Wartość kontekstu (obiekt z opcjami)
  const value: ImageContextType = {
    options,
    setOptions,
  };

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};
