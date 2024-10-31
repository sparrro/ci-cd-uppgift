const base_URL = "https://ikx66f1rza.execute-api.eu-north-1.amazonaws.com";

export const registerUser = async (username: string, email: string, password: string) => {
    let data: Response = await fetch(`${base_URL}/account/signup`, {
        method: "post",
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
        headers: { "Content-Type": "application/json" },
    });
    data = await data.json();
    return data;
}