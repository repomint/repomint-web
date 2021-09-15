export const parseOAuthCode = () => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);

    const code = params.get("code");

    return code
}

const callGatekeeper = (code: string) => {
    const url = `http://localhost:9999/authenticate/${code}`;

    if (code === "") {
        return ""
    }
    return fetch(url)
        .then(response => response.json())
        .then(function(response) {
            if (response.error) {
                console.log(response.error);

                return ""
            }

            return response.token;
        })
        .catch(function(error) {
            // throw new Error("Gatekeeper call was unsuccessful");
            console.log("Gatekeeper call was unsuccessful");

            return ""
        })
}

// uses gatekeeper server
export const getOAuthToken = (code: string) => {
    const token = callGatekeeper(code);

    return token
}