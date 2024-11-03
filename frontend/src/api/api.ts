const base_URL = "https://7zrmj2iuwl.execute-api.eu-north-1.amazonaws.com";

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

export const getAccount = async (id: string) => {
    const response = await fetch(`${base_URL}/meetup/?id=${id}`, {
        method: 'get',
        headers: { "Content-Type": "application/json"}
    });
    const data = await response.json();
    return data;
}

export const registerToMeetup = async (id: string, token: string) => {
    const response = await fetch(`${base_URL}/meetup/join/?id=${id}`, {
        method: 'put',
        headers: {
            "Content-Type": 'application/json',
            'authorization': `Bearer ${token}`,
        }
    });
    const data = await response.json();
    return data;
}

export const unRegisterToMeetup = async (id: string, token: string) => {
    const response = await fetch(`${base_URL}/meetup/unjoin/?id=${id}`, {
        method: 'put',
        headers: {
            "Content-Type": 'application/json',
            'authorization': `Bearer ${token}`,
        }
    });
    const data = await response.json();
    return data;
}

export const getMeetup = async (id: string) => {
    const response = await fetch(`${base_URL}/meetup/?id=${id}`, {
        method: 'get',
        headers: {
            "Content-Type": 'application/json',
        },
    });
    const data = await response.json();
    return data;
}