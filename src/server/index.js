const Koa = require('koa');

const app = new Koa();
const PORT = 1337;

app.use(async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'Welcome to WillAddressBook'
  };
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
