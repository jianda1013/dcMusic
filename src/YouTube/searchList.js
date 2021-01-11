const axios = require('axios');
const env = require('../../env.json');

module.exports = {
    async searchByList(id, pageToken = null) {
        let result = [];
        const params = {
            params: {
                part: "snippet",
                playlistId: id,
                key: env.GOOGLE_API_KEY,
                pageToken: pageToken,
                maxResults: "50"
            }
        }
        const basic = 'https://www.googleapis.com/youtube/v3/playlistItems';
        const url = 'https://www.youtube.com/watch?v=';
        await axios.get(basic, params)
            .then(async res => {
                for (let i = 0; i < res.data.items.length; i++) {
                    result.push(url + res.data.items[i].snippet.resourceId.videoId)
                }
                if (res.data.nextPageToken) {
                    Array.prototype.push.apply(result, await this.searchByList(id, res.data.nextPageToken));
                }
            })
            .catch(err => { console.log(err); })
        return result;
    }
}