const Router = require('koa-router');
const queries = require('../db/queries/contacts');

const router = new Router();
const BASE_URL = `/api/v1/contacts`;

module.exports = router;

router.get(BASE_URL, async (ctx) => {
  try {
    if (!ctx.isAuthenticated()){
        ctx.status = 401;
        ctx.body = {
        status: 'Unauthorized',
        message: 'Please log in first'
      };
      return;
    } 
    const contacts = await queries.getAllContacts();
    ctx.body = {
      status: 'success',
      data: contacts
    };
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/:name`, async (ctx) => {
  try {
        if (!ctx.isAuthenticated()){
        ctx.status = 401;
        ctx.body = {
        status: 'Unauthorized',
        message: 'Please log in first'
      };
      return;
    } 
    const contact = await queries.getSingleContact(ctx.params.name.toLowerCase());
    ctx.body = {
      status: 'success',
      data: contact
    };
  } catch (err) {
    console.log(err)
  }
})
router.post(`${BASE_URL}`, async (ctx) => {
  try {
    if (!ctx.isAuthenticated()){
        ctx.status = 401;
        ctx.body = {
        status: 'Unauthorized',
        message: 'Please log in first'
      };
      return;
    } 
    const contact = await queries.addContact(ctx.request.body);
    if (contact.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: contact
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    console.log(err.message);
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.put(`${BASE_URL}/:name`, async (ctx) => {
  try {
    if (!ctx.isAuthenticated()){
        ctx.status = 401;
        ctx.body = {
        status: 'Unauthorized',
        message: 'Please log in first'
      };
      return;
    } 
    const contact = await queries.updateContact(ctx.params.name, ctx.request.body);
    if (contact.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: contact
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That name does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.delete(`${BASE_URL}/:name`, async (ctx) => {
  try {
    if (!ctx.isAuthenticated()){
        ctx.status = 401;
        ctx.body = {
        status: 'Unauthorized',
        message: 'Please log in first'
      };
      return;
    } 
    const contact = await queries.deleteContact(ctx.params.name);
    if (contact.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: contact
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That name does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})
