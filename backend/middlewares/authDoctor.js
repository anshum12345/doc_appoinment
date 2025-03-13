import jwt from 'jsonwebtoken'
 
 // doc authentication middleware
 const authDoctor = async (req, res, next) => {
 
   try {
 
     const { doken } = req.headers
     if (!doken) {
       return res.json({ success: false, message: 'Not Authorized Login Again' })
     }
 
     const token_decode = jwt.verify(doken, process.env.JWT_SECRET)
     req.body.userId = token_decode.id
 
     next()
 
   } catch (error) {
     console.log(error)
     res.json({ success: false, message: error.message })
   }
 
 }
 
 export default authDoctor