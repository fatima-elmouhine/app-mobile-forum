import axiosInstance from "../config";
import { Platform } from "react-native";

export const postAvatar = async (id, file) => {
    console.log('file', file)
    console.log('id', id)
  const formData = new FormData();
  formData.append("avatar", {
    uri: file.uri,
    type: "image/jpeg",
    name: `${file.assetId}photo.jpg`,
  });
  formData.append("id", id);
  try {
    const data = await fetch(`${axiosInstance.defaults.baseURL}users/avatar`, {
        method: "POST",
        body: formData,
      });   
      return data;
  } catch (error) {
    // Bug: on doit le faire deux fois dans notre environnement de dev, à voir si c'est le cas en prod
    const data = await fetch(`${axiosInstance.defaults.baseURL}users/avatar`, {
        method: "POST",
        body: formData,
      });
      console.log(error)
      return data;
  }
};
