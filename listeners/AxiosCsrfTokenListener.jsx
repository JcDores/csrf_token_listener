/*
  Applies a Listener to all request to a specific Endpoint using Axios
*/
const AxiosCsrfTokenListener = async(backendUrl, sameOrigin = true) => {
  const axios = await import('axios');
  if (!axios) {
    console.error('Axios not recognized')
    return 
  }
  
  var csrfToken = ''
  const AxiosCli = axios.default
  AxiosCli.defaults.withCredentials = !sameOrigin
  AxiosCli.defaults.transformRequest = [function (data, headers) {
    // Do whatever you want to transform the data
    if (this.url.startsWith(backendUrl)) {
      headers['X-CSRF-Token'] = csrfToken
    }

    return [data, headers];
  }]
  AxiosCli.defaults.transformResponse = [function (data, headers) {
    if (this.url.startsWith(backendUrl)) {
      const retrievedCsrfToken = headers.get('x-csrf-token')
      if (retrievedCsrfToken != null) {
        csrfToken = retrievedCsrfToken
      }
    }

    return data;
  }]
}

export default AxiosCsrfTokenListener
