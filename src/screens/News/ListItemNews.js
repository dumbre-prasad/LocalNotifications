import React, {memo, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Text, Card, CardItem, Body} from 'native-base';
import moment from 'moment';
import {BORDER_RADIUS, ACCENT_COLOR} from '../../utils/styles';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ListItemNews = ({visitor}) => {
  const {title, urlToImage, description, publishedAt, source, author} = visitor;
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  return (
    <Card style={styles.card}>
      <CardItem style={styles.cardItem}>
        <Body>
          <Text numberOfLines={3} style={styles.title}>
            {title}
          </Text>
          <View style={styles.imageContainer}>
            <Image
              progressiveRenderingEnabled={true}
              onLoadStart={(e) => {
                setLoading(true);
                setError(false);
              }}
              onLoadEnd={(e) => setLoading(false)}
              onLoad={(e) => setLoading(false)}
              onError={(e) => {
                setLoading(false);
                setError(true);
              }}
              style={styles.image}
              source={
                urlToImage && urlToImage.length != 0 ? {uri: urlToImage} : null
              }
            />
            {isLoading && (
              <ActivityIndicator
                style={{
                  position: 'absolute',
                  top: 100,
                  left: windowWidth / 2 - 60,
                }}
                color={ACCENT_COLOR}
                size="large"></ActivityIndicator>
            )}
            {isError && (
              <Text
                note
                style={{
                  position: 'absolute',
                  top: 100,
                  left: windowWidth / 2 - 120,
                }}>
                Failed to Load Image
              </Text>
            )}
          </View>
          <Text numberOfLines={3} note>
            {description}
          </Text>
          <View style={styles.verticalContainer}>
            <View style={styles.horizontalContainer}>
              <Text note>Source:</Text>
              <Text>{source && source.name}</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Text note>PublishedAt: </Text>
              <Text>{moment(publishedAt).format('DD/mm/yyyy')}</Text>
            </View>
          </View>
          <Text note>
            Author: <Text>{author}</Text>
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default memo(ListItemNews);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: BORDER_RADIUS,
    paddingVertical: 7,
    marginBottom: 20,
  },
  cardItem: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    marginVertical: 10,
    height: 200,
    width: '100%',
    justifyContent: 'center',
  },
  verticalContainer: {
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
  },
  horizontalContainer: {
    flex: 0.5,
  },
});
