require('dotenv').config(); // Load environment variables
const express = require('express');
const routes = require('./src/routes');
const logger = require('./src/services/loggerService');
const { swaggerUi, swaggerSpec } = require('./src/loader/swagger'); // Add this line

const app = express();
const PORT = process.env.PORT || 3000;

// Logging middleware
app.use((req, res, next) => {
  const { method, url, query, body } = req;

  logger.info(`Received request: ${method} ${url}`);
  logger.debug(`Query parameters: ${JSON.stringify(query)}`);
  logger.debug(`Request body: ${JSON.stringify(body)}`);

  res.on('finish', () => {
    logger.info(`Sent response: ${method} ${url} - Status ${res.statusCode}`);
  });

  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', routes);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
