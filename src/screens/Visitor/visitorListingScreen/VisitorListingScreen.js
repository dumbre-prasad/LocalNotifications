import React, {useCallback, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {Fab, Icon, Text} from 'native-base';
import {ACCENT_COLOR} from '../../../utils/styles';
import {VISITOR_CREATE_SCREEN} from '../../../navigation/navConstants';
import {useFocusEffect} from '@react-navigation/native';
import realm from '../../../database/realm';
import {VISITORS_TABLE} from '../../../database/tableConstants';
import ListItemVisitor from './ListItemVisitor';
const INITIAL_NUM_TO_RENDER = 7;
const VisitorListingScreen = ({navigation}) => {
  const listRef = React.useRef(null);

  const [visitorsArray, setVisitorsArray] = useState([]);
  useFocusEffect(
    useCallback(() => {
      if (visitorsArray.length > 0) {
        listRef.current.scrollToIndex({animated: true, index: 0});
      }
      const _visitorsArray = Array.from(
        realm.objects(VISITORS_TABLE).sorted('dateOfEntry', true),
      );
      setVisitorsArray([..._visitorsArray]);
    }, []),
  );
  console.log('VISITORS_ARRAY', visitorsArray.length);
  const renderItem = ({item}) => <ListItemVisitor visitor={item} />;
  return (
    <View style={styles.content}>
      <FlatList
        ref={listRef}
        data={visitorsArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={INITIAL_NUM_TO_RENDER}
      />
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
};

export default VisitorListingScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
  },
});
