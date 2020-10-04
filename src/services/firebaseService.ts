import { firebaseDatabase } from '../utils/firebase'

export default class FirebaseService {
  static getDataList = (nodePath: any, callback: any, size: number = 10) => {
    let query = firebaseDatabase.ref(nodePath).limitToLast(size);
    query.on('value', dataSnapshot => {
      let items: string[] = [];
      dataSnapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item['key'] = childSnapshot.key;
        items.push(item);
      });
      callback(items);
    });
    return query;
  };
}