
import storage from "../Data/Starter.json";

const data = storage.prompts;

export function agent(prompt) {
    let words = prompt.split(" ");
    const queLength = words.length;
    words = words.filter(value => value.length > 1);

    const filteredAnswers = data.filter((value, index)=>{
        let probabilty = 0;
        words.forEach((word) => {
            const question = value.question.toLowerCase();
            if(question.includes(word.toLowerCase())) {
                probabilty++;
            };
        });
        value.probabilty = probabilty;
      
        return 1 <= probabilty;
    })

    let finalAnswer = {"answer": "Please Check Your Question...", "probabilty": 0};
    filteredAnswers.forEach(element => {
        if (element.probabilty > finalAnswer.probabilty) {
            finalAnswer = element;
        }
    })

    
    console.log('[filteredAnswers]', filteredAnswers);

    return finalAnswer;
};


