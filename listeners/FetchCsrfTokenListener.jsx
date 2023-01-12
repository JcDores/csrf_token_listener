/* 
  Applies a Listener to all request to a specific Endpoint using FetchAPI
*/
const CsrfTokenListener = (backendEndpoint, sameOrigin = true) => {
  var csrfToken = ''
  window.fetch = new Proxy(window.fetch, {
    apply(fetch, that, args) {
        const url = args[0]
        let options = args[1] || {}

        if (url.startsWith(backendEndpoint)) {
          let headersWithCSRF = options['headers'] || {}
          let credentials = 'include'
          headersWithCSRF['X-CSRF-Token'] = csrfToken
          if (sameOrigin) {
            credentials = 'same-origin'
          }
          options = {headers: headersWithCSRF, credentials, ...options}
        }
        const newArgs = [url, options, ...args.splice(2)]
        const result = fetch.apply(that, newArgs);
        
        result.then((response) => {
          if (url.startsWith(backendEndpoint)) {
            const retrievedCsrfToken = response.headers.get('x-csrf-token')
            if (retrievedCsrfToken != null) {
              csrfToken = retrievedCsrfToken
            }
          }
        })

        return result;
    }
  })
}
export default CsrfTokenListener