import validator from "validator";
import { Prisma, PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (emailOrUsername: string, password: string) => {
  let validationPassword: boolean = !validator.isEmpty(password);
  let validationEmail: boolean =
    validator.isEmail(emailOrUsername) || !validator.isEmpty(emailOrUsername);

  if (validationEmail && validationPassword) {
    try {
      let foundUser: User | null;
      if (validator.isEmail(emailOrUsername)) {
        foundUser = await prisma.user.findUnique({
          where: {
            email: emailOrUsername,
          },
        });
      } else {
        foundUser = await prisma.user.findUnique({
          where: {
            id: 2,
          },
        });
      }

      if (foundUser) {
        let comparePassword = await bcrypt.compare(
          password,
          foundUser.password!
        );

        if (comparePassword) {
          const token: string = jwt.sign(foundUser, "secreto", {
            expiresIn: "1y",
          });

          return {
            success: true,
            token,
            message: "",
          };
        } else {
          return {
            success: false,
            token: "",
            message: "Usuario o contraseña incorrectos.",
          };
        }
      } else {
        return {
          success: false,
          token: "",
          message: "Usuario o contraseña incorrectos.",
        };
      }
    } catch (error) {
      throw new Error("error");
    }
  } else {
    return {
      success: false,
      token: "",
      message: "Usuario o contraseña incorrectos.",
    };
  }
};

export const createUser = async (userInput: Prisma.UserCreateInput) => {
  const salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash(userInput.password!, salt);
  try {
    const userCreated = await prisma.user.create({
      data: {
        ...userInput,
        password,
        username: userInput.username,
        email: userInput.email.toLowerCase(),
      },
    });

    return userCreated;
  } catch (error: any) {
    throw new Error(
      "Ocurrió un error inesperado al validar el usuario, por favor, revise email y contraseña."
    );
  }
};
