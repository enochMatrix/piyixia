import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
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

  static navigationOptions = {
          swipeEnabled: false
  }

  state = {
    data: [],
    question: '',
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
    //console.log(this.props);
    fetch('http://127.0.0.1:3000/get/quiz')
      .then((response) => (response.json()))
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
          console.log(res[0]);
          shuffle(res);
          this.setState({ data: res,
                          question: res[0].description,
                          options: res[0].options[0],
                          correctoption: res[0].correct,
                          questionIndex: 0,
                          score: 0
                        });
  });
  }

  nextButtononPressIn() {
    if (this.state.userSelect === this.state.correctoption) {
      const c = this.state.questionIndex + 1;
      const s = this.state.score + 1;
      if (this.state.questionIndex < NUMBER_OF_QUESTIONS - 1) {
        this.setState({ question: this.state.data[c].description,
                      options: this.state.data[c].options[0],
                      correctoption: this.state.data[c].correct,
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
      console.log('1');
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
    console.log('renderQuestionPage');
  const currentOptions = this.state.options;
 //      const options = Object.keys(currentOptions).map(key => {
 //      return (
 //        <View key={key} style={{ margin: 3 }}>
 //        <Toucha
 //          checked={this.state.finishAnswer}
 //          onToggle={() => this.setState({ finishAnswer: !this.state.finishAnswer })}
 //          label={currentOptions[key]}
 //        />
 //        </View>
 //          Buttons onPressIn={() => this.answerButtononPressIn(key)}
 //
 //     );
 //   }
 // );*/

    return (
      <View style={styles.containerStyle}>
        <View style={styles.rulesStyle}>
          <Text style={styles.rulesTextStyle}>
            {this.state.question}
          </Text>
          <View style={{ marginTop: 15 }}>
            <TouchableOpacity
              style={this.state.option1checked? styles.answerButtononPress : styles.answerButtonStyle}
              onPress={() => this.hi(1)}
            >
              <Text>{currentOptions.option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={this.state.option2checked? styles.answerButtononPress : styles.answerButtonStyle}
              onPress={() => this.hi(2)}
            >
              <Text>{currentOptions.option2}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={this.state.option3checked? styles.answerButtononPress : styles.answerButtonStyle}
              onPress={() => this.hi(3)}
            >
              <Text>{currentOptions.option3}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={this.state.option4checked? styles.answerButtononPress : styles.answerButtonStyle}
              onPress={() => this.hi(4)}
            >
              <Text>{currentOptions.option4}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerStyle2}>
          <TouchableOpacity
            onPressIn={this.nextButtononPressIn.bind(this)}
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
  },
  answerButtonStyle: {
    borderStyle:'dashed',
    borderWidth:0.5,
    borderColor:'black',
    height: '18%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2
  },
  answerButtononPress: {
    borderStyle:'dashed',
    borderWidth:0.5,
    borderColor:'gray',
    borderRadius: 12,
    height: '18%',
    backgroundColor:'#ffeff5',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2
  }
};

export default QuestionPage;
