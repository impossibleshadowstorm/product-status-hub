import { toast, ToastOptions } from "react-toastify";

type NotificationType = "info" | "success" | "warning" | "error";

export const showNotification = (
  type: NotificationType,
  message: string | any,
  duration: number
): void => {
  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: duration,
    closeOnClick: true,
  };

  if (type === "error" && message.response) {
    toast[type](message, toastOptions);
  } else {
    toast[type](message, toastOptions);
  }
};
