const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const {logger,validateUserId,validateUser,validatePost} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  
  Users.get(req.body)
   .then(users =>{
    res.status(200).json(users)
    logger()
   })
   .catch(error =>{
    console.log(error)
    res.status(500).json({message: 'Error retrieving the users'})
   })
});

router.get('/:id',validateUserId,(req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id   
   if(validateUserId(req,res)){
    res.status(200).json(req.user)
    logger()
   }
   
})


router.post('/',logger, validateUser,(req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  
  if(validateUser(req,res)){
    Users.insert(req.body)
    res.status(201).json(req.body);
  }  

});

router.put('/:id',logger,validateUserId,validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  validateUserId(req,res)
  .then(()=>{
    validateUser(req,res)
    .then(()=>{
      Users.update(req.params.id,req.body)
      .then(user =>{
       res.status(200).json(user)
    })
    .catch(error =>{
      console.log(error)
      res.status(500).json({message: 'Error updating the user'})
    })

    })
  })
  
});

router.delete('/:id',(req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
       
  if(validateUserId(req,res)){
    Users.remove(req.params.id)
    .then(user=>{
      res.status(200).json(user)
      logger()
    })       
    
   }  
  
});

router.get('/:id/posts',logger,validateUserId ,(req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  validateUserId(req,res)
  .then(()=>{
    Posts.getUserPosts(req.params.id)
  .then(posts=>{
    res.status(200).json(posts)
  })

  })
  

});

router.post('/:id/posts',logger,validateUserId,validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  validateUserId(req,res)
  .then(()=>{
    validatePost(req,res)
    .then(()=>{
      const postInfo={...req.body, user_id:req.params.id}

      Posts.insert(postInfo)
      .then(post =>{
        res.status(201).json(post)
      })
      .catch(error =>{
        console.log(error)
        res.status(500).json({message: `Error adding the post ${error.message}`})
      })
   
    })

  })
  
 

});



// do not forget to export the router
module.exports = router
