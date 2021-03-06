import { fireStore} from '../firebase';

const stripeCustomerRef=fireStore.collection('stripe_customers');

const fetchUserChargesSuccess = charges => {
  return {
    type: 'FETCH_CHARGE',
    charges: charges
  }
}

export const fetchUserCharges = (cuid) => dispatch => {
  stripeCustomerRef.doc(cuid).collection("charges").onSnapshot((snapshot) => {
    let charges=[];
    snapshot.docs.forEach((doc) => {
      const charge = doc.data();
      charges.push(charge);
    })
    dispatch(fetchUserChargesSuccess(charges));
  })
}



export const createCharge = (cuid, amount, description) => dispatch => {
  stripeCustomerRef.doc(cuid).collection("charges").add({amount:amount, description: description,status:"pending"});
}


export const createRefund = (cuid, chargeId) => dispatch => {
  stripeCustomerRef.doc(cuid).collection("charges").where("id", "==", chargeId).get().then( (querySnapshot) => {
      querySnapshot.forEach((chargeDoc) => {
        stripeCustomerRef.doc(cuid).collection("charges").doc(chargeDoc.id).update({status:"pending"});
      })
    })
  stripeCustomerRef.doc(cuid).collection("refunds").add({chargeId:chargeId});
}
