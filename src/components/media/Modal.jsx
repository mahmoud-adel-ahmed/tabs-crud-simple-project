import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";

const Modal = forwardRef(({ src, type, onClose }, ref) => {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }));

  return (
    <dialog ref={dialogRef} className="backdrop:bg-black/50">
      <div className="flex flex-col items-center justify-center !fixed rounded-lg w-[90%] md:w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:h-[360px] h-[290px]">
        {type === "image" ? (
          <img src={src} alt="Preview" className="w-full h-full rounded-lg" />
        ) : (
          <video
            src={src}
            muted
            controls
            className="w-full h-full rounded-lg object-cover"
            onEnded={onClose}
          />
        )}
        <span
          onClick={() => {
            if (ref.current) ref.current.close();
            onClose();
          }}
          className="w-5 h-5 absolute -left-2 -top-2 rounded-full bg-white text-[20px] flex justify-center items-center leading-4 cursor-pointer font-bold"
        >
          &times;
        </span>
      </div>
    </dialog>
  );
});

Modal.displayName = "Modal";
Modal.propTypes = {
  src: PropTypes.string,
  type: PropTypes.oneOf(["image", "video"]).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
