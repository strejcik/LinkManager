import Cookies from "js-cookie";

export const GetLinkRequest = async(id, setLinkResponse) => {
  const loc = window.location;
  //${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}/api/getlink/${id}
    return new Promise((resolve, reject) => {
      fetch(`${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}/api/getlink/${id}`, {
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
          throw new Error('Error fetching data');
        })
        .then(data => {resolve(data); setLinkResponse([...data]);})
        .catch(error => reject(error));
    });
  }



  export const EditLinkRequest = async(id:any, data, setEditLinkResponse) => {
    const loc = window.location;
    //${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}
      return new Promise((resolve, reject) => {
        fetch(`${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}/api/editlink`, {
          method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({token: Cookies.get(), data: data, id:id }),
        })
          .then(response => {
            if (response.ok) {
              setEditLinkResponse(true);
              return response.json();
            }
            setEditLinkResponse(false);
            throw new Error('Error fetching data, please refresh the page and try again.');
          })
          .then(data => resolve(data))
          .catch(error => reject(error));
      });
    }