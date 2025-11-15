import { createContext, useState } from "react";
import { counterContext } from './Countercontext';

export let counterContext = createContext();

export default function counterContextProvider(props){
    const [counter , setCounter] = useState(0)

    function changeCounter(){
        setCounter(Math.random())
    }
}
return <counterContext.Provider value={{counter , changeCounter}}>
    {props.children}
</counterContext.Provider>