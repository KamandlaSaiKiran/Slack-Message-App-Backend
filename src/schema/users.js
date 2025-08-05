import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: ['true', 'Email is requried'],
      unique: ['true', 'Email already exists'],
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ],
      minLenght: [3, 'Username must be atleast three characters']
    },
    password: {
      type: String,
      required: ['true', 'Password is requried']
    },
    username: {
      type: String,
      required: ['true', 'username is requried'],
      match: [
        /^[a-zA-Z0-9]+$/,
        'Username must contain only letters and numbers'
      ]
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

/*
The pre('save') hook in Mongoose is called right before a document is saved to the database
using .save() — only for operations that trigger the save() method.
*/
userSchema.pre('save', function saveUser(next) {
  // `this` refers to the user document about to be saved
  const user = this;
  // Generate a cryptographic salt using bcrypt with 9 salt rounds
  // Salt rounds determine how many times the hashing process is applied
  // Higher rounds = more security but slower performance
  const SALT = bcrypt.genSaltSync(9);

  // Hash the user's plain-text password with the generated salt
  // Even if two users have the same password, the resulting hash will be different
  // because the salt is unique for each password
  const hashedPassword = bcrypt.hashSync(user.password, SALT);

  // Replace the plain-text password in the user object with the hashed version
  // This ensures that the actual password is never stored in plain text
  // Only the hashed version will be saved to the database for security
  user.password = hashedPassword;

  // Set a default avatar using the RoboHash service,
  // which generates a unique image based on the username
  this.avatar = `https://robohash.org/${user.username}`;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
