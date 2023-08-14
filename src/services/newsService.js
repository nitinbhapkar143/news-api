const axios = require('axios');
const cacheService = require('./cacheService');
const logger = require('./loggerService');

// Fetch N news articles
async function fetchArticles(req, res) {
  try {
    const { count = 10, lang = "en", country = "in" } = req.query;
    const { data } = await axios.get(`${process.env.GNEWS_HOST}/api/v4/top-headlines`, {
      params: {
        token: process.env.GNEWS_API_KEY,
        q: '', 
        max: count,
        lang,
        country,
      },
    });
    logger.info(`Fetched ${data.articles.length} articles.`);

    res.json(data.articles);
  } catch (error) {
    logger.error(`An error occurred while fetching articles: ${error.message}`);
    res.status(500).json({ error: 'An error occurred while fetching articles.' });
  }
}
// Find news article by title
async function findArticleByTitle(req, res) {
  try {
    const { title } = req.params;
    const { lang, country } = req.query;
    const cachedArticle = cacheService.get(`article_${title}_${lang}_${country}`);
    if (cachedArticle) {
      logger.info(`Fetched ${cachedArticle.length} articles from cache.`);
      return res.json(cachedArticle);
    }

    const { data } = await axios.get(`${process.env.GNEWS_HOST}/api/v4/search`, {
      params: {
        token: process.env.GNEWS_API_KEY,
        q: title,
        lang,
        country,
        in : "title"
      },
    });

    if (data.articles.length > 0) {
      logger.info(`Fetched ${data.articles.length} articles from source.`);
      cacheService.set(`article_${title}_${lang}_${country}`, data.articles);
      res.json(data.articles);
    } else {
      res.status(404).json({ error: 'Article not found.' });
    }
  } catch (error) {
    logger.error(`An error occurred while fetching articles: ${error.message}`);
    res.status(500).json({ error: 'An error occurred while fetching the article.' });
  }
}

module.exports = {
  fetchArticles,
  findArticleByTitle,
};
