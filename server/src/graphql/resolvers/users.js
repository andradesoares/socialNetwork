const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validator');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      userName: user.userName,
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
};

module.exports = {
  Mutation: {
    async login(parentValue, args, context, info) {
      const { userName, password } = args;

      const { valid, errors } = validateLoginInput(userName, password);

      if (!valid) {
        throw new UserInputError('Errors', {
          errors,
        });
      }

      const user = await User.findOne({ userName });

      if (!user) {
        throw new UserInputError('User not found', {
          errors: {
            userName: 'User not found',
          },
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UserInputError('Wrong credentials', {
          errors: {
            userName: 'Wrong credentials',
          },
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(parentValue, args, context, info) {
      const { input } = args;
      const { userName, email, password, confirmPassword } = input;

      const { valid, errors } = validateRegisterInput(userName, email, password, confirmPassword);

      if (!valid) {
        throw new UserInputError('Errors', {
          errors,
        });
      }

      const user = await User.findOne({ userName });

      if (user) {
        throw new UserInputError('Username is already in use', {
          errors: {
            userName: 'Username is already in use',
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        userName,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
