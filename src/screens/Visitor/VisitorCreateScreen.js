import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Content,
  Form,
  Item,
  Label,
  Input,
  Picker,
  Icon,
  Text,
  Button,
} from 'native-base';
import _TimePicker from '../../components/_TimePicker';
import {WHITE} from '../../utils/colors';
import {addVisitor} from '../../database/VisitorDbHelper';
import {VISITOR_LISTING_SCREEN} from '../../navigation/navConstants';
import {ACCENT_COLOR} from '../../utils/styles';

const VisitorCreateScreen = ({navigation}) => {
  const initialData = {dateOfEntry: new Date(), typeOfVisit: 'Meeting'};
  const [visitor, setVisitor] = useState(initialData);
  const {
    name,
    email,
    typeOfVisit,
    personToVisit,
    timeOfEntry,
    timeOfExit,
  } = visitor;
  const saveVisitor = async () => {
    if (isValid()) {
      await addVisitor({visitor});
      navigation.navigate(VISITOR_LISTING_SCREEN);
    } else {
      alert('Please fill up all details');
    }
  };

  const resetState = () => {
    setVisitor(initialData);
  };

  const isValid = () => {
    return (
      name && email && typeOfVisit && personToVisit && timeOfEntry && timeOfExit
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      resetState();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.content}>
      <Form style={styles.form}>
        <Item stackedLabel style={styles.textInput}>
          <Label>Name</Label>
          <Input
            value={name}
            onChangeText={(name) => setVisitor({...visitor, name})}
          />
        </Item>
        <Item stackedLabel style={styles.textInput}>
          <Label>Email</Label>
          <Input
            value={email}
            onChangeText={(email) => setVisitor({...visitor, email})}
            keyboardType="email-address"
          />
        </Item>
        <View style={styles.picker}>
          <Text note>Type of visit</Text>
          <Picker
            mode="dialog"
            iosHeader="Select Type of Visit "
            rr
            iosIcon={<Icon name="arrow-down" />}
            style={{marginTop: -12}}
            selectedValue={typeOfVisit}
            onValueChange={(typeOfVisit) =>
              setVisitor({...visitor, typeOfVisit})
            }>
            <Picker.Item label="Meeting" value="Meeting" />
            <Picker.Item label="Delivery" value="Delivery" />
            <Picker.Item label="Personal" value="Personal" />
          </Picker>
        </View>
        <Item stackedLabel style={styles.textInput}>
          <Label>Person to visit</Label>
          <Input
            value={personToVisit}
            onChangeText={(personToVisit) =>
              setVisitor({...visitor, personToVisit})
            }
          />
        </Item>
        <Item stackedLabel style={styles.textInput}>
          <Label>Date of entry</Label>
          <Input disabled value={new Date().toLocaleDateString()} />
        </Item>
        <_TimePicker
          style={styles.textInput}
          time={timeOfEntry}
          placeholder="Time of entry"
          onSelect={(timeOfEntry) => setVisitor({...visitor, timeOfEntry})}
        />
        <_TimePicker
          style={styles.textInput}
          time={timeOfExit}
          placeholder="Time of exit"
          onSelect={(timeOfExit) => setVisitor({...visitor, timeOfExit})}
        />
      </Form>
      <Button onPress={saveVisitor} style={styles.button}>
        <Text>Save Details</Text>
      </Button>
    </ScrollView>
  );
};

export default VisitorCreateScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: WHITE,
  },
  form: {
    paddingRight: 12,
  },
  textInput: {
    marginBottom: 5,
  },
  picker: {
    marginHorizontal: 14,
    marginTop: 10,
    marginBottom: -13,
  },
  button: {
    backgroundColor: ACCENT_COLOR,
    justifyContent: 'center',
    marginTop: 13,
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
});
