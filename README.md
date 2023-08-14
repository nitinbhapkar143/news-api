
# News API

News API 


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GNEWS_API_KEY`



## Run Locally

Clone the project

```bash
  git clone https://github.com/nitinbhapkar143/news-api.git
```

Go to the project directory

```bash
  cd news-api
```

Install dependencies

```bash
  npm install
```
Copy example .env file

```bash
  cp example.env .env
```

Start the server

```bash
  npm start
```

Run test

```bash
  npm test
```


## API Reference

#### Get Articles

```http
  GET /api/articles
```

| Parameter | Type     | Place      |  Description                |
| :-------- | :------- | :--------- | :-------------------------- |
| `count`   | `number` |  Query     | No of news                  |
| `lang`    | `string` |  Query     | Language                    |
| `country` | `string` |  Query     | Country                     |

#### Seach Articles by title

```http
  GET /api/articles/title/${title}
```

| Parameter | Type     | Place      |  Description                |
| :-------- | :------- | :--------- | :-------------------------- |
| `title`   | `string` |  Path      | **Required**.News title.    |
| `count`   | `number` |  Query     | No of news                  |
| `lang`    | `string` |  Query     | Language                    |
| `country` | `string` |  Query     | Country                     |



## Documentation

[Swagger](http://localhost:3000/api-docs)
