import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { addDecks } from '../actions';

import { listItemColorA, listItemColorB, listItemColorC } from '../utils/colors';

import DeckListItem from './DeckListItem';
import shallowCompare from 'react-addons-shallow-compare';

/* To check whether two objects are same
   used to compare whether previous state and current state are different.
   In case if they are different, then re-render the component.
*/

deepEqual= (a,b)=> {
  if( (typeof a == 'object' && a != null) &&
      (typeof b == 'object' && b != null) )
  {
     var count = [0,0];
     for( var key in a) count[0]++;
     for( var key in b) count[1]++;
     if( count[0]-count[1] != 0) {return false;}
     for( var key in a)
     {
       if(!(key in b) || !deepEqual(a[key],b[key])) {return false;}
     }
     for( var key in b)
     {
       if(!(key in a) || !deepEqual(b[key],a[key])) {return false;}
     }
     return true;
  }
  else
  {
     return a === b;
  }
}

class DeckList extends Component {
  componentDidMount() {
    getDecks()
      .then((decks) => {
        this.props.dispatch(addDecks(decks))
      })
  }
/* This is to see whether we need to re-render */

  shouldComponentUpdate(nextProps, nextState) {
  //Due to some reason the shallowcompare provided by React does not seem to work . May be due to shallow comparison.
  //Written a generic function to compare whether there are any addition of cards by looking at the next props and current
  //Props.
  //  const b = shallowCompare(this,nextProps,nextState)
    const isDifferent =   !deepEqual(nextProps,this.props)

    if (isDifferent){
      //get the decks. This will automatically trigger the render method.
      getDecks()
        .then((decks) => {
          this.props.dispatch(addDecks(decks))
        })
    }
    return isDifferent;

   }

    render() {
    const deckItemColors = [listItemColorA, listItemColorB, listItemColorC];

    const decks = this.props.decks;

    return (
      <ScrollView>
        {decks.map((deck, i) => (
          <DeckListItem
            title={deck.title}
            amountOfCards={deck.cards.length}
            key={deck.title}
            navigation={this.props.navigation}
            backgroundColor={deckItemColors[i % 3]}
          />
        ))}
      </ScrollView>
    );
  }
}

function mapStateToProps (state) {

  const deckKeys = Object.keys(state.decks);
  const decks = deckKeys.map(key => state.decks[key]);

  return {
    decks: decks
  };
}

export default connect(mapStateToProps)(DeckList);
