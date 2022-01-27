import { storage } from '@/config/firebase';
import {
  UploadTask,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

export const uploadCollectionImage = (
  file: File,
  userId: string,
  postId: number
): UploadTask => {
  const extension = file.name.substring(file.name.lastIndexOf('.') + 1);
  const path = `${userId}/collections/${postId.toString()}.${extension}`;

  const storageRef = ref(storage, path);

  // 'file' comes from the Blob or File API
  return uploadBytesResumable(storageRef, file);
};

export const getStorageDownloadUrl = async (task: UploadTask) => {
  return await getDownloadURL(task.snapshot.ref);
};

export const uploadUserImage = (
  file: File,
  userId: string,
  fileName: string
): UploadTask => {
  const extension = file.name.substring(file.name.lastIndexOf('.') + 1);
  const path = `${userId}/${fileName}.${extension}`;

  const storageRef = ref(storage, path);

  // 'file' comes from the Blob or File API
  return uploadBytesResumable(storageRef, file);
};
