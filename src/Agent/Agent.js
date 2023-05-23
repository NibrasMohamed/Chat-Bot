
import storage from "../Data/Starter.json";
import model from "../Data/Policies.json";
import { useDispatch } from "react-redux";

const starter = storage.prompts;
const small_talks = storage.small_talks;
const policies = model.policies;
const car = model.car;

export function agent(prompt, selected_vehicle, chat_mode="general") {

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
        default:
            data = policies;
            break;
    }
    const response = findAnswer(prompt, data);
    
    return response;
};



const findAnswer = (prompt, data) => {
    console.log('[data]', data);
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


