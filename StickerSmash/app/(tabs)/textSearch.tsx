import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
// import TextSearch from '../../components/textSearch';

export default function TextSearchScreen() {
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text>製作中</Text>
      </View>
    </ScrollView>
  ); 
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fdf3dcff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fdf3dcff',
  },
}) 