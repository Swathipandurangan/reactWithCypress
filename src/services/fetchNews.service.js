
const handleError = response => {
    if(response.status === 404) {
        return Promise.reject(new Error('Invalid URL..'));
    } else if(response.status === 500) {
        return Promise.reject(new Error('Some internal error occurred..'));
    } else if(response.status === 401) {
        return Promise.reject(new Error('UnAuthorized User..'));
    }
    return Promise.reject(new Error('Generic Error..'));
}

const apiKey='01842bcc47dd4bb99b7080f7f58b4d81';

async function fetchNewsAsync(token, isReadNow) {
    const url = isReadNow ? 'http://localhost:3001/api/v1/news' : 'https://newsapi.org/v2/top-headlines?country=in&apiKey='+apiKey;
    let headers = {};
    if (isReadNow && token) {
        headers.Authorization = `Bearer ${token}`;
    }
    try {
        const response = await fetch(url,
            {
                headers
            }
        );
        if (!response.ok) {
            return handleError(response);
        }
        const json = await response.json();
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function saveNewsAsync(url, dataToPost, token) {
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(dataToPost)
            }
        );
        if (!response.ok) {
            return handleError(response);
        }
        const json = await response.json();
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function authenticateUser(userName, password) {
    const credentials = { username: userName, password };
    try {
        const response = await fetch('http://localhost:3001/auth/v1',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            }
        );
        if (!response.ok) {
            return handleError(response);
        }
        const json = await response.json();
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error);
    }
}

export { authenticateUser, fetchNewsAsync, saveNewsAsync, handleError, apiKey };

