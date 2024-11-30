import { createContext, useContext } from "react";
import { ImageContextType } from "./ImageProvider";

// Tworzymy kontekst z typem ImageContextType
export const ImageContext = createContext<ImageContextType | undefined>(
  undefined
);

// Niestandardowy hak do używania kontekstu ImageContext
export const useOptionsImageContext = (): ImageContextType => {
  const context = useContext(ImageContext);

  // Jeśli kontekst nie jest dostępny, rzucamy błąd (zapobiegamy używaniu poza providerem)
  if (!context) {
    throw new Error("useOptionsImage must be used within an ImageProvider.");
  }

  return context;
};


