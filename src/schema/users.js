import mongoose from 'mongoose';

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
      ]
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
  // Set a default avatar using the RoboHash service,
  // which generates a unique image based on the username
  this.avatar = `https://robohash.org/${user.username}`;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
