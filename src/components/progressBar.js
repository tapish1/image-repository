import React, { useState, useEffect } from 'react'
import firebase_resources from '../config'
import firebase from 'firebase/app'

const ProgressBar = ({file, setFile, check, setCheck, setSubmit}) => {

    const [progress, setProgress] = useState(0)
    const [error, setError] = useState('')
    const [url, setUrl] = useState('')
        
        useEffect(() => {
            fetch('/current_user').then(res => res.json()).then(data => {
              console.log(data)
            });
          }, [])
    
    const useStorage = () => {
        
        useEffect(() => {
            const storageRef = firebase_resources[1].ref(file.name);
            const collectionRef = firebase_resources[2].collection('users');

            storageRef.put(file).on('state_changed', (snap) => {
                let percent = (snap.bytesTransferred / snap.totalBytes)*100;
                setProgress(percent);
            }, (err)=>{
                setError(err)
            }, async ()=>{
                const url = await storageRef.getDownloadURL();
                const window_url = window.location.search
                const urlParams = new URLSearchParams(window_url);
                const user = urlParams.get('user')
                let private_bool = false
                if( check=='true'){
                    private_bool = true
                }
                var userDoc = firebase_resources[2].collection('users').doc(user);
   
                firebase_resources[2].runTransaction(async (transaction) => {
                    return await transaction.get(userDoc).then((doc) => {
                        console.log(doc.data().images_bool)
                        if (!doc.data().images_bool) {
                            console.log("hello")
                            collectionRef.doc(user).set({
                                images_bool: firebase.firestore.FieldValue.arrayUnion(private_bool)
                            }, { merge: true });
                        } else {
                            const premissions = doc.data().images_bool;
                            premissions.push(private_bool);
                            transaction.update(userDoc, { images_bool: premissions });
                        }
                    });}).then(function () {
                        console.log("Transaction successfully committed!");
                    }).catch(function (error) {
                        console.log("Transaction failed: ", error);
                    });
                collectionRef.doc(user).set({
                    images: firebase.firestore.FieldValue.arrayUnion(url)
                }, { merge: true });
                setUrl(url)
                setCheck('false')
                setSubmit(null)
            })
        }, [file]);
    }

    useStorage();

    useEffect(() => {
        if(url){
            setFile(null)
        }
    }, [url, setFile])
    

    return(
        <div className="bar" style={{ width: progress + "%" }}></div>
    )
}

export default ProgressBar;
