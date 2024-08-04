// import React from "react";
// import { db } from "../firebase/config";

// const useFirestore = (collection, condition) => {
//   React.useEffect(() => {
//     let collectionRef = db.collection(collection).orderBy("createrAt") 

//     if (condition) {
//       if (!condition.compareValue || !condition.compareValue.length) {
//         return;
//       }

//         collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)
//     }
//     collectionRef.onSnapshot((snapshot) => {
//       const documents = snapshot.docs.map(docs => ({
//         ...doc.data(),
//         id: doc.id
//       }))
//     })

//     //   const data = snapshot.docs.map((doc) => ({
//     //     ...doc.data(),
//     //     id: doc.id,
//     //   }));

//     //   console.log({ data, snapshot, doc: snapshot.docs });
//     });
//   }, []);

// export default useFirestore
