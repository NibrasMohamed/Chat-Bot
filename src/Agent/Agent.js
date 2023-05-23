
import storage from "../Data/Starter.json";
import model from "../Data/Policies.json";
import { useDispatch } from "react-redux";
import { useState , useEffect} from "react";
import React from 'react';
import { Typography } from "@mui/material";

const starter = storage.prompts;
const small_talks = storage.small_talks;
const policies = model.policies;
const car = model.car;

function getResponse(prompt, selected_vehicle, chat_mode="general") {

    console.log('[selected_vehicle='+selected_vehicle+']', '[chat mode = '+chat_mode+']');
    let data = [];
    switch (chat_mode) {
        case "small":
            data = small_talks
            break;
        case "general":
            data = starter;
            break;
        case "que":
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

const Agent = (prop) => {
    const [answer, setAnswer] = useState();
    useEffect(() => {
        const response = getResponse(prop.prompt);
        setAnswer(response);
      return () => {
        // second
      }
    }, [prompt])
    
    console.log('[answer]', answer);
    return(
        <div>
             <Typography
              variant="body1"
              style={{ marginBottom: '10px', fontWeight: 'bold' }}
              align={'left'}
            >
              {answer.answer}
            </Typography>
        </div>
    );
}

export default Agent

