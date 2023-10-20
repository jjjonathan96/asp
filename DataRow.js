// DataRow.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';

const DataRow = ({ user, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    date: user.date,
    octopusCount: user.octopusCount,
    prawnCount: user.prawnCount,
    fishCount: user.fishCount,
  });

  useEffect(() => {
    setEditedUser({
      date: user.date,
      octopusCount: user.octopusCount,
      prawnCount: user.prawnCount,
      fishCount: user.fishCount,
    });
  }, [user]);

  const handleEdit = () => {
    setIsEditing(false);
    onEdit(editedUser);
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.cell} onPress={() => setIsEditing(true)}>
        {isEditing ? (
          <DatePicker
            style={{ width: 200 }}
            date={editedUser.date}
            mode="date"
            placeholder="Select Date"
            format="YYYY-MM-DD"
            minDate="2020-01-01"
            maxDate="2030-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => setEditedUser({ ...editedUser, date: new Date(date) })}
          />
        ) : (
          <Text>{user.date.toDateString()}</Text>
        )}
      </TouchableOpacity>
      <View style={styles.verticalLine} />
      <TextInput
        style={styles.cell}
        value={String(editedUser.octopusCount)}
        onChangeText={(text) => setEditedUser({ ...editedUser, octopusCount: Number(text) })}
        keyboardType="numeric"
      />
      <View style={styles.verticalLine} />
      <TextInput
        style={styles.cell}
        value={String(editedUser.prawnCount)}
        onChangeText={(text) => setEditedUser({ ...editedUser, prawnCount: Number(text) })}
        keyboardType="numeric"
      />
      <View style={styles.verticalLine} />
      <TextInput
        style={styles.cell}
        value={String(editedUser.fishCount)}
        onChangeText={(text) => setEditedUser({ ...editedUser, fishCount: Number(text) })}
        keyboardType="numeric"
      />
      <View style={styles.verticalLine} />
      {isEditing && (
        <TouchableOpacity style={styles.editCell} onPress={handleEdit}>
          <Text style={styles.editText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
  },
  editCell: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  editText: {
    color: 'blue',
  },
});

export default DataRow;
