import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

exports.addTimestamp = functions.database
    .ref("/hist/{docId}")
    .onCreate((snap, context) => {
      return snap.ref.child("i").set(
          admin.database.ServerValue.TIMESTAMP);
    });

