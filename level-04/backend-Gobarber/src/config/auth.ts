export default {
  jwt:{
    secret: process.env.APP_SECRET || 'default',
    // secret: process.env.APP_SECRET,
    expiresIn: '10d',
  },
};
