const BASE_URL = 'https://notes-api.dicoding.dev/v2';
class NotesApi {
    static async getNotes() {
        return fetch(`${BASE_URL}/notes`)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error('Something went wrong'))
                }
            })
            .then((responseJson) => {
                const { data } = responseJson;
                return data;
            })
    }

    static async addNotes(title, body) {
        return fetch(`${BASE_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, body})
        })
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                return Promise.reject(new Error('Something went wrong'))
            }
        })
        .then((responseJson) => {
            const { data } = responseJson;
            return data;
        })
    }
    static async deleteNotes(note_id) {
        return fetch(`${BASE_URL}/notes/${note_id}`, {
            method: 'DELETE'
            })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error('Something went wrong'))
                }
            })
            .then((responseJson) => {
                return responseJson.message
            })
    }
}