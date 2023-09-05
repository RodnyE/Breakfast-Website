
import {useState, useEffect} from "react"

import View from "ui/View"
import MenuButton from "ui/MenuButton"


export default function HomeView ({show}) {
    
    useEffect(() => {
        
    }, [show]);
    
    return (
        <View show={show}>
            
            <nav className="d-flex align-items-center">
                <MenuButton />
                <p className="m-0 fw-bold fs-3"> Comida </p>
            </nav>
            
        </View>
    )
}