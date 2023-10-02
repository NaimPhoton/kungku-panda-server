const { compare, hashPassword } = require("../helpers/bcrypt.helper");
const { signToken } = require("../helpers/jwt.helper");

const { Users } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const newUser = await Users.create(
        {
          firstName,
          lastName,
          email,
          password: hashPassword(password),
        },
        { returning: true }
      );
      const result = {
        meta: {
          status: "Success",
          code: 201,
          msg: "Successfully Create New User",
          data: new Date(),
        },
        data: {
          id: newUser.id,
          fullName: `${newUser.firstName} ${newUser.lastName}`,
          email: newUser.email,
          regisBy: newUser.regisBy,
          membershipType: newUser.membershipType,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
          deletedAt: newUser.deletedAt,
        },
        error: null,
      };
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const payload = {
        email,
        password,
      };
      const findUser = await Users.findOne({ where: { email: payload.email } });
      if (!findUser) {
        throw { status: 401, message: "Invalid email/password" };
      } else if (!compare(payload.password, findUser.password)) {
        throw { status: 401, message: "Invalid email/password" };
      } else {
        const accessToken = signToken({
          id: findUser.id,
          email: findUser.email,
        });

        const result = {
          meta: {
            status: "Success",
            code: 200,
            msg: "Successfully Login",
            data: new Date(),
          },
          data: {
            access_token: accessToken,
            user: {
              id: findUser.id,
              fullName: `${findUser.firstName} ${findUser.lastName}`,
              email: findUser.email,
            },
          },
          error: null,
        };

        res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;