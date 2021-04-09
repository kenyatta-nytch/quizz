function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

export function processData(data) {
    const questions = data.results.map(q => {
        const choices = shuffle([q.correct_answer, ...q.incorrect_answers]);
        return {
            question: q.question,
            category: q.category,
            type: q.type,
            difficulty: q.difficulty,
            choices: choices,
            answer: q.correct_answer
        }
    })
    return questions
}

// remove entertainment prefix from categories
export function formatCategoryNames(name) {
    if (name.includes('Entertainment:')) {
        return name.slice(15);
    }

    return name
}

// decode returned html from opendb
export function decode(html) {
  var txt = document.createElement("p");
  txt.innerHTML = html;
  return txt.innerText;
}
