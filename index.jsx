import FetchCsrfTokenListener from "./listeners/FetchCsrfTokenListener";
import AxiosCsrfTokenListener from "./listeners/AxiosCsrfTokenListener";

export const CsrfTokenListener = (backendEndpoint, sameOrigin = true, mode = 'fetch') => {
  if (mode === 'fetch'){
    FetchCsrfTokenListener(backendEndpoint, sameOrigin)
  } else if (mode === 'axios') {
    AxiosCsrfTokenListener(backendEndpoint, sameOrigin)
  } else {
    console.error('Mode not supported')
  }
}

export { FetchCsrfTokenListener, AxiosCsrfTokenListener }
