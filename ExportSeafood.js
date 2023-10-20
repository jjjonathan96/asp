// ExportSeafood.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';

const ExportSeafood = ({ availableSeafood, onExport }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [octopusCount, setOctopusCount] = useState('0');
  const [prawnCount, setPrawnCount] = useState('0');
  const [fishCount, setFishCount] = useState('0');

  const handleExport = () => {
    const exportData = {
      date: selectedDate,
      octopusCount: parseInt(octopusCount, 10),
      prawnCount: parseInt(prawnCount, 10),
      fishCount: parseInt(fishCount, 10),
    };

    onExport(exportData);
  };

  return (
    <View>
      <Text>Select Date:</Text>
      <DatePicker
        style={{ width: 200 }}
        date={selectedDate}
        mode="date"
        placeholder="Select Date"
        format="YYYY-MM-DD"
        minDate="2020-01-01"
        maxDate="2030-12-31"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => setSelectedDate(new Date(date))}
      />
      <Text>Available Seafood:</Text>
      <Text>Octopus: {availableSeafood.octopusCount}</Text>
      <Text>Prawn: {availableSeafood.prawnCount}</Text>
      <Text>Fish: {availableSeafood.fishCount}</Text>
      <Text>Export Seafood:</Text>
      <TextInput
        placeholder="Octopus Count"
        value={octopusCount}
        onChangeText={(text) => setOctopusCount(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Prawn Count"
        value={prawnCount}
        onChangeText={(text) => setPrawnCount(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Fish Count"
        value={fishCount}
        onChangeText={(text) => setFishCount(text)}
        keyboardType="numeric"
      />
      <Button title="Export Seafood" onPress={handleExport} />
    </View>
  );
};

export default ExportSeafood;
