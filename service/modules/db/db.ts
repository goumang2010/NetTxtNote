
import * as mongoose      from 'mongoose';
import * as autoIncrement from 'mongoose-auto-increment';

mongoose.connect(`mongodb://${global.$g.config.database.connection}`);

let
db = mongoose.connection;
autoIncrement.initialize(db);

db.on('error', function(err){
    console.log(`Connect to mongodb error: ${err}`);
});

db.once('open', function(){
    console.log(`Connect to mongodb successful.`);
});

export {
    db,
    autoIncrement
};
