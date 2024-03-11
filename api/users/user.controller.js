/*const {create} = require("./user.service");
const {genSaltSync,hashSync} = require("bcrypt");


module.exports= {
    createUser:(req,res)=>{
     const body=req.body;
     const salt= genSaltSync(10);
     console.log(body.password);
     body.password= hashSync(body.password,salt);
     console.log(body.password);
     create (body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    sucess:0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json(
                {
                    sucess:1,
                    data:results
                }
            )
     });
    }
}
*/
