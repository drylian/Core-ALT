import React from "react";

const MessageBox = ({ status, message, title }) => {
  const [showAlert, setShowAlert] = React.useState(true);

  const getBackground = () => {
    switch (status) {
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-blue-500";
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-lightBlue-500";
    }
  };
  const getTitleBackground = () => {
    switch (status) {
      case "error":
        return "bg-red-400";
      case "info":
        return "bg-blue-400";
      case "success":
        return "bg-green-400";
      case "warning":
        return "bg-yellow-400";
      default:
        return "bg-lightBlue-400";
    }
  };

  const titleClasses = `flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3 leading-none ${getTitleBackground()} text-white`;

  return (
    <>
      {showAlert ? (
        <div
          className={`text-white px-2 py-2 border-0 rounded-xl relative mb-4 ${getBackground()}`}
        >
          <div className="flex items-center mb-2">
            <div
              className={`w-4 h-4 rounded-full mr-2 ${getBackground()}`}
            ></div>
            <span className="text-xl inline-block mr-5 align-middle">
              <i className="fas fa-bell" />
            </span>
            {title && (
              <div className="flex items-center mr-8">
                <span className={`inline-block align-middle mr-2 border-b border-white pb-1 ${titleClasses}`}>
                  {title}
                </span>
                <span className="inline-block align-middle">{message}</span>
              </div>
            )}
          </div>
          {!title && <span>{message}</span>}
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-2 mr-6 outline-none focus:outline-none flex items-center justify-center"
            onClick={() => setShowAlert(false)}
          >
            <span className="w-4 h-4">×</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default MessageBox;
