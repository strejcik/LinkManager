import Cookies from "js-cookie";


export const getViewsRequest = async(setViews) => {
  let endpoint = process.env.REACT_APP_IS_LOCALHOST === 'true'? (process.env.REACT_APP_API_BASE_URL + ':' + process.env.REACT_APP_API_BASE_URL_PORT + `/api/getlinkviews`) : (process.env.REACT_APP_API_BASE_URL_SSL + `/api/getlinkviews`);
      return new Promise((resolve, reject) => {
        fetch(endpoint, {
          method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${JSON.stringify(Cookies.get())}`
              },
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Error fetching data, please refresh the page and try again.');
          })
          .then(data => {resolve(data); setViews(data)})
          .catch(error => reject(error));
      });
    }