import Cookies from "js-cookie";

export const addLinkRequest = async(d:object, setAddLinkResponse, setCache, setViewsCache) => {
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
            return response.json();
          }
          if(!response.ok) {
            if(response.status === 401) {
              Cookies.remove("token");
            }
          }
          setAddLinkResponse(false);
          throw new Error('Error fetching data');
        })
        .then(data => {resolve(data); setCache(true); setAddLinkResponse(true); setViewsCache(true)})
        .catch(error => reject(error));
    });
  }