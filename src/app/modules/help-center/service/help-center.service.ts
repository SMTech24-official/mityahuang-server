import { HelpCenter } from "@prisma/client";
import { helpCenterInfoRepository } from "../repository/help-center.repository";

// ** get help center info
const getHelpCenterInfo = async () => {
  let helpCenterInfo = await helpCenterInfoRepository.getHelpCenterInfo();

  if (!helpCenterInfo) {
    const newInfo = await helpCenterInfoRepository.createHelpCenterInfo({
      email: "example@gmail.com",
      whatsAppNumber: "015487457...",
    });

    helpCenterInfo = newInfo;
  }

  return helpCenterInfo;
};

const updateHelpCenterInfo = async (payload: HelpCenter) => {
  let helpCenterInfo = await helpCenterInfoRepository.getHelpCenterInfo();

  if (!helpCenterInfo) {
    const newInfo = await helpCenterInfoRepository.createHelpCenterInfo({
      email: "example@gmail.com",
      whatsAppNumber: "015487457...",
    });

    helpCenterInfo = newInfo;
  }

  return await helpCenterInfoRepository.updateHelpCenterInfo(
    helpCenterInfo.id,
    payload,
  );
};

export const helpCenterInfoService = {
  getHelpCenterInfo,
  updateHelpCenterInfo,
};
