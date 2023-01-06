import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default PaginationSlider = ({ page }) => {

  return (
    <View style={styles.pagination}>
      <View style={page[0] === 0 ? styles.activeDot : styles.dot} />
      <View style={page[0] === 1 ? styles.activeDot : styles.dot} />
      <View style={page[0] === 2 ? styles.activeDot : styles.dot} />
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
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#000',
      marginHorizontal: 5,
    },
});