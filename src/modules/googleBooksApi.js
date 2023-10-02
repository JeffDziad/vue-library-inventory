class BookAPI {
    constructor() {
        this.searchKeywords = ['intitle', 'inauthor', 'inpublisher', 'subject', 'isbn', 'lccn', 'oclc'];
        this.baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
        this.apiKey = 'AIzaSyBURWPZioHkDBIGqCjjcWxs-v4P1g_QoU8';
    }
    get keywords() {
        return this.searchKeywords;
    }
    constructURL(queryType, query) {
        return `${this.baseURL}${queryType}:${query}&key=${this.apiKey}`;
    }
    async search(keyword, query) {
        if(query) {
            try {
                let url = this.constructURL(keyword, query);
                const res = await fetch(url);
                const books = await res.json();
                return JSON.parse(JSON.stringify({...books}));
            } catch (e)
            {
                console.error("[GoogleBooksAPI] " + e);
            }
        } else {
            return {error: "No books found for '" + query + "' under " + keyword + "..."};
        }
    }
}

export default BookAPI;