const { verifyToken } = require("../helpers/jwt.helper");
const { Videos } = require("../models");

class ContentController {
  static async getCategoryContentById(req, res, next) {
    try {
      const { access_token } = req.headers;
      const checkUserByToken = verifyToken(access_token);
      if (!checkUserByToken) {
        throw {
          status: 400,
          message: "Token does not exist",
        };
      }
      const { id } = req.params;
      const findContentVideoDB = await Videos.findOne({
        where: { id },
      });

      const result = {
        meta: {
          status: "Success",
          code: 200,
          msg: "Successfully Get Content Category By Name",
          data: new Date(),
        },
        data: findContentVideoDB,
        error: null,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getAllContent(req, res, next) {
    try {
      const { access_token } = req.headers;
      const checkUserByToken = verifyToken(access_token);
      if (!checkUserByToken) {
        throw {
          status: 400,
          message: "Token does not exist",
        };
      }

      const findAllContentVideoDB = await Videos.findAll();

      const result = {
        meta: {
          status: "Success",
          code: 200,
          msg: "Successfully Get Contents",
          data: new Date(),
        },
        data: findAllContentVideoDB,
        error: null,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async addContent(req, res, next) {
    try {
      const { access_token } = req.headers;
      const checkUserByToken = verifyToken(access_token);
      if (!checkUserByToken) {
        throw {
          status: 400,
          message: "Token does not exist",
        };
      }

      const newDataVideo = await Videos.create(req.body);

      const result = {
        meta: {
          status: "Success",
          code: 200,
          msg: "Successfully Get Contents",
          data: new Date(),
        },
        data: newDataVideo,
        error: null,
      };

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ContentController;