module.exports=(requiredRole)=>{
    return (req, res, next)=>{
        const role = req.headers['x-role'];
        if(!role || role !==requiredRole){
            return res.status(403).json({
                message: 'Forbidden '
            })
        }
        next();
    }

}