import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
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

const VisitorCreateScreen = ({navigation}) => {
  const initialData = {dateOfEntry: new Date()};
  const [visitor, setVisitor] = useState(initialData);

  const saveVisitor = async () => {
    await addVisitor({visitor});
    navigation.navigate(VISITOR_LISTING_SCREEN);
  };

  const resetState = () => {
    setVisitor(initialData);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      resetState();
    });
    return unsubscribe;
  }, [navigation]);

  const {
    name,
    email,
    typeOfVisit,
    personToVisit,
    timeOfEntry,
    timeOfExit,
  } = visitor;

  console.warn('timeOfEntry', timeOfEntry);

  return (
    <Content contentContainerStyle={styles.content}>
      <Form style={styles.form}>
        <Item floatingLabel style={styles.textInput}>
          <Label>Name</Label>
          <Input
            value={name}
            onChangeText={(name) => setVisitor({...visitor, name})}
          />
        </Item>
        <Item floatingLabel style={styles.textInput}>
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
        <Item floatingLabel style={styles.textInput}>
          <Label>Person to visit</Label>
          <Input
            value={personToVisit}
            onChangeText={(personToVisit) =>
              setVisitor({...visitor, personToVisit})
            }
          />
        </Item>
        <Item floatingLabel style={styles.textInput}>
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
    </Content>
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
    marginBottom: 13,
  },
  picker: {
    marginHorizontal: 14,
    marginTop: 10,
    marginBottom: -13,
  },
  button: {
    justifyContent: 'center',
    marginTop: 13,
    marginHorizontal: 15,
    borderRadius: 10,
  },
});
