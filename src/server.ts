import { createServer } from 'http';
import app from './main';

createServer((req, res) => {
  const { html } = app.render({ url: req.url });

  res.write(`
    <!DOCTYPE html>
    <div id="app">${html}</div>
    <script src="/dist/bundle.js"></script>
  `);

  res.end();
}).listen(3000);