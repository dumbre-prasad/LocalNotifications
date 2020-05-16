import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Fab, Icon} from 'native-base';
import {ACCENT_COLOR} from '../../utils/styles';
import {VISITOR_CREATE_SCREEN} from '../../navigation/navConstants';

const VisitorListingScreen = ({navigation}) => (
  <View style={{flex: 1}}>
    <Fab
      active={false}
      direction="up"
      containerStyle={{}}
      style={{backgroundColor: ACCENT_COLOR}}
      position="bottomRight"
      onPress={() => navigation.navigate(VISITOR_CREATE_SCREEN)}>
      <Icon name="add" />
    </Fab>
  </View>
);

export default VisitorListingScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: '5%',
  },
});
