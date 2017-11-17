module.exports = (db_config) => 
{

  db_config.pool = db_config.pool || { max: 100,  min: 3, acquire: 30000,  idle: 10000  };

  Object.assign( global, 
    { 
        sqldb : new Sequelize( db_config.database, db_config.user, db_config.password, db_config.extras ) 
    });

  //@ Check if the database connection was successful
  sqldb
  .authenticate()
  .then(() => 
  {
    log(`Successfully established a connection to the database server.`.succ);
  })
  .catch( err => 
  {
    throw new Error(`Failed to establish a remote database connection.\n${err.message}`);   
  });

};
