'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = (db) => {
  return db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    username: {
      type: 'string',
      length: 100,
      unique: true,
      notNull: true
    },
    first_name: {
      type: 'string',
      length: 100,
      notNull: true
    },
    last_name: {
      type: 'string',
      length: 100,
      notNull: true
    },
    password_hash: {
      type: 'string',
      length: 255,
      notNull: true
    },
    email: {
      type: 'string',
      length: 255,
      unique: true,
      notNull: true
    },
    money: {
      type: 'int',
      notNull: true,
      defaultValue: 100
    },
    profile_img: {
      type: 'string',
      length: 255
    },
    user_type: {
      type: 'string',
      length: 100,
      notNull: true,
      defaultValue: 'customer'
    }
  });
};

exports.down = (db) => {
  return db.dropTable('users');
};


exports._meta = {
  "version": 1
};
