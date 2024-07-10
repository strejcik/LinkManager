import Cookies from "js-cookie";

export const deleteLinkRequest = async(id:string) => {
    const loc = window.location;
    //${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}
    let endpoint = process.env.REACT_APP_IS_LOCALHOST === 'true'? (process.env.REACT_APP_API_BASE_URL + ':' + process.env.REACT_APP_API_BASE_URL_PORT + '/api/deletelink') : (process.env.REACT_APP_API_BASE_URL_SSL + '/api/deletelink');
      return new Promise((resolve, reject) => {
        fetch(endpoint, {
          method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({token: Cookies.get(), data: id}),
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Error fetching data');
          })
          .then(data => resolve(data))
          .catch(error => reject(error));
      });
    }