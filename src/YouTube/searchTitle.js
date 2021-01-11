const axios = require('axios');
const env = require('../../env.json');

module.exports = {
    async searchByTitle(title) {
        const params = {
            params: {
                part: "snippet",
                q: title,
                key: env.GOOGLE_API_KEY,
                maxResults: "1",
                type: "video"
            }
        }
        const basic = 'https://www.googleapis.com/youtube/v3/search';
        const url = 'https://www.youtube.com/watch?v=';
        const result = await axios.get(basic, params)
        return url + result.data.items[0].id.videoId;
    }
}