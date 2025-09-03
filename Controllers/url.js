const {nanoid} = require("nanoid");
const URL = require("../Models/url")

async function handleGenerateNewUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is Required!" });
    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitade: [],
    });

    return res.json({ id: shortId });

}

async function handleAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        TotalClicks: result.visitade.length, 
        analytics: result.visitade,
    });
}

module.exports = {
    handleGenerateNewUrl,
    handleAnalytics,
}