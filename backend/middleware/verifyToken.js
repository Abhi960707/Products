const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{

    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({
            message:'No Token'
        })
    }

    try{

        const decoded = jwt.verify(
            token.replace('Bearer ',''),
            process.env.JWT_SECRET
        )

        req.user = decoded

        next()

    }catch(error){

        return res.status(401).json({
            message:'Invalid Token'
        })

    }
}

module.exports = verifyToken