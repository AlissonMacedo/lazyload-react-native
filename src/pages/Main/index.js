import React, {Component} from 'react';

import {View, FlatList, Image} from 'react-native';

export default class App extends Component {
  state = {
    data: [
      {
        id: 0,
        url: 'https://images.unsplash.com/photo-1467703834117-04386e3dadd8',
        loaded: false,
      },
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1511971523672-53e6411f62b9',
        loaded: false,
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1494522358652-f30e61a60313',
        loaded: false,
      },
    ],
  };

  handleLazyLoad = ({viewableItems}) => {
    const newData = this.state.data.map(image =>
      viewableItems.find(({item}) => item.id === image.id)
        ? {...image, loaded: true}
        : image,
    );

    this.setState({data: newData});
  };

  renderItem = ({item}) => (
    <View style={{marginVertical: 20, height: 300, backgroundColor: '#EEE'}}>
      {item.loaded && (
        <Image source={{uri: item.url}} style={{width: '100%', height: 300}} />
      )}
    </View>
  );

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        onViewableItemsChanged={this.handleLazyLoad}
      />
    );
  }
}
