import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import CircleCheckBox from 'react-native-circle-checkbox';
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
    correctoption: '',
    userSelect: '',
    questionIndex: 0,
    score: 0,
    option1checked: false,
    option2checked: false,
    option3checked: false,
    option4checked: false
   };

  componentWillMount() {
    shuffle(questionData.data);
    this.setState({ question: questionData.data[0].question,
                    options: questionData.data[0].options,
                    correctoption: questionData.data[0].correctoption,
                    questionIndex: 0,
                    score: 0
                  });
  }

  nextButtonOnPress() {
    if (this.state.userSelect === this.state.correctoption) {
      const c = this.state.questionIndex + 1;
      const s = this.state.score + 1;
      if (this.state.questionIndex < NUMBER_OF_QUESTIONS - 1) {
        this.setState({ question: questionData.data[c].question,
                      options: questionData.data[c].options,
                      correctoption: questionData.data[c].correctoption,
                      questionIndex: c,
                      option1checked: false,
                      option2checked: false,
                      option3checked: false,
                      option4checked: false,
                      score: s
                    });
    } else {
        Alert.alert('Congrats! Your score is: ', s.toString());
    }
  } else {
    Alert.alert(
      'GAME OVER!', 'Your answer is WRONG! \nYour score is: ' + this.state.score.toString()
    );
  }
}

  hi(prop) {
    if (prop === 1) {
      this.setState({
        option1checked: true, option2checked: false, option3checked: false, option4checked: false, userSelect: 'option1'
      });
    } else if (prop === 2) {
      this.setState({
        option1checked: false, option2checked: true, option3checked: false, option4checked: false, userSelect: 'option2'
      });
    } else if (prop === 3) {
      this.setState({
        option1checked: false, option2checked: false, option3checked: true, option4checked: false, userSelect: 'option3'
      });
    } else {
      this.setState({
        option1checked: false, option2checked: false, option3checked: false, option4checked: true, userSelect: 'option4'
      });
    }
    }

  render() {
  const currentOptions = this.state.options;
      /*const options = Object.keys(currentOptions).map(key => {
      return (
        <View key={key} style={{ margin: 3 }}>
        <CircleCheckBox
          checked={this.state.finishAnswer}
          onToggle={() => this.setState({ finishAnswer: !this.state.finishAnswer })}
          label={currentOptions[key]}
        />
        </View>
        //  Buttons onPress={() => this.answerButtonOnPress(key)}

     );
   }
 );*/

    return (
      <View style={styles.containerStyle}>
        <View style={styles.rulesStyle}>
          <Text style={styles.rulesTextStyle}>
            {this.state.question}
          </Text>
          <View style={{ marginTop: 15 }}>
            <CircleCheckBox
              checked={this.state.option1checked}
              onToggle={() => this.hi(1)}
              label={currentOptions.option1}
              outerColor='#c1c1c1'
              innerColor='#c1c1c1'
              styleCheckboxContainer={{ margin: 6 }}
            />
            <CircleCheckBox
              checked={this.state.option2checked}
              onToggle={() => this.hi(2)}
              label={currentOptions.option2}
              outerColor='#c1c1c1'
              innerColor='#c1c1c1'
              styleCheckboxContainer={{ margin: 6 }}
            />
            <CircleCheckBox
              checked={this.state.option3checked}
              onToggle={() => this.hi(3)}
              label={currentOptions.option3}
              outerColor='#c1c1c1'
              innerColor='#c1c1c1'
              styleCheckboxContainer={{ margin: 6 }}
            />
            <CircleCheckBox
              checked={this.state.option4checked}
              onToggle={() => this.hi(4)}
              label={currentOptions.option4}
              outerColor='#c1c1c1'
              innerColor='#c1c1c1'
              styleCheckboxContainer={{ margin: 6 }}
            />
          </View>
        </View>

        <View style={styles.containerStyle2}>
          <TouchableOpacity
            onPress={this.nextButtonOnPress.bind(this)}
            style={styles.buttonStyle}
          >
          <Text style={styles.buttonTextStyle}>
            Next
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  rulesStyle: {
    flex: 2.75,
    paddingTop: 100,
    paddingHorizontal: 25
  },
  rulesTextStyle: {
    fontSize: 18
  },
  buttonStyle: {
    width: 145,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTextStyle: {
    fontSize: 27
  },
  containerStyle: {
    backgroundColor: 'white',
    flex: 4,
    flexDirection: 'column'
  },
  containerStyle2: {
    flex: 1.25,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default QuestionPage;
