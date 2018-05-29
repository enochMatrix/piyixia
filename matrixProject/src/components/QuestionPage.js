import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, QuestionCard, AnswerCard, Buttons } from './common';
import questionData from './questionData.json';

const NUMBER_OF_QUESTIONS = 3;

function shuffle(array) {
 for (let i = array.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
 }
}

class QuestionPage extends Component {

  state = { question: [], options: [], correctoption: [], questionIndex: 0 };

  componentWillMount() {
     shuffle(questionData.data);
    this.setState({ question: questionData.data[0].question,
                    options: questionData.data[0].options,
                    correctoption: questionData.data[0].correctoption,
                    questionIndex: 0
                  });
  }

  nextButtonOnPress() {
    const c = this.state.questionIndex + 1;
    if (this.state.questionIndex < NUMBER_OF_QUESTIONS - 1) {
      this.setState({ question: questionData.data[c].question,
                    options: questionData.data[c].options,
                    correctoption: questionData.data[c].correctoption,
                    questionIndex: c
                  });
  }
}

  answerButtonOnPress(status, key) {
    if (key === this.state.correctoption) {
      console.log('correct!');
    } else {
      console.log('wrong!');
    }
  }
  render() {
    const currentOptions = this.state.options;
    const options = Object.keys(currentOptions).map(key => {
      return (
        <View key={key} style={{ margin: 3 }}>
         <Buttons onPress={(status) => this.answerButtonOnPress(status, key)}>
           {currentOptions[key]}
         </Buttons>
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
