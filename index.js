import express from 'express';
import gitrendering from './api/request.js'


const app = express();
const port = 3000;

app.get('/', gitrendering);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

export default app;