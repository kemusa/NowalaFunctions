import * as admin from 'firebase-admin';

class DbService {
  updateDoc = async (
    collectionPath: string,
    id: string,
    data: any
  ) => {
    return await admin
      .firestore()
      .collection(collectionPath)
      .doc(id)
      .update(data);
  };
}

export default DbService