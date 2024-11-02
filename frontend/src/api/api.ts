const base_URL = "https://5nbb4bxz8l.execute-api.eu-north-1.amazonaws.com";

export const registerUser = async (username: string, email: string, password: string) => {
    const response = await fetch(`${base_URL}/account/signup`, {
        method: "post",
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
}

export const logInUser = async (password: string, email?:string, username?:string) => {
    const response = await fetch(`${base_URL}/account/login`, {
        method: 'post',
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
}

export const getAllMeetups = async () => {
    const response = await fetch(`${base_URL}/meetup`, {
        method: 'get',
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data; 
}