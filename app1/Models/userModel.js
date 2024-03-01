import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema([
    {
        name:{
            type:String,
            required: true
        },
        email:{
            type: String,
            unique : true,  
            required: true,
            match:[/.+\@.+\../,"Please enter a valid Email"]
        },
        password:{
            type: String,
            validate:{
            validator: function(value){
                return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value)
            },
            message:"Password should be between 8-12 charachetrs and have a special character"
            },
            select:false,
        }
    }
])
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

UserSchema.methods.getJWT = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRE,
    });
  };
  UserSchema.methods.isValidPassword = function(givenPassword){
    return bcrypt.compare(givenPassword, this.password);
  };

export default mongoose.model("User",UserSchema);