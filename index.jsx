import FetchCsrfTokenListener from "./listeners/FetchCsrfTokenListener";

export const CsrfTokenListener = async(backendEndpoint, sameOrigin = true, mode = 'fetch') => {
  if (mode === 'fetch'){
    FetchCsrfTokenListener(backendEndpoint, sameOrigin)
  } else if (mode === 'axios') {
    const AxiosCsrfTokenListener = await import('./listeners/AxiosCsrfTokenListener').default
    AxiosCsrfTokenListener(backendEndpoint, sameOrigin)
  } else {
    console.error('Mode not supported')
  }
}
