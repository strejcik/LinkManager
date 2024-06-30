import { ip } from '@form-validation/validator-ip';


const IpValidator = (data:any) => {
    let linkData = data.toString().split(',');
    let status = true;

    for(let i=0; i < linkData.length; i++){
        linkData[i] = linkData[i].trim();
    }
    

    var filtered = linkData.filter(function (el) {
        return el !== '';
      });
      

    for(let i = 0 ; i < filtered.length; i++) {
        const ipCheck = ip().validate({
            value: filtered[i],
            options: {
                ipv4: true,
            },
        });
        if(ipCheck.valid === false) {
            status = false;
            break;
        }
    }
    
    return {
        status: status,
        data: filtered
    };
}

export default IpValidator;