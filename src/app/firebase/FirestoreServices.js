import cuid from 'cuid';
import firebase from './firebase.config';

const db = firebase.firestore()

export const dataFromSnapshot = Snapshot =>{
    if (!Snapshot.exists) return undefined;
    const data = Snapshot.data()

    // to check the date and convert it from timeStamp to javaScript date
    for (const prop in data){
        if(data.hasOwnProperty(prop)){
            if(data[prop] instanceof firebase.firestore.Timestamp){
                data[prop] = data[prop].toDate();
            }
        }
    }
    return{
        ...data,
        id: Snapshot.id
    }
}

export const listenToEventsFromFirestore = () =>{
   return db.collection('events');
} 
export const listenToEventFromFirestore = eventId =>{
    return db.collection('events').doc(eventId) 
}

export const addEventToFirestore = event =>{
    return db.collection('events').add({
        ...event,
        hostedBy: 'Sasha',
        hostPhotoURL: 'https://randomuser.me/api/portraits/women/21.jpg',
        attendees:firebase.firestore.FieldValue.arrayUnion({
            id:cuid(),
            displayName: 'Sasha',
            photoURL:'https://randomuser.me/api/portraits/women/21.jpg'
        })
    })
} 

export const updateEventToFirestore = event =>{
    return db.collection('events').doc(event.id).update(event)
}
export const deleteEventFromFirestore = event =>{
    return db.collection('events').doc(event.id).delete()
}
export const cancelEvent = event =>{
    return db.collection('events').doc(event.id).update({
        isCanceled: !event.isCanceled
    })
}

export const setUserProfileData = user =>{
    db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        createdAt : firebase.firestore.FieldValue.serverTimestamp()
    })
}

export const getUserProfile = userId =>{
    return db.collection('users').doc(userId)
}


export const updateProfile = async (value) => {
    const user = firebase.auth().currentUser;
    try {
        if (user.displayName !== value.displayName){
            await user.updateProfile({
                displayName: value.displayName,
            });
        }
     
      return await db.collection("users").doc(user.uid).update(value);
    } catch (error) {
      throw error;
    }
  };



  export const updateUserProfilePhoto = async (downloadURL, fileName) => {
    const user = firebase.auth().currentUser;
    const userDocRef = db.collection("users").doc(user.uid);
    try {
      //we get the data from the userDoc
      const userDoc = await userDocRef.get();
      if (!userDoc.data().photoURL) {
        await db.collection("users").doc(user.uid).update({
          photoURL: downloadURL,
        });
        // to update the user auth
         await user.updateProfile({
          photoURL: downloadURL,
        });
      }
      //add the photos to the the user's photo collection inside their doc
      return await db.collection("users").doc(user.uid).collection("photos").add({
        name: fileName,
        url: downloadURL,
      });
    } catch (error) {
      throw error;
    }
  };

  export const getUserPhotos= userId =>{
      return db.collection('users').doc(userId).collection('photos') 
  }

  export const setPhotoToMain = async photo =>{
    try {
        const user = firebase.auth().currentUser;
        await db.collection('users').doc(user.uid).update({
            photoURL: photo.url
        })

        return await user.updateProfile({
            photoURL: photo.url
        })

    } catch (error) {
        throw error
    }
  }