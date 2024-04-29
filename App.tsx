// App.tsx

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
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
import AddItem from './src/Components/AddItem/AddItem';
import ListItem from './src/Components/ListItems/ListItems';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ShoppingListItem = {
  item: string;
  quantity: number;
  id: string;
}

const STORAGE_KEY = '@shopping_list';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const loadShoppingListFromStorage = async () => {
      try {
        const stringifiedShoppingList = await AsyncStorage.getItem(STORAGE_KEY);
        if (stringifiedShoppingList) {
          setShoppingList(JSON.parse(stringifiedShoppingList));
        }
      } catch (e) {
        console.error("Failed to load the shopping list", e);
      }
    };

    loadShoppingListFromStorage();
  }, []);

  useEffect(() => {
    const saveShoppingListToStorage = async () => {
      try {
        const stringifiedShoppingList = JSON.stringify(shoppingList);
        await AsyncStorage.setItem(STORAGE_KEY, stringifiedShoppingList);
      } catch (e) {
        console.error("Failed to save the shopping list", e);
      }
    };

    if (shoppingList.length > 0) {
      saveShoppingListToStorage();
    }
  }, [shoppingList]);

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

      <View style={styles.addItemContainer}>
        {/* <Text>Add Item</Text> */}
        <AddItem
          shoppingList={shoppingList}
          setShoppingList={setShoppingList}
          mainStyles={styles.addItemComponent}
        >
        </AddItem>
      </View>

      <View style={styles.listItemsContainer}>
        {/* <Text>List items</Text> */}
        <ListItem
          shoppingList={shoppingList}
          setShoppingList={setShoppingList}
        >
        </ListItem>
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
    borderWidth: 0.5,
    //borderColor: 'red',
  },
  addItemContainer: {
    flex: 5,
    borderWidth: 0.5,
    // borderColor: 'red',
  },
  listItemsContainer: {
    flex: 5,
    borderWidth: 0.5,
    // borderColor: 'red',
  },
  footerContainer: {
    flex: 1,
    borderWidth: 0.5,
    // borderColor: 'red',
  },
  headerComponent: {
    backgroundColor: 'lightyellow'
  },
  footerComponent: {
    backgroundColor: 'lightyellow'
  },
  addItemComponent: {
    // backgroundColor: 'lightyellow'
  },
});

export default App;
