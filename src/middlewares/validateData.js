export function validateData(schema, throwError=true){
    return async function(req, res, next){
        try{
            
            schema.parse(req.body);
            next()
        }
        catch(error){
            if(throwError)
                return res.status(400)
                    .json({
                        errors:error.errors
                    })
            
            next()
        }
    }
}