const webApiUrl = "http://localhost:5000/api/v1/library";

class LibraryService {
    get = async (collectionName) => {
        const options = {
            method: "GET",
        };
        const url = webApiUrl + `/${collectionName}/`;
        const response = await fetch(url, options);
        const responseJson = await response.json();
        return responseJson;
    };
    post = async (collectionName, data) => {
        const options = {
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
            method: "POST",
        };
        const url = webApiUrl + `/${collectionName}/add`;
        const response = await fetch(url, options);
        const responseJson = await response.json();
        return responseJson;
    };
    put = async (collectionName, data, id) => {
        const options = {
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
            method: "PUT",
        };
        const url = webApiUrl + `/${collectionName}/${id}`;
        const response = await fetch(url, options);
        const responseJson = await response.json();
        return responseJson;
    };
    delete = async (collectionName, id) => {
        const options = {
            method: "DELETE",
        };
        const url = webApiUrl + `/${collectionName}/${id}`;
        const response = await fetch(url, options);
        const responseJson = await response.json();
        return responseJson;
    };
}

export default LibraryService;
