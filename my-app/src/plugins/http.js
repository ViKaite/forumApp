const host = "http://localhost:4000/"

const http = {
    get: async (url, data) => {
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include"
        }

        const res = await fetch(host + url, options)
        return await res.json()
    },
    post: async (data, url) => {
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data)
        }

        const res = await fetch(host + url, options)
        return await res.json()
    },

}

export default http