import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import * as UnsplashFunction from "../../globalFunctions/unsplashFunctions";
import "./UnsplashApp.scss";

export function PixabayApi() {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const [imgUrlModal, setUrlModal] = useState<string>("");
  const [tagModal, setTagModal] = useState<string>("");
  const [data, setData] = useState<UnsplashFunction.Image[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (newQuery: string) => {
    if (query !== newQuery) {
      setQuery(newQuery);
      setCurrentPage(1);
      setData([]);
      setTotalPages(0);
      setIsButtonVisible(false);
      setError(null);
    }
  };

  const handlePagination = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleLoader = (isLoaderVisible: boolean) => {
    setIsLoaderVisible(isLoaderVisible);
  };

  const handleButton = (isButtonVisible: boolean) => {
    setIsButtonVisible(isButtonVisible);
  };

  const openModal = (imgUrlModal: string, tagModal: string) => {
    setUrlModal(imgUrlModal);
    setTagModal(tagModal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleLoader(true);
    setError(null);
    const fetchPictures = async () => {
      try {
        const response = await UnsplashFunction.fetchPicturesPerPage1(
          query,
          currentPage
        );
        if (response) {
          setData((prev) => [...prev, ...response.results]);
          const totalPages = response.total_pages;
          setTotalPages(totalPages);
          const showButton =
            currentPage < totalPages && response.results.length > 0;
          handleButton(showButton);
        }
      } catch (errors: unknown) {
        if (errors instanceof Error) {
          setError(errors.message);
        } else {
          console.error("An unexpected error occurred");
        }
      } finally {
        handleLoader(false);
      }
    };
    fetchPictures();
  }, [query, currentPage]);

  useEffect(() => {
    if (data.length > 0) {
      const toastMessage = `Info:\nAktualna strona: ${currentPage}\nLiczba stron: ${totalPages}\nLiczba obrazków na stronie: ${data.length}`;
      toast(toastMessage, {
        duration: 4000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(
        "%c Error ",
        "color: white; background-color: #D33F49",
        `${error}`
      );
    }
  }, [error]);

  return (
    <div className="app">
      <Searchbar handleSearch={handleSearch} />
      {error ? (
        <p>Wystąpił błąd: {error}</p>
      ) : (
        <>
          <>
            <ImageGallery openModal={openModal} data={data} />
            {isLoaderVisible && <Loader isLoaderVisible={isLoaderVisible} />}
            {isButtonVisible && (
              <Button
                handlePagination={handlePagination}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            )}
          </>
        </>
      )}
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          imgUrlModal={imgUrlModal}
          tagModal={tagModal}
          isModalOpen={isModalOpen}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
