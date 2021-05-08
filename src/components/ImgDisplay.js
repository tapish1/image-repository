import React, {useState, useEffect} from 'react'
import firebase_resources from '../config'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card'
import { Divider } from 'material-ui';
import firebase from 'firebase/app'

const ImgDisplay = ({setSelected}) => {
    const window_url = window.location.search
    const urlParams = new URLSearchParams(window_url);
    const user = urlParams.get('user')
    const [images, setImages] = useState([])
    const [deleteImgs, setDeleteImgs] = useState([])
    const [deleteImgIndexs, setDeleteImgIndexs] = useState([])
    const [disabled, setDisabled] = useState(true)

    const handleCheckBox = (checked, index, url) => {
        if(checked){
            const imgs = deleteImgs
            imgs.push(url)
            setDeleteImgs(imgs)
            const indexs = deleteImgIndexs
            indexs.push(index)
            setDeleteImgIndexs(indexs)
        }else{
            if(deleteImgs.includes(url)){
                const imgs = deleteImgs
                var index = imgs.indexOf(url);
                imgs.splice(index,1)
                setDeleteImgs(imgs)
            }
            if(deleteImgIndexs.includes(index)){
                const indexs = deleteImgIndexs
                var index = indexs.indexOf(index);
                indexs.splice(index,1)
                setDeleteImgIndexs(indexs)
            }
        }

        if(deleteImgs.length!=0 || deleteImgIndexs.length!=0){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    }

    const GetData = () => {
        const collectionRef = firebase_resources[2].collection('users');
        useEffect(() => {
            firebase_resources[2].collection('users').doc(user)
            .onSnapshot((doc)=>{
                let documents = []
                if(doc.data()){
                console.log(doc.data()['images'].length)
                for(let i=0; i<doc.data()['images'].length; i++){
                    var pair = {img: doc.data()['images'][i], index:i}
                    documents.push(pair)
                }
            }
                setImages(documents)
            })
        }, [])
    }

    const handleMultiDelete = () => {
        for(let i=0; i<deleteImgs.length; i++){
            handleDelete(deleteImgIndexs[i], deleteImgs[i])
        }
        setDeleteImgs([])
        setDeleteImgIndexs([])
        setDisabled(true)
    }

    const handleDeleteAll = () => {
        for(let i=0; i<images.length; i++){
            handleDelete(images[i].index, images[i].img)
        }
    }

    const handleDelete = (index, url) => {
        const db = firebase_resources[2].collection('users').doc(user);
        console.log(index)
        var temp = images
        //Removes image url from images array
        db.update({
            images: firebase.firestore.FieldValue.arrayRemove(url)
        });
        //Need to remove premision value from images_bool/premissions array

        firebase_resources[2].runTransaction((transaction) => {
            return transaction.get(db).then((doc) => {
                if (!doc.data().images_bool) {
                    transaction.set({
                        images_bool: []
                    });
                } else {
                    const premissions = doc.data().images_bool;
                    premissions.splice(index,1);
                    transaction.update(db, { images_bool: premissions });
                }
            });}).then(function () {
                console.log("Transaction successfully committed!");
            }).catch(function (error) {
                console.log("Transaction failed: ", error);
                alert("Could not fully delete: ", error)
            });
    }

    GetData()

    return (
        <div >
            <div style={{marginLeft: '42%' }}>
            <button disabled={disabled} style={{marginTop:"10px",  marginRight:'5px'}} onClick={handleMultiDelete}>Delete</button>
            <button style={{marginTop:"10px",  marginRight:'5px'}} onClick={handleDeleteAll}>Delete All</button>
            </div>
        <div className="img-grid">
            { images && images.map(img => (
                <div key={img.index}>
                <div className="img-wrap" onClick={() => setSelected(img.img)}>
                        <img src={img.img} alt="picture"></img>
                </div>
                <input
                        name="delete"
                        type="checkbox"
                        style={{marginLeft: '50%'}}
                        onChange={(e) => handleCheckBox(e.target.checked, img.index, img.img)}
                    />
            </div>
            ))}
        </div>
        </div>
    )
}

export default ImgDisplay; 
