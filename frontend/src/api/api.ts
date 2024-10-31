const base_URL = "https://5nbb4bxz8l.execute-api.eu-north-1.amazonaws.com";

export const registerUser = async (username: string, email: string, password: string) => {
    try {
        let response = await fetch(`${base_URL}/account/signup`, {
            method: "post",
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}