import Cookies from "js-cookie";

export const getLinkRequest = async(id, setLinkResponse) => {
  let endpoint = process.env.REACT_APP_IS_LOCALHOST === 'true'? (process.env.REACT_APP_API_BASE_URL + ':' + process.env.REACT_APP_API_BASE_URL_PORT + `/api/getlink/${id}`) : (process.env.REACT_APP_API_BASE_URL_SSL + `/api/getlink/${id}`);
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
          if(!response.ok) {
            if(response.status === 401) {
              Cookies.remove("token");
            }
          }
          throw new Error('Error fetching data');
        })
        .then(data => {resolve(data); setLinkResponse([...data]);})
        .catch(error => reject(error));
    });
  }



  export const editLinkRequest = async(id:any, data, setEditLinkResponse, ls, setLs, setViewsCache) => {
    let endpoint = process.env.REACT_APP_IS_LOCALHOST === 'true'? (process.env.REACT_APP_API_BASE_URL + ':' + process.env.REACT_APP_API_BASE_URL_PORT + `/api/editlink`) : (process.env.REACT_APP_API_BASE_URL_SSL + `/api/editlink`);
      return new Promise((resolve, reject) => {
        fetch(endpoint, {
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
            if(!response.ok) {
              if(response.status === 401) {
                Cookies.remove("token");
              }
            }
            setEditLinkResponse(false);
            throw new Error('Error fetching data, please refresh the page and try again.');
          })
          .then(d =>{
              resolve(d); 
              let tempLsItem = ls.filter( e => e.id !== id);
              let tempLsObj = data;
              tempLsObj.id = id;
              tempLsItem.push(tempLsObj);
              setLs(tempLsItem);

              setViewsCache(true);
              
            })
          .catch(error => reject(error));
      });
    }