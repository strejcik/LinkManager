import Cookies from "js-cookie";

export const DeleteLinkRequest = async(id:string) => {
    const loc = window.location;
    //${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}
      return new Promise((resolve, reject) => {
        fetch(`${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}/api/deletelink`, {
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