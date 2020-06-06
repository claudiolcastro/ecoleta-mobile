import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';

const Home = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.home}>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  home: {
  },
});

export default Home;
