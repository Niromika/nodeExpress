function logger(req) {
    console.log(new Date, req.method, req.url, req.connection.remoteAdsress);
}

module.exports = logger;