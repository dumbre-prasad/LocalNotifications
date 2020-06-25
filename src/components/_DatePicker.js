import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Text} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const _DatePicker = ({placeholder, date, onSelect, style}) => {
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    onSelect(currentDate);
  };
  return (
    <View style={{marginLeft: 5}}>
      <TouchableWithoutFeedback
        style={[{marginHorizontal: 12, marginTop: 18}, style]}
        onPress={() => setShow(true)}>
        <Text note>{placeholder}</Text>
        <View pointerEvents="none">
          <TextInput
            disabled
            style={{
              height: 40,
              borderColor: 'lightgray',
              borderBottomWidth: 1,
              marginTop: -5,
              fontSize: 16,
            }}
            value={date && moment(date).format('DD/MM/yyyy')}
          />
        </View>
      </TouchableWithoutFeedback>

      {show && (
        <DateTimePicker
          disabled={true}
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          mode="date"
          value={new Date()}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default _DatePicker;
