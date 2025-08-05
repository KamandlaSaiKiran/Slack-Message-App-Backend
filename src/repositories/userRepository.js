// Import the Mongoose User model
import User from '../schema/users.js';

// Import a generic CRUD repository to reuse common DB operations
import crudRepository from './crudRepository.js';

// Create a user-specific repository by extending the generic CRUD repo
const userRepository = {
  // Spread the base CRUD operations (e.g., create, update, delete, getById)
  ...crudRepository(User),

  // Custom method to find a user by email
  getByEmail: async function (email) {
    const user = await User.findOne({ email }); // Find a user document where the email matches
    return user; // Return the found user or null if not found
  },

  // Custom method to find a user by username
  getByUsername: async function (username) {
    const user = await User.findOne({ username }).select('-password'); //exlude password and Find a user document where the username matches
    return user; // Return the found user or null if not found
  }
};

// Export the repository to be used in services or controllers
export default userRepository;
