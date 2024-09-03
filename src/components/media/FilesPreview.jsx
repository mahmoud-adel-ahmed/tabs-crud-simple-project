import PropTypes from "prop-types";

const FilesPreview = ({ files, setFiles, handleDelete }) => {
  let _handleDelete = (id) => {
    handleDelete(files, id, setFiles);
  };
  return (
    <>
      {files?.length > 0 && (
        <>
          <h3 className="text-lg mt-4 font-bold capitalize">files</h3>
          <div className="my-4 flex gap-4 flex-wrap rounded-lg">
            {[...files]?.map((el, index) => {
              return (
                <div
                  key={index}
                  className="bg-green-100 shadow-md p-4 rounded-lg border border-gray-200 relative"
                >
                  <div className="flex flex-col items-start">
                    <p className="font-medium text-md text-gray-800">
                      {el.name}
                    </p>
                    <p className="text-gray-600">
                      {(el.size / (1024 * 1024)).toFixed(2)}mb
                    </p>
                  </div>
                  <span
                    onClick={_handleDelete.bind(null, index)}
                    className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full cursor-pointer"
                  >
                    &times;
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

FilesPreview.displayName = "FilesPreview";
FilesPreview.propTypes = {
  files: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  setFiles: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired ,
};

export default FilesPreview;
