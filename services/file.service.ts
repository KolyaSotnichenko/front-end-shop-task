import axios from "../api/interceptors";

export const FileService = {
  async upload(file: FormData, folder?: string) {
    return axios.post<{ url: string; name: string }[]>("/files", file, {
      params: { folder },
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent: any) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`Upload Progress: ${percentCompleted}%`);
      },
    });
  },
};
