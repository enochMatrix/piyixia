import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Card, QuestionCard, AnswerCard, Buttons } from './common';
import questionData from './questionData.json';

const NUMBER_OF_QUESTIONS = 3;

//shuffle(array) is to randonize an array
function shuffle(array) {
 for (let i = array.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
 }
}

class QuestionPage extends Component {

  state = {
    question: [],
    options: [],
    correctoption: [],
    questionIndex: 0,
    score: 0,
    finishAnswer: false
   };

  componentWillMount() {
    shuffle(questionData.data);
    this.setState({ question: questionData.data[0].question,
                    options: questionData.data[0].options,
                    correctoption: questionData.data[0].correctoption,
                    questionIndex: 0
                  });
  }

  nextButtonOnPress() {
    this.setState({ finishAnswer: true });
    const c = this.state.questionIndex + 1;
    if (this.state.questionIndex < NUMBER_OF_QUESTIONS - 1) {
      this.setState({ question: questionData.data[c].question,
                    options: questionData.data[c].options,
                    correctoption: questionData.data[c].correctoption,
                    questionIndex: c
                  });
  } else {
    console.log(this.state.score);
  }
}

  answerButtonOnPress(key) {
    if (key === this.state.correctoption) {
      console.log('correct!');
      this.setState({ score: this.state.score + 1 });
    } else {
      console.log('wrong!');
    }
  }
  render() {
    const currentOptions = this.state.options;
    const options = Object.keys(currentOptions).map(key => {
      return (
        <View key={key} style={{ margin: 3 }}>
          <TouchableOpacity disabled={this.state.finishAnswer}>
         <Buttons onPress={() => this.answerButtonOnPress(key)}>
           {currentOptions[key]}
         </Buttons>
         </TouchableOpacity>
       </View>
     );
   }
 );

    return (
      <Card>
        <QuestionCard>
          <Text>{this.state.question}</Text>
        </QuestionCard>

        <AnswerCard>
          {options}
        </AnswerCard>
        <View style={{ alignSelf: 'center' }}>
        <Buttons style={{ flex: 0.2 }} onPress={this.nextButtonOnPress.bind(this)}>
          Next
        </Buttons>
      </View>
      </Card>
    );
  }
}

export default QuestionPage;
