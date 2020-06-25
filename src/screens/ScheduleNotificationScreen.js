import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import _TimePicker from '../components/_TimePicker';
import _DatePicker from '../components/_DatePicker';
import {getArrayOfDates} from '../utils/helper';
import {Button, Text} from 'native-base';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

var PushNotification = require('react-native-push-notification');
const ScheduleNotificationScreen = () => {
  const [slot1, setSlot1] = useState(undefined);
  const [slot2, setSlot2] = useState(undefined);
  const [slot3, setSlot3] = useState(undefined);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [latLng, setLatLng] = useState('Getting Location');
  const [isScheduled, setIsScheduled] = useState(false);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          console.warn('Location permission denied');
        }
      } else {
        Geolocation.requestAuthorization();
        getLocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          setLatLng(
            `Location -> Lat:${position.coords.latitude} Lng:${position.coords.longitude}`,
          );
        }
      },
      (error) => {
        console.warn('getLocation ERROR', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 0},
    );
  };

  const isValid = () => {
    if (!startDate) {
      alert('Please select start date');
      return false;
    }
    if (!endDate) {
      alert('Please select end date');
      return false;
    }
    if (!(slot1 || slot2 || slot3)) {
      alert('Please at least 1 time slot');
      return false;
    }
    return true;
  };

  const getScheduleDates = () => {
    if (isValid()) {
      setIsScheduled(true);
      const dates = getArrayOfDates(startDate, endDate);
      let scheduleDates = [];
      dates.map((date) => {
        if (slot1) {
          let s1 = slot1;
          s1.setDate(date.getDate());
          scheduleDates.push(new Date(s1));
        }

        if (slot2) {
          let s2 = slot2;
          s2.setDate(date.getDate());
          scheduleDates.push(new Date(s2));
        }

        if (slot3) {
          let s3 = slot3;
          s3.setDate(date.getDate());
          scheduleDates.push(new Date(s3));
        }
      });
      scheduleLocalNOtifications(scheduleDates);
    }
  };

  const scheduleLocalNOtifications = (dates) => {
    PushNotification.cancelAllLocalNotifications();
    dates.map((date) => {
      PushNotification.localNotificationSchedule({
        message: latLng,
        date: date,
        // ongoing: true,
        // group: 'group',
        ignoreInForeground: false,
        // repeatType: 'time',
        // repeatTime: 1000,
        vibrate: true,
        playSound: true,
        // soundName: 'none',
      });
    });
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.content}>
      <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>{latLng}</Text>
      <_DatePicker
        style={styles.textInput}
        date={startDate}
        placeholder="Start Date"
        onSelect={(date) => {
          setStartDate(date);
        }}
      />
      <_DatePicker
        style={styles.textInput}
        date={endDate}
        placeholder="End Date"
        onSelect={(date) => {
          setEndDate(date);
        }}
      />

      <_TimePicker
        style={styles.textInput}
        time={slot1}
        placeholder="Time Slot 1"
        onSelect={(time) => {
          setSlot1(time);
        }}
      />

      <_TimePicker
        style={styles.textInput}
        time={slot2}
        placeholder="Time Slot 2"
        onSelect={(time) => {
          setSlot2(time);
        }}
      />

      <_TimePicker
        style={styles.textInput}
        time={slot3}
        placeholder="Time Slot 3"
        onSelect={(time) => {
          setSlot3(time);
        }}
      />

      {!isScheduled && (
        <Button
          onPress={getScheduleDates}
          style={[styles.button, {backgroundColor: 'green'}]}>
          <Text>Schedule Notifications</Text>
        </Button>
      )}
      {isScheduled && (
        <Text style={{alignSelf: 'center', fontWeight: 'bold', marginTop: 30}}>
          Notifications Scheduled
        </Text>
      )}

      <Button
        onPress={() => {
          PushNotification.cancelAllLocalNotifications();
          setStartDate(undefined);
          setEndDate(undefined);
          setSlot1(undefined);
          setSlot2(undefined);
          setSlot3(undefined);
          setIsScheduled(false);
        }}
        style={[styles.button, {backgroundColor: 'darkred'}]}>
        <Text>Clear Scheduled Notifications</Text>
      </Button>
    </View>
  );
};

export default ScheduleNotificationScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
  },
  button: {
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 0,
  },
});
