import Cookies from "js-cookie";


export const registerUser = async (email, password, setAccountCreated) => {
    let endpoint = process.env.REACT_APP_IS_LOCALHOST === 'true'? (process.env.REACT_APP_API_BASE_URL + ':' + process.env.REACT_APP_API_BASE_URL_PORT + '/api/register') : (process.env.REACT_APP_API_BASE_URL_SSL + '/api/register');
    try {
        const response = await fetch(endpoint, {
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


export const loginUser = async (credentials, setAuth) => {
    let endpoint = process.env.REACT_APP_IS_LOCALHOST === 'true'? (process.env.REACT_APP_API_BASE_URL + ':' + process.env.REACT_APP_API_BASE_URL_PORT + '/api/login') : (process.env.REACT_APP_API_BASE_URL_SSL + '/api/login');
    try {
        const response = await fetch(endpoint, {
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





  




