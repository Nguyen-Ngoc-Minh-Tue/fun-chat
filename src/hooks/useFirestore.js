import React, { useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  React.useEffect(() => {
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        setDocuments([]);
        return;
      }
    }
    let collectionRef = query(
      collection(db, collectionName),
      where(condition.fieldName, condition.operator, condition.compareValue),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setDocuments(data);
    });

    return unsubscribe;
  }, [condition, collectionName]);

  return documents;
};

export default useFirestore;
