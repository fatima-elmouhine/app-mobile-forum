import axiosInstance from "../config";

export const postImageTheme = async (id, file) => {
    console.log("file", file);
    const formData = new FormData();
    formData.append('upload', {
        uri: file,
        type: "image/*",
        name: `${id}Theme`,
    });
    formData.append("id", id);
    const images = JSON.stringify(formData);
    try {
        const data = await fetch(`${axiosInstance.defaults.baseURL}themes/imageTheme`, {
            method: "POST",
            body: images,
        });
        return data;
    } catch (error) {
    // Bug: on doit le faire deux fois dans notre environnement de dev, à voir si c'est le cas en prod
        const data = await fetch(`${axiosInstance.defaults.baseURL}themes/imageTheme`, {
            method: "POST",
            body: images,
        });
        console.log(error)
        return data;
    }
};