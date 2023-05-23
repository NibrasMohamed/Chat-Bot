
import storage from "../Data/Starter.json";
import model from "../Data/Policies.json";
import { connect, useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import React from 'react';
import { Typography } from "@mui/material";
import { setVehicle, resetVehicle, setChatMode} from "../Store/agentReducer";



const Agent = (prop) => {
    const selected_vehicle = useSelector((state) => state.agent.selected_vehicle)
    const current_chat_mode = useSelector((state) => state.agent.current_chat_mode)
    const [answer, setAnswer] = useState("...");
    const dispatch = useDispatch();
    

    const starter = storage.prompts;
    const small_talks = storage.small_talks;
    const policies = model.policies;
    const car = model.car;

    function getResponse(prompt, selected_vehicle, chat_mode = "general") {

        console.log('[selected_vehicle=' + selected_vehicle + ']', '[chat mode = ' + chat_mode + ']');
        let data = [];
        switch (chat_mode) {
            case "small":
                data = small_talks
                break;
            case "general":
                data = starter;
                break;
            case "question":
                data = car;
                break
            default:
                data = policies;
                break;
        }
        const response = findAnswer(prompt, data);

        return response;
    };

    const findAnswer = (prompt, data) => {
        console.log('[data]', prompt);
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

    useEffect(() => {
        const response = getResponse(prop.prompt, selected_vehicle, current_chat_mode);
        setAnswer(response.answer);
        return () => {
            // second
        }
    }, [prompt])

    return (
        <div>
            <Typography
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

