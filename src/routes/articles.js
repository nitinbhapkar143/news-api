const express = require('express');
const newsService = require('../services/newsService');

const router = express.Router();

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Fetch N news articles
 *     parameters:
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         description: Language of articles (e.g., en)
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Country of articles (e.g., us)
 *     responses:
 *       200:
 *         description: List of news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get('/', newsService.fetchArticles);
/**
 * @swagger
 * /articles/title/{title}:
 *   get:
 *     summary: Find news article by title
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Title of the article
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *         description: Language of articles (e.g., en)
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Country of articles (e.g., us)
 *     responses:
 *       200:
 *         description: News article with the specified title
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */
router.get('/title/:title', newsService.findArticleByTitle);


module.exports = router;
