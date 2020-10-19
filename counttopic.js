import fetch from "node-fetch";

async function countTopicOccurrences(topic) {
    try {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=${topic}`);
        const body = await response.json();
        const text = body?.parse?.text['*'];

        if (text) {
            const pattern = new RegExp(`${topic}`, 'gmi');
            const count = text.split(pattern).length - 1;
            console.log(`The topic [${topic}] appeared ${count} times in the article.`);
        }
    } catch (error) {
        console.log(error);
    }
}

const topic = process.argv[2];

if (topic) {
    countTopicOccurrences(topic);
} else {
    console.log("Can't do much if you don't give me a topic, chief.");
}
