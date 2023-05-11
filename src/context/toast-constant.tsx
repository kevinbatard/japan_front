import { ReactElement, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";

interface ToastContextProps {
  children: ReactElement;
}

interface ToastContextType {
  successToast: (msg: string) => void;
  failToast: (msg: string) => void;
}

export const ToastContext = createContext<ToastContextType>({
  successToast: (msg: string) => {},
  failToast: (msg: string) => {},
});

export const ToastContextProvider = ({ children }: ToastContextProps) => {
  const notifySuccess = (msg: string) =>
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (msg: string) =>
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const contextValue = {
    successToast: notifySuccess,
    failToast: notifyError,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
