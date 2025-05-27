// eslint-disable-next-line no-undef
db = db.getSiblingDB('training-node-mongodb');

// eslint-disable-next-line no-undef
db.createUser({
  user: 'app-user',
  pwd: 'app-passw0rd',
  roles: [
    {
      role: 'readWrite',
      db: 'training-node-mongodb'
    }
  ]
}); 