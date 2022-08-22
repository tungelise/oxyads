export const getHostname = (url) => {
    let urlParts = /^(?:\w+\:\/\/)?([^\/]+)([^\?]*)\??(.*)$/.exec(url);
    return urlParts[1]; // www.example.com
    // path = urlParts[2];
};