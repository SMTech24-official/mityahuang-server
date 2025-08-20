import prisma from "../../lib/utils/prisma.utils";

//  retrieve user with password
const getUserByIdWitPass = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    omit: {
      password: true,
    },
  });
};

// change user password
const updateUserPasswordById = async (payload: {
  id: string;
  password: string;
}) => {
  return await prisma.user.update({
    where: { id: payload.id },
    data: { password: payload.password },
  });
};

// verify email
const verifyEmail = async (email: string) => {
  return await prisma.user.update({
    where: { email },
    data: { isVerified: true },
    omit: {
      password: true,
    },
  });
};

// const getOtpByEmail = async (email: string) => {
//   return await prisma.oTP.findUnique({
//     where: {
//       email,
//     },
//   });
// };

export const AuthRepository = {
  updateUserPasswordById,
  verifyEmail,
  getUserByIdWitPass,
  //getOtpByEmail,
};
