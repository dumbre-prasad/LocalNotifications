import React, {useState, useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import ListItemNews from './ListItemNews';
import moment from 'moment';
import {CONFIG} from '../../utils/config';

const INITIAL_NUM_TO_RENDER = 7;
const NewsListingScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);

  const [newsArray, setNewsArray] = useState([]);
  console.log('newsArray', newsArray.length);
  const renderItem = ({item}) => <ListItemNews visitor={item} />;

  const fetchNews = () => {
    setLoading(true);
    const today = moment().format('yyyy-mm-DD');
    fetch(
      `https://newsapi.org/v2/everything?q=bitcoin&from=${today}&sortBy=publishedAt&apiKey=${CONFIG.NEWS_API_KEY}`,
    )
      .then((response) => response.json())
      .then((json) => {
        // console.log('API', json);
        setNewsArray(json.articles);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <View style={styles.content}>
      <FlatList
        data={newsArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={INITIAL_NUM_TO_RENDER}
        refreshing={isLoading}
        onRefresh={fetchNews}
      />
    </View>
  );
};

export default NewsListingScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
  },
});
