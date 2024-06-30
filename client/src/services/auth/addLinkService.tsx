import Cookies from "js-cookie";

export const AddLinkRequest = async(d:object, setAddLinkResponse) => {
  const loc = window.location;
  //${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}
    return new Promise((resolve, reject) => {
      fetch(`${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}/api/addlink`, {
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