import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { black, white, mainBackgroundColor, mainTextColor } from '../utils/colors';

import { createDeck, getDecks } from '../utils/api';
import { addDeck } from '../actions';

import Button from './Button';

class NewDeck extends Component {
  static navigationOptions = {
    title: 'Add Deck',
  };

  state = {
    title: '',
    nameError:''
  }

  submitDeckTitle = () => {
    const deckTitle = this.state.title;
    if (deckTitle.trim() === "") {
              this.setState(() => ({ nameError: "title required." }));
              return;
    }
    createDeck(deckTitle)

    this.props.dispatch(addDeck({
      [deckTitle]: {
        title: deckTitle,
        cards: []
      }
    }))

    this.props.navigation.dispatch(NavigationActions.reset(
      {
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName: 'Deck', params: { title: deckTitle } })
        ]
      }));
  }

  render() {
    return (
      <View style={styles.form}>
        <Text style={styles.textInstructions}>
          What would you like to call your deck?
        </Text>
        <TextInput
          style={styles.textInput}
          value={this.state.title}
          onChangeText={(title) => this.setState({title})}
        />
        {!!this.state.nameError && (
         <Text style={{ color: "red" }}>{this.state.nameError}</Text>
       )}
        <Button
          onPress={this.submitDeckTitle}
          text={'Create Deck'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: mainBackgroundColor
  },
  textInstructions: {
    width: 200,
    fontSize: 20
  },
  textInput: {
    width: 200,
    height: 40,
    marginTop: 20,
    borderColor: black,
    borderWidth: 1,
    borderRadius:4,
    color: mainTextColor,
    backgroundColor: white
  }
})

export default connect()(NewDeck);
