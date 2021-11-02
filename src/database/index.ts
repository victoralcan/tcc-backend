import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('Connected to Database'))
  .catch(() => console.log('Error Connecting to Database'));
