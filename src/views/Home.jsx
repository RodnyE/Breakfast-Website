
import {useState, useEffect} from "react"

import View from "ui/View"
import Card from "ui/Card"
import TextField from "ui/TextField"
import Pagination from "ui/Pagination"
import Button from "ui/Button"
import Spinner from "ui/Spinner"

import http from "utils/http"

import HomeViewContent from "./HomeContent"
import heroImg from "../assets/hero-1.jpg"



export default function HomeView ({show}) {
    
    const bfp = document.bfp;
    const [nameField, setNameField] = useState("");
    const [postField, setPostField] = useState("");
    const [visits, setVisits] = useState(0);
    
    const [gettingPostList, setGettingPostList] = useState(false);
    const [sendingPost, setSendingPost] = useState(false);
    const [postListIndex, setPostListIndex] = useState(0);
    const [postList, setPostList] = useState([]);
    
    
    
    // Fetch to Post List
    const requestPostList = (index) => {
        setGettingPostList(true);
        http.post({
            url: "/getpost", 
            body: {sel: index + 1}
        })
        .then(({status, data, error}) => {
            setGettingPostList(false);
            if (status) setPostList(data);
        })
       .catch(() => setGettingPostList(false))
    }
    
    useEffect(() => {
        
        http.post({url: "/views", body:{
            fp: document.bfp,
        }})
        .then(({views}) => {
            setVisits(views);
        });
    }, []);
    
    return (
        <View show={show} className="align-items-strenth">
            
            <nav 
                className="text-light p-2 pt-5 d-flex flex-column justify-content-end align-items-start"
                style={{
                    background: "url(" + heroImg + ")",
                }}
            >
                <h1 style={{
                        background: "rgba(0,0,0,0.2)",
                        backdropFilter: "blur(.1rem)",
                        padding: ".5rem",
                        borderRadius: "1rem",
                    }}
                    className="slide-left-animation text-light fw-bold"
                > Sabor Vital </h1>
            </nav>
            
            <p className="text-gray"> 👁‍🗨{visits} </p>

            <p className="slide-left-animation" style={{borderLeft: "solid currentColor 4px"}} className="m-2 p-2">
                Bienvenidos a nuestro emocionante proyecto "SaborVital: Desayunos que cuidan, Hábitos que Elevan"..
            </p>
            
            {/* 
              * collapses
              */}
            <HomeViewContent/>

            {/*
              * Posts box
              */}
            <Card className="p-2 mt-5 m-2 d-flex flex-column align-items-center">
                <h3> Comentarios </h3>
                <div className="d-flex flex-column w-100 overflow-auto" style={{height: "25rem"}}>
                    {postList.map((item, index) => {
                        return (item &&
                        <div key={index} className="d-flex flex-column align-items-start">
                            <strong> {item.name} </strong>
                            <p> {item.text} </p>
                            <hr/>
                        </div>
                        )
                    })}
                </div>
                
                <Pagination
                    value={postListIndex}
                    length={5}
                    disabled={gettingPostList}
                    onChange={(index) => requestPostList(index)}
                />
            </Card>
            
            
            {/*
              * Post
              */}
            <Card className="p-2 m-2 border-0">
                <h3> Postea lo que piensas ! </h3>
                <TextField 
                    placeholder="Tu Nombre..."
                    value={nameField}
                    disabled={sendingPost}
                    onChange={e => setNameField(e.target.value)}
                />
                <textarea 
                    rows="7" 
                    className="form-control"
                    disabled={sendingPost}
                    placeholder="Me ha ido bien en mi rutina..."
                    value={postField}
                    onChange={e => setPostField(e.target.value)}
                />

                <Button disabled={sendingPost} onClick={()=>{
                    setSendingPost(true)
                    http.post({
                        url: "/post",
                        body: {
                            name: nameField,
                            text: postField,
                        }
                    })
                    .then(() => {
                        setTimeout(()=>{
                            setSendingPost(false);
                            requestPostList(1);
                            setPostIndex(1)
                        }, 10000);
                    })
                }}
                > 
                     {sendingPost && <Spinner/>} Publicar 
               </Button>
            </Card>
            
        </View>
    )
}