let formatLink = (link) => {
    let httpLink = link.substring(0, 7);
    let httpsLink = link.substring(0,8);
    let finalUrl;
    if(httpLink === 'http://' || httpsLink === 'https://') {
      return link;
    } else {
      finalUrl = `https://${link}`;
      return finalUrl;
    }
}

export default formatLink;