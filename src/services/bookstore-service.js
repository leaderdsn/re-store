export default class BookstoreService {

    data = [{
            id: 1,
            title: 'Production-Ready Microservices',
            author: 'Susan J. Fowler',
            price: 32,
            coverImage: "https://kbimages1-a.akamaihd.net/002facff-68a0-414a-8491-450fb35af516/1200/1200/False/production-ready-microservices.jpg"
        },
        {
            id: 2,
            title: 'Release It!',
            author: 'Michael T. Nygard',
            price: 24,
            coverImage: "http://www.konkurentov.net/_files/1/0/1013148793.jpg"
        },
    ];

    getBooks() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.data)
                    // reject(new Error('Something bad happened'))
            }, 700)
        })
    }
}