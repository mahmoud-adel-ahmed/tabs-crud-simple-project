import { memo, useMemo, useRef, useState } from "react";
import Modal from "./Modal";
import PropTypes from "prop-types";

const VideoPreview = ({ videos, setVideos, handleDelete }) => {
  let [video, setVideo] = useState(null);
  let dialogRef = useRef(null);

  let handleVideoClick = (el) => {
    setVideo(URL.createObjectURL(el));
    // dialogRef.current && dialogRef.current?.showModal();
    dialogRef.current && dialogRef.current.open();
    window.document.documentElement.style.overflow = "hidden";
  };

  const handleCloseDialog = () => {
    dialogRef.current && dialogRef.current.close();
    window.document.documentElement.style.overflow = "";
    setVideo(null);
  };

  let _handleDelete = (id) => {
    handleDelete(videos, id, setVideos);
  };

  return (
    <>
      <Modal
        ref={dialogRef}
        src={video}
        type="video"
        onClose={handleCloseDialog}
      />
      {videos.length > 0 && (
        <>
          <h3 className="text-lg mt-4 font-bold capitalize">videos</h3>
          <div className="w-full flex gap-4 flex-wrap h-full my-4">
            {[...videos]?.map((el, index) => (
              <div
                className="w-80 h-48 rounded-lg bg-black/60 relative"
                style={{ aspectRatio: "16 / 9" }}
                key={index}
              >
                <video
                  src={URL.createObjectURL(el)}
                  className=" w-full h-full rounded-lg cursor-pointer object-cover"
                  onClick={handleVideoClick.bind(null, el)}
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

VideoPreview.displayName = "VideoPreview";
VideoPreview.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  setVideos: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default memo(VideoPreview);

{
  /* <dialog ref={dialogRef} className="backdrop:bg-black/50 w-full ">
        <div className="flex flex-col items-center justify-center !fixed rounded-lg w-[90%] md:w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  h-[360px]">
          <video
            src={video}
            muted
            controls
            className="w-full h-full rounded-lg object-cover"
            onEnded={handleCloseDialog}
          />
          <span
            onClick={handleCloseDialog}
            className="w-5 h-5 absolute -left-2 -top-2 rounded-full bg-white text-[20px] flex justify-center items-center leading-4 cursor-pointer font-bold "
          >
            &times;
          </span>
        </div>
      </dialog> */
}
