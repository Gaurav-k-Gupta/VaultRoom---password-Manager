const UserModel = require('../Models/User_schema.jsx');
const UserDataModel = require('../Models/user_data.jsx');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req,res)=>{
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });

        userModel.password = await bcrypt.hash(password,8);
        console.log(email);
        await userModel.save();

        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const login = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403)
                .json({ message: 'Authentication failed! - Email not found', success: false });
        }
        const isPasswordEqual = await bcrypt.compare(password,user.password);
        if(!isPasswordEqual){
            return res.status(403)
                .json({ message: 'Authentication failed! - Incorrect password', success: false });
        }

        const jwToken = jwt.sign(
            {email: user.email , _id : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        )

        res.status(200)
            .json({
                message: "Login successfully",
                success: true,
                jwToken,
                email,
                name : user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const savePassword = async(req,res) =>{
    try{
        const {email , website , password} = req.body;
        
        let user = await UserDataModel.findOne({ email });
        if (!user) {
            // Create a new user if not found
            user = new UserDataModel({ email, credentials: [] });
        }


        const existingCredential = user.credentials.find(
            (cred) => cred.website === website
        );

        if (existingCredential) {  // If the cred already exists
            return res.status(409).json({
                message: 'Credential for this website already exists.',
                success: false
            });
        }



        console.log('DB works')
        user.credentials.push({ website, password });
        // DataModel.password = await bcrypt.hash(password,8);
        console.log(website);
        await user.save();

        res.status(201)
            .json({
                message: "Credential added Successfully",
                success: true
            })
        
    }catch(err){
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}



const getCredentials = async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by email
        const user = await UserDataModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        }

        res.status(200).json({
            message: 'Credentials retrieved successfully.',
            success: true,
            data: user.credentials
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error.',
            success: false
        });
    }
};



const updateCredential = async (req, res) => {
    try {
        const { email, website, newPassword } = req.body;

        // Find the user by email
        const user = await UserDataModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        }

        // Find the credential by website
        const credential = user.credentials.find(
            (cred) => cred.website === website
        );

        if (!credential) {
            return res.status(404).json({
                message : 'website not found!',
                success: false
            });
        }

        credential.password = newPassword;
        await user.save();
        return res.status(200).json({
            message : "Password successfully updated",
            success : true,
            data : credential
        })
    }catch(err){
        return res.status(500).json({
            message : 'Internal server error',
            success : false
        })
    }
}


const deleteCredential = async (req, res) => {
    try {
        const { email, website } = req.body;

        // Find the user by email
        const user = await UserDataModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        }

        // Find the index of the credential by website
        const credentialIndex = user.credentials.findIndex(
            (cred) => cred.website === website
        );

        if (credentialIndex === -1) {
            return res.status(404).json({
                message: 'Website not found!',
                success: false
            });
        }

        // Remove the credential from the user's credentials array
        user.credentials.splice(credentialIndex, 1);
        await user.save();

        return res.status(200).json({
            message: 'Credential successfully deleted',
            success: true
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};







module.exports = {
    signup,
    login,
    savePassword,
    getCredentials,
    updateCredential,
    deleteCredential
}