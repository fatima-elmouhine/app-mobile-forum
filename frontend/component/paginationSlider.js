import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default PaginationSlider = (/*{ page }*/) => {
  return (
    <View style={styles.pagination}>
      <View style={[styles.dot/*, page === 0 && styles.activeDot*/]} />
      <View style={[styles.dot/*, page === 1 && styles.activeDot*/]} />
      <View style={[styles.dot/*, page === 2 && styles.activeDot*/]} />
    </View>
  );
};

const styles = StyleSheet.create({
    pagination: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#888',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#000',
    },
});