
const http = {
    
    post ({url, body, headers}) {
        return fetch(url, {
            method: "POST",
            headers: headers || {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        })
        .then(res => res.json())
    },
    
    get (url, headers) {
        return fetch(url, {headers}).then(res => res.json());
    },
    
};

export default http;