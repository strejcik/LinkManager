import Cookies from "js-cookie";

export const addLinkRequest = async(d:object, setAddLinkResponse) => {
  const loc = window.location;
  //${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}
  let endpoint = process.env.REACT_APP_IS_LOCALHOST === 'true'? (process.env.REACT_APP_API_BASE_URL + ':' + process.env.REACT_APP_API_BASE_URL_PORT + '/api/addlink') : (process.env.REACT_APP_API_BASE_URL_SSL + '/api/addlink');
    return new Promise((resolve, reject) => {
      fetch(endpoint, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: Cookies.get(), data: d}),
      })
        .then(response => {
          if (response.ok) {
            setAddLinkResponse(true);
            return response.json();
          }
          setAddLinkResponse(false);
          throw new Error('Error fetching data');
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }