/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Header from './src/Components/Header/Header';
import Footer from './src/Components/Footer/Footer';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[styles.mainContainer, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View style={styles.headerContainer}>
        {/* <Text>Header</Text> */}
        <Header title ="Shopping List App" mainStyles={styles.headerComponent}></Header>
      </View>

      <View style={styles.addItemsContainer}>
        <Text>Add Item</Text>
      </View>

      <View style={styles.listItemsContainer}>
        <Text>List items</Text>
      </View>

      <View style={styles.footerContainer}>
        {/* <Text>Footer</Text> */}
        <Footer title='(c) Lab/TVT 2024' mainStyles={styles.footerComponent}></Footer>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  headerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
  addItemsContainer: {
    flex: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
  listItemsContainer: {
    flex: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
  footerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
  headerComponent: {
    backgroundColor: 'lightyellow'
  },
  footerComponent: {
    backgroundColor: 'lightyellow'
  },
});

export default App;
