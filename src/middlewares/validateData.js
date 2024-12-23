export function validateData(schema){
    return async function(req, res, next){
        try{
            
            schema.parse(req.body);
            next()
        }
        catch(error){
            return res.status(400)
                .json({
                    errors:error.errors
                })
        }
    }
}