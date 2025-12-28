import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
  title?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress: (event: GestureResponderEvent) => void;
  color?: string;
  backgroundColor?: string;
}

export default function IconButton({
  title, 
  iconName, 
  onPress, 
  color = '#fff', 
  backgroundColor = '#2196F3',
}: IconButtonProps){
  return (
    <TouchableOpacity
      style = {[styles.button, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {
          iconName && (
            <Ionicons name={iconName} size={24} color={color} style={styles.icon} />
          )
        }
        {
          title && (
            <Text style={[styles.text, { color }]}>
              {title}
            </Text>
          )
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 200,
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});