import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Card, CardItem} from 'native-base';
import {BORDER_RADIUS} from '../../../utils/styles';
import moment from 'moment';

const ListItemVisitor = ({visitor}) => {
  const {
    name,
    email,
    typeOfVisit,
    personToVisit,
    dayOfVisit,
    timeOfEntry,
    timeOfExit,
  } = visitor;
  return (
    <Card style={styles.card}>
      <CardItem style={styles.cardItem}>
        <View style={styles.verticalContainer}>
          <Text note>
            Visitor: <Text>{name}</Text>
          </Text>
          <Text note>
            Email: <Text>{email}</Text>
          </Text>
          <Text note>
            Type of Visit: <Text>{typeOfVisit}</Text>
          </Text>
        </View>
        <View style={styles.verticalContainer}>
          <Text note>
            To Visit: <Text>{personToVisit}</Text>
          </Text>
          <Text note>
            Date: <Text>{moment(dayOfVisit).format('DD/mm/yyyy')}</Text>
          </Text>
          <View style={styles.horizontalContainer}>
            <Text note>
              Entry:{' '}
              <Text style={styles.time}>
                {moment(timeOfEntry).format('LT')}
              </Text>
            </Text>
            <Text note>
              Exit:{' '}
              <Text style={styles.time}>{moment(timeOfExit).format('LT')}</Text>
            </Text>
          </View>
        </View>
      </CardItem>
    </Card>
  );
};

export default memo(ListItemVisitor);

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS,
    paddingVertical: 7,
  },
  cardItem: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  time: {
    fontSize: 12,
  },
  verticalContainer: {
    flex: 0.5,
    justifyContent: 'space-between',
    height: 80,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
