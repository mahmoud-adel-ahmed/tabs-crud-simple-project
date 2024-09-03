import { memo, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import PropTypes from "prop-types";

const ImgPreview = ({ images, setImages, handleDelete }) => {
  let [image, setImage] = useState(null);
  let dialogRef = useRef(null);

  useEffect(() => {
    return () => {
      [...images]?.forEach((image) => URL.revokeObjectURL(image));
    };
  }, [images]);

  let handleCloseImage = () => {
    dialogRef.current && dialogRef.current.close();
    window.document.documentElement.style.overflow = "";
    setImage(null);
  };

  let _handleDelete = (id) => {
    handleDelete(images, id, setImages);
  };

  return (
    <>
      <Modal
        ref={dialogRef}
        src={image}
        type="image"
        onClose={handleCloseImage}
      />
      {images.length > 0 && (
        <>
          <h3 className="text-lg mt-4 font-bold capitalize">images</h3>
          <div className="my-4 flex gap-4 flex-wrap rounded-lg">
            {[...images]?.map((el, index) => (
              <div className="relative" key={index}>
                <img
                  src={URL.createObjectURL(el)}
                  className="w-80 h-48 cursor-pointer rounded-lg select-none"
                  onClick={() => {
                    setImage(URL.createObjectURL(el));
                    // dialogRef.current & dialogRef.current.showModal();
                    dialogRef.current & dialogRef.current.open();
                    window.document.documentElement.style.overflow = "hidden";
                  }}
                />
                <span
                  onClick={_handleDelete.bind(null, index)}
                  className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full cursor-pointer"
                >
                  &times;
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

ImgPreview.displayName = "ImgPreview";
ImgPreview.propTypes = {
  images: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  setImages: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default memo(ImgPreview);

{
  /* <dialog ref={dialogRef} className="backdrop:bg-black/50">
        <div className="flex flex-col items-center justify-center !fixed rounded-lg w-[90%] md:w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[360px]">
          <img src={image} alt="" className="w-full h-full rounded-lg" />
          <span
            onClick={() => {
              dialogRef.current && dialogRef.current.close();
              window.document.documentElement.style.overflow = "";
              setImage(null);
            }}
            className="w-5 h-5 absolute -left-2 -top-2 rounded-full bg-white text-[20px] flex justify-center items-center leading-4 cursor-pointer font-bold"
          >
            &times;
          </span>
        </div>
      </dialog> */
}
