import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';

export async function serveBuild(root = resolve('dist')) {
  await stat(resolve(root, 'index.html')); // Missing builds fail rather than collecting false-positive tests.
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg' };
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      let file = resolve(root, '.' + pathname);
      if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
      const bytes = await readFile(file);
      response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' }).end(bytes);
    } catch { response.writeHead(404).end('Not found'); }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())) };
}
