import Cookies from "js-cookie";

export const getLinksRequest = async(setData,setFilteredLinks) => {
  let endpoint = process.env.REACT_APP_IS_LOCALHOST === 'true'? (process.env.REACT_APP_API_BASE_URL + ':' + process.env.REACT_APP_API_BASE_URL_PORT + `/api/getlinks`) : (process.env.REACT_APP_API_BASE_URL_SSL + `/api/getlinks`);
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
        .then(data => {resolve(data); setData([...data]);         setFilteredLinks([...data]);})
        .catch(error => reject(error));
    });
  }