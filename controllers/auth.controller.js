const User = require("../models/user.model")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    try {
    // accept payloads from client
    // ways to use req to get data from client: req.body, req.query, req.params

    const { name, email, password, phoneNumber, dateOfBirth } = req.body

    // create validation layer 
    if (!name || !email || !password || !phoneNumber) {
        return res.status(400).json({
            message: "all the required fields needed"
        })
    }

    // check if user exists  
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(400).json({
            message: "user already exists"
        })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user with db
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        dateOfBirth
    });

    // return response to client
    return res.status(201).json({
        status: true,
        message: "User registered successfully",
        user: user
    })
} catch(error) {
    return res.status(500).json({
        message: "Internal server error",
        error: error.message
    });
}b
}


const login = async(req, res) => {
    try { 
    // login with email and password
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"all the required fields needed"
        });
    }

    // find user by email
    const user = await User.findOne({email});
    
    if(!user){
        return res.status(404).json({
            message:"user not found"
        });
    }
  
    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({
            message:"invalid credentials"
        });
    }

    // send response to client
    return res.status(200).json({
        message:"User logged in successfully",
        user:user
    });
} catch(error) {
    return res.status(500).json({
        message:"Internal server error",
        error: error.message
    });
}
}


const fetchUserById = async (req,res) => {
    try {
    const { id } = req.params;
    const userExists = await User.findById(id);
    if(!userExists) {
        return res.status(404).json({
            message:"user not found"
        });
    }

    return res.status(200).json({
        message:"User fetched successfully",
        user:userExists
    })
} catch(error) {
    return res.status(500).json({
        message:"Internal server error",
        error: error.message
    });
}
}   

const deleteUserById = async (req,res) => {
    try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if(!user){
        return res.status(404).json({
            message:"user not found"
        });
    }
    return res.status(200).json({
        message:"User deleted successfully",
        user:user
    });
} catch(error) {
    return res.status(500).json({
        message:"Internal server error",
        error: error.message
    });
}
}

const updateUserById = async (req,res) => {
    try {
    const { id } = req.params;
    const { name, email, phoneNumber, dateOfBirth } = req.body;



    const userExists = await User.findByIdAndUpdate(
        id,
        { name, email, phoneNumber, dateOfBirth },
        { new: true }
    );

    if(!userExists) {
        return res.status(404).json({
            message:"user not found"
        });
    }
    return res.status(200).json({
        message:"User updated successfully",
        user:userExists
    });
} catch(error) {
    return res.status(500).json({
        message:"Internal server error",
        error: error.message
    });
}
}

module.exports = {
    register,
    login,
    fetchUserById,
    deleteUserById,
    updateUserById
} 