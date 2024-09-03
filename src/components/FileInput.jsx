import { memo, useCallback, useState } from "react";
import VideoPreview from "./media/VideoPreview";
import ImgPreview from "./media/ImgPreview";
import FilesPreview from "./media/FilesPreview";

const FileInput = () => {
  let [images, setImages] = useState([]);
  let [videos, setVideos] = useState([]);
  let [_files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // State for uploading status

  let handleChange = async (e) => {
    const files = Array.from(e.target.files);

    let photos = files.filter((el) => el.type.startsWith("image"));
    let videos = files.filter((el) => el.type.startsWith("video"));
    let uploadedFiles = files.filter((el) => el.type.startsWith("application"));
    setIsUploading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setImages((prevImages) => [...prevImages, ...photos]);
      setVideos((prevVideos) => [...prevVideos, ...videos]);
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }

    e.target.value = null;
  };

  let handleDelete = useCallback((data, id, fn) => {
    let items = [...data];
    items.splice(id, 1);
    fn(items);
  }, []);

  return (
    <>
      <div>
        <label
          htmlFor="file"
          className="cursor-pointer bg-green-600 text-white p-2 rounded-lg mb-4"
        >
          upload file
        </label>
        <input
          multiple
          className="hidden"
          type="file"
          id="file"
          onChange={handleChange}
        />
      </div>

      {isUploading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black/10 z-50">
          <div className="flex justify-center items-center h-full">
            <div className="w-16 h-16 border-4 border-green-700 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          {images && (
            <ImgPreview
              images={images}
              setImages={setImages}
              handleDelete={handleDelete}
            />
          )}
          {videos && (
            <VideoPreview
              videos={videos}
              setVideos={setVideos}
              handleDelete={handleDelete}
            />
          )}
          {_files && (
            <FilesPreview
              files={_files}
              setFiles={setFiles}
              handleDelete={handleDelete}
            />
          )}
        </>
      )}
    </>
  );
};

export default memo(FileInput);
