/*const pool = require ("../../config/db");

module.exports ={
     create: (data,callback) =>{
        pool.query(
            "INSERT into users (firstname,lastname,email,password) values(?,?,?,?)",   //first param of query
            [data.firstname,data.lastname, data.email,data.password],   //2nd param of query
            (error , results ,fields) =>{    //3rd pram of query
                    if(error) { return callback(error);}
                    return callback(null,results);
            }
        );
     }
};
*/
