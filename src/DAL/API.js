export const booksAPI = {
    async getBooks(book, category, apiKey, index, type) {
        let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}${category === "All" ? "" : `+subject:${category}`}&startIndex=${30 * index}&orderBy=${type}&key=${apiKey}&maxResults=30`);
        if (response.ok) {
            let result = await response.json();
            return result;
        } else {
            console.log("Ошибка HTTP: " + response.status);
        }
    },

    async getBook(id, apiKey) {
        let response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`);
        if (response.ok) {
            let result = await response.json();
            return result;
        } else {
            return response.status; //"Ошибка HTTP: " + response.status
        }
    },

    async getMoreBooks(book, category, apiKey, index, type) {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}${category === "All" ? "" : `+subject:${category}`}&startIndex=${30 * index}&orderBy=${type}&key=${apiKey}&maxResults=30`);
    if (response.ok) {
        let result = await response.json();
        return result;
    } else {
        console.log("Ошибка HTTP: " + response.status);
    }
},
}