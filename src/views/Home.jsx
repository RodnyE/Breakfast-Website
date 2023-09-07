
import {useState, useEffect} from "react"

import View from "ui/View"
import Card from "ui/Card"
import TextField from "ui/TextField"
import Pagination from "ui/Pagination"
import Button from "ui/Button"

import http from "utils/http"
import HomeViewContent from "./HomeContent"
import heroImg from "../assets/hero-1.jpg"

export default function HomeView ({show}) {
    
    const [nameField, setNameField] = useState("");
    const [postField, setPostField] = useState("");
    const [visits, setVisits] = useState(0);
    const [gettingPostList, setGettingPostList] = useState(false);
    const [postList, setPostList] = useState([]);
    

    useEffect(()=>{
        http.get("/views").then(({views}) => {
            setVisits(views)
        })
    }, [])

    const blurBg = {
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(.1rem)",
        padding: ".5rem",
        borderRadius: "1rem"
    }
    
    return (
        <View show={show} className="align-items-strenth">
            
            <nav 
                className="text-light p-2 pt-5 d-flex flex-column justify-content-end align-items-start"
                style={{
                    background: "url(" + heroImg + ")",
                }}
            >
                <h1 style={blurBg} className="fade-animation text-light fw-bold"> Sabor Vital </h1>
            </nav>
            
            <p className="text-gray"> 👁‍🗨{visits} </p>

            <p style={{borderLeft: "solid currentColor 4px"}} className="m-2 p-2">
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
                    value={0}
                    length={5}
                    disabled={gettingPostList}
                    onChange={(index) => {
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
                        
                    }}
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
                    onChange={e => setNameField(e.target.value)}
                />
                <textarea 
                    rows="7" 
                    className="form-control"
                    placeholder="Me ha ido bien en mi rutina..."
                    value={postField}
                    onChange={e => setPostField(e.target.value)}
                />

                <Button onClick={()=>{
                    http.post({
                        url: "/post",
                        body: {
                            name: nameField,
                            text: postField,
                        }
                    })
                }}
                > Publicar</Button>
            </Card>
            
        </View>
    )
}