import React, { Component } from 'react';
import { Buttons, CenterContainer, Section } from './common';
import ScoreBoard from './ScoreBoard';

class StartPage extends Component {
  static navigationOptions = {
    title: 'hilo',
  }
  onPressButton() {
    console.log('ther');
    this.props.navigation.navigate('questionpage');
  }
  render() {
    return (
      <CenterContainer>
        <Section>
        <Buttons onPress={this.onPressButton.bind(this)}>
          Start
        </Buttons>
       </Section>

       <Section>
        <ScoreBoard />
       </Section>
     </CenterContainer>
    );
  }
}

export default StartPage;
