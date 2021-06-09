const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.method,req.url)
  console.timeStamp()
}

const validateUserId= async (req, res, next)=> {
  // DO YOUR MAGIC
  try{
    const {id} = req.params
    const user = await Users.getById(id)
    if(!user){
      res.status(404).json(`No user with the id ${id}`)
    }
    else{
      req.user = user
      next()
    }
  }catch(error){
    res.status(500).json({message: `Error ${error}`})
  }
}

const validateUser = async (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.name){
    res.status(400).json('Missing required name field')
  }
  else{
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text){
    res.status(400).json('Missing required text field')
  }
  else{
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