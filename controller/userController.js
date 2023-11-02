const User = require('../models/userModels')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')


const generateToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})

}

const signup = async (req,res) => {
    const {
        image,
        name,
        accountType,
        email,
        contactNumber,
        bio,
        linkedin,
        github,
        twitter,
        portfolio,
        password,
        company ,
    }= req.body;

    try{
        const emailExist =await User.findOne({email:email});
        if(emailExist)
        {
            return res.status(400).json({error:"Email already exist."})
        }
        if(!validator.isEmail(email))
        {
        throw Error("Email is not valid")
         }
       const salt = await bcryptjs.genSalt(10);
       const hash = await bcryptjs.hash(password,salt);

       const user = await User.create({
        image,
        name,
        accountType,
        email,
        contactNumber,
        bio,
        linkedin,
        github,
        twitter,
        portfolio,
        password:hash,
        company

       });

       const token = generateToken(user._id);
       return res.status(200).json({email,token,id:user._id })
    }
    catch(e){
        res.status(400).json({error:e});
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;
  
    const emptyFields = [];
  
    if (!email) {
      emptyFields.push('email');
    }
    if (!password) {
      emptyFields.push('password');
    }
  
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'All fields are required!', emptyFields });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        emptyFields.push('email');
        return res.status(400).json({ error: 'Incorrect email!', emptyFields });
      }
  
      const match = await bcryptjs.compare(password, user.password);
  
      if (!match) {
        emptyFields.push('password');
        return res
          .status(400)
          .json({ error: 'Incorrect password!', emptyFields });
      }
  
      const token = generateToken(user._id);
  
      return res.status(200).json({ email, token, id: user._id });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

module.exports = {signup,login}