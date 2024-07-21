import CloseIcon from "@/icons/CloseIcon";

function ModalCloseButton(props: { onClose: () => void }) {
  const { onClose } = props;
  return (
    <button
      className="m-2 text-gray-700 hover:bg-black/10 rounded-full p-3"
      onClick={onClose}
    >
      <CloseIcon />
    </button>
  );
}

export default ModalCloseButton;
