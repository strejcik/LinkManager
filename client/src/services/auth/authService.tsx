import Cookies from "js-cookie";


export const RegisterUser = async (email, password, setAccountCreated) => {
    const loc = window.location;
    //`${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}/api/register`
    try {
        const response = await fetch(`${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = response.json()

        if (!response.ok) {
            throw new Error("REGISTRATION FAILED");
        }

        if (!response) {
            console.log(data)
            return
        }


        setAccountCreated(true);



    } catch (error) {
        console.error('Error registering user:', error);
    }
};


export const LoginUser = async (credentials, setAuth) => {
    const loc = window.location;
    //`${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}/api/login`
    try {
        const response = await fetch(`${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':5000' : ''}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Login failed. Please try again.');
        }
        

        const token = data.token;

        setAuth(true);


        // Store static values in Cookies
        Cookies.set('token', token, { expires: 5 });
        Cookies.set("email", data.email, { expires: 5 })
        

    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error(error);
    }
};





  




