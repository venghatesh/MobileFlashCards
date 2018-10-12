import React, { Component } from 'react';
import { StyleSheet, TextInput, View,Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { createCard } from '../utils/api';
import { addCard } from '../actions';

import { white, black, mainBackgroundColor, mainTextColor } from '../utils/colors';

import Button from './Button';

class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'New Question'
    };
  }

  state = {
    //title : '',
    frontText: '',
    backText: '',
    nameQuestionError : '',
    nameAnswerError : ''
  }

  submitCard = () => {
     const { title} = this.props.navigation.state.params;
     const{frontText,backText} = this.state
    console.log(frontText);
    console.log(backText);

    if (frontText.trim() === "") {
              this.setState(() => ({ nameQuestionError: "Question Field cannot be blank." }));
              return;
    }

    if (backText.trim() === "") {
              this.setState(() => ({ nameAnswerError: "Answer Field Cannot be blank." }));
              return;
    }

    createCard(title, this.state)
    console.log(title)
    this.props.dispatch(addCard(title, this.state))
    this.props.navigation.dispatch(NavigationActions.reset(
      {
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ]
      }));

  }

  render() {
    return (
      <View style={styles.form}>
        <TextInput
          multiline = {true}
          style={styles.textInput}
          value={this.state.frontText}
          placeholder={'Enter your question'}
          onChangeText={(frontText) => this.setState({frontText: frontText})}
        />
        {!!this.state.nameQuestionError && (
         <Text style={{ color: "red" }}>{this.state.nameQuestionError}</Text>
       )}
        <TextInput
          multiline = {true}
          style={styles.textInput}
          value={this.state.backText}
          placeholder={'And your answer'}
          onChangeText={(backText) => this.setState({backText})}
        />
        {!!this.state.nameAnswerError && (
         <Text style={{ color: "red" }}>{this.state.nameAnswerError}</Text>
       )}
        <Button
          onPress={this.submitCard}
          text={'Add Card'}
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: mainBackgroundColor
  },
  textInput: {
    width: 260,
    height: 60,
    marginTop: 20,
    borderColor: black,
    borderWidth: 1,
    borderRadius:4,
    fontSize: 16,
    color: mainTextColor,
    backgroundColor: white
  }
});


export default connect()(NewCard);
