import React, {useState, useEffect} from 'react'
import firebase_resources from './config'
import Modal from './components/modal.js'
import history from './history';

function Feed() {
   
    const [images, setImages] = useState([]) 
    const [show, setShow] = useState(false)
    const window_url = window.location.search
    const urlParams = new URLSearchParams(window_url);
    const user = urlParams.get('user')
    const [homeUrl, setUrl] = useState('/home'+"?user="+user)
    const [selectedImg, setSelected] = useState(null)

    const handleClick = () => {
        history.push(homeUrl)
      }

    const GetData = () => {
        const collectionRef = firebase_resources[2].collection('users');
        useEffect(() => {
            firebase_resources[2].collection('users')
            .onSnapshot((user)=>{
                let documents = []
                user.forEach(doc => {
                    for(let i=0; i<doc.data()['images'].length; i++){
                        var pair={private: doc.data()['images_bool'][i], img: doc.data()['images'][i], index:doc.id+i}
                        documents.push(pair)
                    }
                    
                });
                setImages(documents)
            })
        }, [])
    }

    GetData()


    return (
        <div className="App">
             <div className="title">
                <a href='#' onClick={handleClick}><h1>Personal</h1></a>
                <h2>Feed</h2>
            </div>
        <div className="img-grid">
        { images && images.map(img => (
              !img.private ? (<div key={img.index}>
            <div className="img-wrap" onClick={() => setSelected(img.img)}>
                    <img src={img.img} alt="picture"></img>
            </div>
        </div> ) : null 
            
        ))}
    </div>
    {selectedImg && <Modal selectedImg={selectedImg} setSelected={setSelected}></Modal>}
    </div>
    );

}

export default Feed;
