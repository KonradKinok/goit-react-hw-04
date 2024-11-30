import { UnsplashApp } from "./components/UnsplashApp/UnsplashApp";
import { ImageProvider } from "./components/Context/ImageProvider";
const App: React.FC = () => {
  return (
    <ImageProvider>
      <UnsplashApp />
    </ImageProvider>
  );
};

export default App;
