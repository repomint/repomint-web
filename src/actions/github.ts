// TODO: don't use .then().catch() 

const GITHUB_API_URL = `https://api.github.com`;


export const parseOAuthCode = () => {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);

    const code = params.get("code");

    return code;
}

const callGatekeeper = async (params: {code: string}) => {
    const host = process.env.REACT_APP_GATEKEEPER_URL;

    if (!host) {
        console.log("REACT_APP_GATEKEEPER_URL environment variable is not found");

        return null;
    }

    if (params.code === "") {
        console.log("No code provided");

        return null;
    }

    const gatekeeperUrl = host + `/authenticate/${params.code}`;

    // this doesn't look correct
    const res = await (await fetch(gatekeeperUrl)).json();

    return res.token;
}

// uses gatekeeper server
export const getOAuthToken = (params: {code: string}) => {
    const token = callGatekeeper(params);

    return token;
}

// TODO: use octokit.js?
export const getUserInfo = async (params: {token: string}) => {
    const user_url = new URL("/user", GITHUB_API_URL);
    
    const res = await (await fetch(user_url.toString(), {
        method: "GET",
        headers: new Headers({
            "Authorization": `token ${params.token}`
            })
        })).json();
    
    return res
}