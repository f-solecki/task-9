import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions, SafeAreaView, Platform } from 'react-native';


export default function App() {

  const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0]
  const [shape, setShape] = useState('square')
  const [color, setColor] = useState('red')


  const moveToRight = () => {
    Animated.timing(value, {
      toValue: { x: (Dimensions.get('window').width - 100), y: 0 },
      duration: 1000,
      useNativeDriver: false
    }).start(() => moveToDown())
    setShape('square')
    setColor('red')
  }

  const moveToDown = () => {
    Animated.timing(value, {
      toValue: { x: (Dimensions.get('window').width - 100), y: (Dimensions.get('window').height - 100) },
      duration: 1000,
      useNativeDriver: false
    }).start(() => moveToLeft())
    setShape('circle')
    setColor('yellow')
  }

  const moveToLeft = () => {
    Animated.timing(value, {
      toValue: { x: 0, y: (Dimensions.get('window').height - 100) },
      duration: 1000,
      useNativeDriver: false
    }).start(() => moveToUp())
    setShape('square')
    setColor('blue')
  }

  const moveToUp = () => {
    Animated.timing(value, {
      toValue: { x: 0, y: 0 },
      duration: 1000,
      useNativeDriver: false
    }).start(() => moveToRight())
    setShape('circle')
    setColor('green')
  }

  useEffect(() => {
    moveToRight()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={value.getLayout()}>
        <View style={{ width: 100, height: 100, backgroundColor: color, borderRadius: shape === 'circle' ? 100 / 2 : 0 }}></View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 45 : 0
  },
});
