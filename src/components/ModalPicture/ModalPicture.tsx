import Modal from "react-modal";
import "./ModalPicture.scss";
Modal.setAppElement("#root");
// interface ModalProps {
//   closeModal: () => void;
//   imgUrlModal: string;
//   tagModal: string;
// }

// export function Modal({ closeModal, imgUrlModal, tagModal }: ModalProps) {
//   const handleEsc = useCallback(
//     (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         closeModal();
//       }
//     },
//     [closeModal]
//   );

//   useEffect(() => {
//     window.addEventListener("keydown", handleEsc);

//     return () => {
//       window.removeEventListener("keydown", handleEsc);
//     };
//   }, [handleEsc]);

//   const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
//     if (event.target === event.currentTarget) {
//       closeModal();
//     }
//   };

//   return (
//     <div className="overlay" onClick={handleClickOutside}>
//       <div className="modal">
//         <img src={imgUrlModal} alt={tagModal} />
//       </div>
//     </div>
//   );
// }

interface ModalReactProps {
  closeModal: () => void;
  imgUrlModal: string;
  tagModal: string;
  isModalOpen: boolean;
}
export function ModalPicture({
  closeModal,
  imgUrlModal,
  tagModal,
  isModalOpen,
}: ModalReactProps) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      className="modal"
      overlayClassName="overlay"
    >
      <img src={imgUrlModal} alt={tagModal} />
    </Modal>
  );
}
