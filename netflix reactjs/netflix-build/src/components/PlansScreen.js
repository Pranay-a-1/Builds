import React, { useState, useEffect } from "react";
import "./component-styles/PlansScreen.css";
import db from "../firebase";
import {
  getDocs,
  addDoc,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const collectionRef = collection(db, `customers/${user.uid}/subscriptions`);

    onSnapshot(collectionRef, (querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start:
            subscription.data().current_period_start.seconds,
        });
      });
    });
  }, [user.uid]);

  useEffect(() => {
    getDocs(collection(db, "products"), where("active", "==", true))
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();

          const priceSnap = await getDocs(collection(productDoc.ref, "prices"));

          priceSnap.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(subscription);

  const loadcheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(db, `customers/${user.uid}/checkout_sessions`),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occurred: ${error.message}`);
      }
      if (sessionId) {
        // We have a Stripe Checkout URL, let's redirect.
        const stripe = await loadStripe(
          "pk_test_51LuPVQI3ZeYjLSODiSylM2yxcfrKrZV7oL0UWzQNmLswWAPl4qqMLgwozsxJ5c4w3jJZNOJ546Dxdyr6EAYqjd2f00ArJ55eYW"
        );
        stripe.redirectToCheckout({ sessionId });
        //  window.location.assign(url);
      }
    });
  };
  return (
    <div className="plansScreen">
      <br />
      {subscription && (
        <p>
          Renewal date :{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productID, productData]) => {
        // const isCurrentPackage = productData?.name.includes(subscription?.role);
        const isCurrentPackage = productData?.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            className={`${
              isCurrentPackage && "plansScreen__plan--disabled"
            } plansScreen__plan`}
            key={productID}
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadcheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
