import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev+nextWord);
        }, 75*index)
    }

    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await run(prompt)
            setPrevPrompts(prompt)
        }
        else
        {
           setPrevPrompts(prev=>[...prev,input])
           setRecentPrompt(input)
           response = await run(input)
        }
        // setRecentPrompt(input)
        // setPrevPrompts(prev=>[...prev,input])
        // const response = await run(input)
        let responseArray = response.split("**");
        let newRespones ="";
        for (let i =0; i < responseArray.length; i++) {
            if (i === 0 || i%2 !== 1) {
                newRespones += responseArray[i];
            }
            else {
                newRespones += "<b>"+responseArray[i]+"</b>"
            }
        }
        let newRespones2 = newRespones.split("*").join("</br>")
        // setResultData(newRespones2)
        let newResponseArray = newRespones2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i]
            delayPara(i, nextWord+" ")
        }

        setLoading(false)
        setInput("")

    }



    // onSent("what is react js")

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

        // onSent,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider



