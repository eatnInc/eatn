import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import api from './eatn-api';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      eatns: [{name: 'fart'}, {name: 'shit'}]
    };
    this._setEatns = this._setEatns.bind(this);
  }

  _setEatns() {
    console.log('happy days', api.eatns)
    // // console.log('fetch', fetch('http://www.google.com', {mode: 'cors'}))
    return fetch('https://[2601:281:8000:caa0:8817:f610:abcf:9c69]:2403/eatns')
      .then(console.log)
      .catch(console.error)
    //   .then((eatns) => {
    //     console.log('happy stays');
    //     this.setState((prevs) => ({eatns: eatns.concat(prevs)}));
    //   })
    //   .then((e) => console.log('what is happening', e))
    //   .catch((e) => console.error(e.request));
  }

  componentDidMount() {
    this._setEatns();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Basic client starter kit for Eatn.</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text> {this.state.eatns.map((e) => e.name)} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
