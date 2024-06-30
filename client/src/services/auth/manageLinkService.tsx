import Cookies from "js-cookie";

export const GetLinksRequest = async(setData,setFilteredLinks) => {
  const loc = window.location;
  //${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}/api/getlinks
    return new Promise((resolve, reject) => {
      fetch(`${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}/api/getlinks`, {
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