import axios, { AxiosResponse } from 'axios'
import toast from '../toast'

const responseToast = (response: AxiosResponse<any, any>, message = false) => {
  let text: any = ''
  if (response && response.status !== 200 && response.data.error) {
    text = response.data.error
  } else if (response && response.status !== 200) {
    text = response.data.message
  } else if (message) {
    text = message
  }

  if (text) {
    toast.error(text)
  }
}

axios.interceptors.request.use(
  (config: any) => {
    const token = window?.localStorage?.token
    //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFkZHJlc3MiOnsiSG9tZURldGFpbHMiOiIzMy9CIFNhdHlha2FtLXNvYyBOZW1pbmF0aG5hZ2FyIE5laHJ1bmFnYXIiLCJjaXR5RGlzdHJpY3RUb3duIjoiQWhlbWRhYmFkIiwic3RhdGUiOiJHdWphcmF0IiwibGFuZG1hcmsiOiJOZWhydW5hZ2FyIiwiemlwQ29kZSI6MzgwMDE1fSwicGVyc29uYWxEZXRhaWxzIjp7ImZ1bGxOYW1lIjoiUlJSUiIsIkZhdGhlck5hbWUiOiJRV0UiLCJNb3RoZXJOYW1lIjoiQUNWIiwibWF0aXJhbFN0YXR1cyI6IlNpbmdsZSIsInBob25lTnVtYmVyIjoxMjM0NTY3ODkwfSwiYmFua0RldGFpbHMiOnsiYmFua05hbWUiOiJZYXNoIEJhbmsiLCJiYW5ja0lGU0MiOiJBSEtKQUhTSiIsImJyYW5jaE1DUiI6IkpMS0pBU0siLCJiYW5rQWNjb3VudE51bWJlciI6MTMyNDU2Nzk4LCJVUElfSUQiOiIxMzI0NTY3OThAcGF5dG0ifSwiYmFja2dyb3VuZERldGFpbHMiOnsiQW5udWFsSW5jb21lIjoxMjAwMDAwLCJUcmFkaW5nRXhwZXJpZW5jZSI6IjIgWWVhcnMiLCJGdW5kU2F0ZWxtZW50IjoiNCBNb250aHMiLCJPY2N1cGF0aW9uIjoiQnVzc2luZXNzbWFuIn0sIl9pZCI6IjYzODhhYmU3MDFlMzU5MDRmYjUzZGRjMyIsImVtYWlsSWQiOiJkQG0uY29tIiwiYWNjb3VudENyZWF0ZWRBdCI6IjIwMjItMTItMDFUMTM6Mjg6MDcuNTIwWiIsInN0YXR1cyI6IkFjdGl2ZSIsImFwcHJvdmVkVXNlciI6dHJ1ZSwicm9sZSI6IlVzZXIiLCJfX3YiOjAsIk9UUCI6MjcxNDQ5LCJPVFBFeHAiOiIyMDIyLTEyLTA4VDEyOjAxOjM3LjE1M1oiLCJwYW5jYXJkIjoiQUJDREVGRyIsInByb2Nlc3NpbmdGZWVQYWlkIjp0cnVlLCJ1c2VyTmFtZSI6IkRyYXRob2QifSwiaWF0IjoxNjcwNTAwNzg1LCJleHAiOjE2NzA1ODcxODV9.Ys-D8NpJAhBATUGDxaRCTghihqheVGqwDuFMaKUmbxk'

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    responseToast(response)
    return response
  },
  (error) => {
    // document
    //   .querySelector('.loader')
    //   .style.setProperty('display', 'none', 'important')
    responseToast(error.response, error.message)
    if (error.response !== undefined && error.response.status === 401) {
      window?.localStorage?.removeItem('token')
      //   window.location = '/user/login'
    }

    return Promise.reject(error)
  }
)

export default axios
