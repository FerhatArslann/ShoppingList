// App.tsx

/**
 * Tämä on React Native -sovellus, joka käyttää AsyncStoragea ostoslistan tallentamiseen.
 * Sovellus näyttää ostoslistan, jonka käyttäjä voi täyttää, ja se säilyttää tiedot laitteen muistissa.
 * Sovellus sisältää peruskomponentit: Header, Footer, AddItem ja ListItem.
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from './src/Components/Header/Header';
import Footer from './src/Components/Footer/Footer';
import AddItem from './src/Components/AddItem/AddItem';
import ListItem from './src/Components/ListItems/ListItems';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Määritellään tyyppi ostoslistan alkioille
export type ShoppingListItem = {
  item: string;      // Tuotteen nimi
  quantity: number;  // Määrä
  id: string;        // Yksilöivä tunniste
}

const STORAGE_KEY = '@shopping_list';  // Avain, jolla lista tallennetaan laitteeseen

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';  // Tarkista, onko laitteessa tumma tila käytössä
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);  // Ostoslistan tila

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,  // Taustaväri riippuen tilasta
  };

  // Lataa ostoslista laitteen muistista kun sovellus käynnistyy
  useEffect(() => {
    const loadShoppingListFromStorage = async () => {
      try {
        const stringifiedShoppingList = await AsyncStorage.getItem(STORAGE_KEY);
        if (stringifiedShoppingList) {
          setShoppingList(JSON.parse(stringifiedShoppingList));  // Muunna JSON-muotoon ja päivitä tila
        }
      } catch (e) {
        console.error("Failed to load the shopping list", e);
      }
    };

    loadShoppingListFromStorage();
  }, []);

  // Tallenna ostoslista laitteeseen aina kun lista muuttuu
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

  // Tulostaa ostoslistan konsoliin aina kun se päivittyy
  console.log(`ShoppingList ${JSON.stringify(shoppingList)}`)

  return (
    <SafeAreaView style={[styles.mainContainer, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                 backgroundColor={backgroundStyle.backgroundColor} />

      <Header title="Shopping List App" mainStyles={styles.headerComponent} />
      <AddItem shoppingList={shoppingList} setShoppingList={setShoppingList}
               mainStyles={styles.addItemComponent} />
      <ListItem shoppingList={shoppingList} setShoppingList={setShoppingList} />
      <Footer title='(c) Lab/TVT 2024' mainStyles={styles.footerComponent} />
    </SafeAreaView>
  );
}

// Määritellään tyylit komponenteille
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  headerContainer: {
    flex: 1,
    borderWidth: 0.5,
  },
  addItemContainer: {
    flex: 5,
    borderWidth: 0.5,
  },
  listItemsContainer: {
    flex: 5,
    borderWidth: 0.5,
  },
  footerContainer: {
    flex: 1,
    borderWidth: 0.5,
  },
  headerComponent: {
    backgroundColor: 'lightyellow'
  },
  footerComponent: {
    backgroundColor: 'lightyellow'
  },
  addItemComponent: {
  },
});

export default App;
