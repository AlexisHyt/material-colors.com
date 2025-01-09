import {toast} from "vue3-toastify";

export const defaultColorCopyToastOptions = (text: string) => ({
  autoClose: 4000,
  position: toast.POSITION.BOTTOM_RIGHT,
  theme: toast.THEME.COLORED,
  toastStyle: {
    background: '#131313',
    color: '#ffffff',
    fontWeight: 'bold',
    height: '80px',
  },
  progressStyle: {
    background: text,
    height: '20px',
  }
})