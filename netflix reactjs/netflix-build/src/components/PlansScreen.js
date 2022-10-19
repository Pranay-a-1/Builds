import React, { useEffect, useState } from "react";
import db from "../firebase";
import "./component-styles/PlansScreen.css";
import {
  collection,
  where,
  query,
  doc,
  collectionGroup,
} from "firebase/firestore";
import { getDocs } from "firebase/firestore";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    (async function () {
      const userCollection = collection(db, "products");

      const querySnapshot = await getDocs(userCollection);
      setProducts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );

      const priceCollection = query(
        collection(db, "products"),
        where("active", "==", true)
      );

      const priceSnapshot = await getDocs(priceCollection);
      setPrices(
        priceSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    })();
  }, []);

  //   useEffect(() => {
  //     db.collection("products")
  //       .where("active", "==", "true")
  //       .get()
  //       .then((querySnapshot) => {
  //         const products = {};
  //         querySnapshot.forEach(async (productDoc) => {
  //           products[productDoc.id] = productDoc.data();
  //           const priceSnap = await productDoc.ref.collection("prices").get();

  //           priceSnap.docs.forEach((price) => {
  //             products[productDoc.id].prices = {
  //               priceId: price.id,
  //               priceData: price.data(),
  //             };
  //           });
  //         });
  //         setProducts(products);
  //       });
  //   }, []);

  console.log(products);
  console.log(prices);

  const loadCheckout = async (priceId) => {};

  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        // TODO add some logic to check if the user's subscription is active...
        return (
          <div className="plansScreen__plan">
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
