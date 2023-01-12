## CSRF Token Listener
This allows to certain exchanges with a backend server to exchange CSRF Tokens, allowing more security between the server using Fetch API or Axios Client

To use **axios** make sure to install it in your app as a dependency, flagged as a peerDepency only. 

[Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
[Axios Documentation](https://github.com/axios/axios)

## Browser Support

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 Fetch(✗) Axios (✔) |

## Installing

### Package manager

Using npm:

```bash
$ npm install csrf_token_listener
```

Using yarn:

```bash
$ yarn add csrf_token_listener
```

# Feature
## FetchCsrfTokenListener/AxiosCsrfTokenListener
FetchCsrfTokenListener/AxiosCsrfTokenListener requires
- backendEndpoint(string), the Base Endpoint that listen for CSRF and send on every request
- sameOrigin (Boolean), specifies if both App & Backend are working in the same Domain. If not credentials will be applied to persist session. Defaulted as true

## CsrfTokenListener
Same as FetchCsrfTokenListener/AxiosCsrfTokenListener with the addition of mode
- mode(string), accepts only axios or fetch. Defaulted to fetch
-

## Example
Add it into the App.js inside a new React app, this way each request made in all sub-components and routes are catched via CsrfTokenListener

### Fetch API Example
```
import { FetchCsrfTokenListener } from 'csrf_token_listener'
...
function App() {
  FetchCsrfTokenListener('http://localhost:3000', false);

  return (
    <div>
      // Write your App here
    </div>
  )
```

### Axios API Example
```
import { AxiosCsrfTokenListener } from 'csrf_token_listener'
...
function App() {
  AxiosCsrfTokenListener('http://localhost:3000', false);

  return (
    <div>
      // Write your App here
    </div>
  )
```

## Make sure to do this changes to your Backend Server
Once you have the package installed, make sure that your Backend server returns a CSRF Server and validates CSRF in every API request

### Rails

Add inside the top-level ApplicationController/ApiController:
```
skip_before_action :verify_authenticity_token
before_action :verify_request
after_action :set_csrf_cookie
...
def verify_request
  valid_request = !protect_against_forgery? || request.get? || request.head? ||
                  valid_authenticity_token?(session, form_authenticity_param) ||
                  valid_authenticity_token?(session, request.headers['X-CSRF-Token'])

  head :unprocessable_entity if valid_request == false
end

def set_csrf_cookie
  response.set_header('x-csrf-token', form_authenticity_token)
end
```

This enables all requests & responses on the API, to retrieve a csrf token and requiring a csrf verification for posts/patch/delete actions

We still disable the verify_authenticity due to it's check on origin (needs to be same origin). Since an API can accept multiple different Origins, a rearranged method is application `verify_request`

