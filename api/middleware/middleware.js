const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp= new Date().toLocaleString();
  const method = req.method
  const url  = req.originalUrl
  console.log(`[${timeStamp}] ${method} to ${url}`)
  next()
}

const validateUserId= async (req, res, next)=> {
  // DO YOUR MAGIC
  try{
    const user = await Users.getById(req.params.id)
    if(!user){
      next({status:404, message:'User not found'})
    }
    else{
      req.user = user
      next()
    }

  }catch(error){
    res.status(500).json("problem retrieving user")

  }
}

const validateUser =  (req, res, next) => {
  // DO YOUR MAGIC
  const {name} = req.body
  if(!name || !name.trim()){
    next({status:400, message:'missing required name field'})
  }
  else{
    req.name = name.trim()
    next()

  }
  
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const {text} = req.body
  if(!text || !text.trim()){
    next({status:400, message:'missing required text field'})
  }
  else{
    req.text = text.trim()
    next()

  }

}

// do not forget to expose these functions to other modules
module.exports={
  logger,
  validateUserId,
  validateUser,
  validatePost
}