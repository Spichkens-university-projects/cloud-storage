import toast from "react-hot-toast";

export const errorHandler = (error: any) => error.response && error.response.data
  ? error.response.data.message
  : error.message;

export const toastError = (error: any) => {
  const messages = errorHandler(error)
  if (Array.isArray(messages)) {
    messages.map(message => toast.error(message))
  } else {
    toast.error(messages)
  }
  throw messages
}


