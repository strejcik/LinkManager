import validator from 'validator'
const LinkValidator = (data) => {
    let linkData = data.toString().split(',');
    let status = true;
    linkData = data.toString().split(' ');
    for(let i=0; i < linkData.length; i++){
        if(linkData[i].includes(',')) {
            linkData[i] = linkData[i].replace(' ', ',');
            let linkDataStr = linkData[i].toString();
            let res = linkDataStr.indexOf(',');
            linkDataStr = linkDataStr.slice(0, res);
            linkData[i] = linkDataStr;
        }
    }


    var filtered = linkData.filter(function (el) {
        return el !== '';
      });


    for(let i = 0 ; i < filtered.length; i++) {
        if(validator.isURL(filtered[i]) === false) {
            status = false;
            break;
        }
    }

    return {
        status: status,
        data: filtered
    };
}

export default LinkValidator;