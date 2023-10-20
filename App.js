// App.js
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert } from 'react-native';
import DataRow from './DataRow';
import ExportSeafood from './ExportSeafood';
import DatePicker from 'react-native-datepicker';

const App = () => {
  const [data, setData] = useState([
    { id: '1', date: new Date(2023, 9, 18), octopusCount: 2, prawnCount: 5, fishCount: 8 },
    { id: '2', date: new Date(2023, 9, 19), octopusCount: 1, prawnCount: 3, fishCount: 6 },
    // Add more data as needed
  ]);

  const [newUser, setNewUser] = useState({
    date: new Date(),
    octopusCount: 0,
    prawnCount: 0,
    fishCount: 0,
  });

  const [exportSeafoodVisible, setExportSeafoodVisible] = useState(false);

  const handleAddUser = () => {
    const existingIndex = data.findIndex((item) => item.date.toDateString() === newUser.date.toDateString());

    if (existingIndex !== -1) {
      // If date already exists, show confirmation prompt
      Alert.alert(
        'Date Already Exists',
        'Do you want to add or subtract counts?',
        [
          { text: 'Add', onPress: () => handleAddition(existingIndex) },
          { text: 'Subtract', onPress: () => handleSubtraction(existingIndex) },
        ],
        { cancelable: false }
      );
    } else {
      // If date doesn't exist, add a new entry
      setData((prevData) => [...prevData, { id: String(prevData.length + 1), ...newUser }]);
    }

    setNewUser({
      date: new Date(),
      octopusCount: 0,
      prawnCount: 0,
      fishCount: 0,
    });
  };

  const handleAddition = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        octopusCount: newData[index].octopusCount + newUser.octopusCount,
        prawnCount: newData[index].prawnCount + newUser.prawnCount,
        fishCount: newData[index].fishCount + newUser.fishCount,
      };
      return newData;
    });
  };

  const handleSubtraction = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        octopusCount: newData[index].octopusCount - newUser.octopusCount,
        prawnCount: newData[index].prawnCount - newUser.prawnCount,
        fishCount: newData[index].fishCount - newUser.fishCount,
      };
      return newData;
    });
  };

  const handleExportSeafood = (exportData) => {
    // Handle the logic to export seafood based on the exportData
    console.log('Exporting Seafood:', exportData);
    // You might want to update the available counts here
    // and update the data array accordingly
  };

  return (
    <View style={{ flex: 1, padding: 16, marginTop: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text>Date</Text>
        <Text>Octopus</Text>
        <Text>Prawn</Text>
        <Text>Fish</Text>
        <Text>Edit</Text>

      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <DataRow user={item} onEdit={(editedUser) => handleAddUser(index, editedUser)} />
        )}
      />
      <View style={{ marginTop: 20 }}>
        <Text>Add User:</Text>
        <DatePicker
          style={{ width: 200 }}
          date={newUser.date}
          mode="date"
          placeholder="Select Date"
          format="YYYY-MM-DD"
          minDate="2020-01-01"
          maxDate="2030-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => setNewUser({ ...newUser, date: new Date(date) })}
        />
        <TextInput
          placeholder="Octopus Count"
          value={String(newUser.octopusCount)}
          onChangeText={(text) => setNewUser({ ...newUser, octopusCount: Number(text) })}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Prawn Count"
          value={String(newUser.prawnCount)}
          onChangeText={(text) => setNewUser({ ...newUser, prawnCount: Number(text) })}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Fish Count"
          value={String(newUser.fishCount)}
          onChangeText={(text) => setNewUser({ ...newUser, fishCount: Number(text) })}
          keyboardType="numeric"
        />
        <Button title="Add User" onPress={handleAddUser} />
        <Button title="Export Seafood" onPress={() => setExportSeafoodVisible(true)} />
          {exportSeafoodVisible && (
        <ExportSeafood availableSeafood={0} onExport={handleExportSeafood} />
      )}
      </View>
    </View>
  );
};

export default App;