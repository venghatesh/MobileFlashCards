import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY } from './api';
import { addDecks } from '../actions';

export const initialDecksData = {
  Capitals: {
    title: 'Capitals',
    cards: [
      {
        frontText: 'What is Capital of Australia?',
        backText: 'Canberra'
      },
      {
        frontText: 'What is Capital of Switzerland',
        backText: 'Zurich'
      }
    ]
  },
  Inventions: {
    title: 'Inventions',
    cards: [
      {
        frontText: 'Who invented Steam Engine',
        backText: 'James Watt'
      }
    ]
  },
};

export function setInitialDecks () {
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(res => {
    if (!res) {
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(initialDecksData));
    }
  })
}
