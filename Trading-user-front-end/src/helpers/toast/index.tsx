
import { toast as reactToastify, ToastContentProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ToastOptions = {
  position: any
  autoClose: any
  hideProgressBar: boolean
  closeOnClick: boolean
  draggable: boolean
}

const options: ToastOptions = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: false,
}

export default {
  success(text) {
    reactToastify.success(text, options)
  },

  info(text) {
    reactToastify.info(text, options)
  },

  error(text) {
    reactToastify.error(text, options)
  },

  warning(text) {
    reactToastify.warning(text, options)
  },
}
