
import storage from "../Data/Data.json";
import { connect, useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import React from 'react';
import { Typography } from "@mui/material";
import { setVehicle, resetVehicle, setChatMode, addQueCount, resetQueCount } from "../Store/agentReducer";



const Agent = (prop) => {
    const selected_vehicle = useSelector((state) => state.agent.selected_vehicle)
    const vehicleList = useSelector((state) => state.agent.vehicles)
    const current_chat_mode = useSelector((state) => state.agent.current_chat_mode)
    const que_count = useSelector((state) => state.agent.que_count)
    const [answer, setAnswer] = useState("...");
    const question = storage.questions;
    const [data, setData] = useState(storage);
    const dispatch = useDispatch();


    function getResponse(prompt, selected_vehicle, chat_mode = "general") {
        let probelities = 0;
        let response = { answer: "please check your question" }
        console.log('[selected_vehicle=' + selected_vehicle + ']', '[chat mode = ' + chat_mode + ']');

        switch (current_chat_mode) {
            case "general":
                response = findAnswer(prompt, data.answer)
                break;
            case "question":
                response.answer = askQuestion();
                break
            case "answer":
                response = findAnswer(prompt, data.answer)
                break;
            default:
                for (const key in data) {
                    const answer = findAnswer(prompt, data[key])
                    if (answer.probabilty > probelities) {
                        response = answer
                        probelities = answer.probabilty
                    }

                }
                break;
        }


        return response;
    };

    const findAnswer = (prompt, data) => {
        let words = prompt.split(" ");

        const filteredAnswers = data.filter((value, index) => {
            let probabilty = 0;
            words.forEach((word) => {
                const question = value.question.toLowerCase();
                if (question.includes(word.toLowerCase())) {
                    probabilty++;
                };
            });
            value.probabilty = probabilty;

            return 1 <= probabilty;
        })

        let finalAnswer = { "answer": "Please Check Your Question...", "probabilty": 0 };
        filteredAnswers.forEach(element => {
            if (element.probabilty > finalAnswer.probabilty) {
                finalAnswer = element;
            }
        })


        return finalAnswer;
    }

    const askQuestion =  () => {
        let que = {};
        if (selected_vehicle == "not selected") {
            dispatch(resetQueCount);
            que.question = question[que_count];
            que.extra = vehicleList.map((vehicle, index)=> buttons(vehicle, index));
        } else {
            que.question = question[que_count]
        }
        dispatch(addQueCount())
        return que;
    }

    const handleVehicleSelect = (e,type) =>{
        console.log('[type]', type, e);
        dispatch(setVehicle(type))
        prop.handleExtraClicks(e);
    }

    const buttons = (type, key) => {
        return(
            <button key={key} value={type} className="col" style={{margin: "7px"}} onClick={(e)=>handleVehicleSelect(e,type)}>{type}</button>
        )
    }

    useEffect(() => {
        const response = getResponse(prop.prompt, selected_vehicle, current_chat_mode);
        setAnswer(response.answer);
        return () => {
            // second
        }
    }, [prompt])

    return (
        current_chat_mode === "question"?
        <div className="row" style={{textAlign: "left"}}>
            {answer.question}{answer.extra?answer.extra:""}
        </div>:
        <div>
            <Typography
                key={prop.key}
                variant="body1"
                style={{ marginBottom: '10px', fontWeight: 'bold' }}
                align={'left'}
            >
                {answer}
            </Typography>
        </div>
    );
}

const mapStateToProps = (state) => ({
    myState: state.agent
})

export default connect(mapStateToProps)(Agent)

