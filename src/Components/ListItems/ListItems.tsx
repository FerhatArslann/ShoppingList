// ListItems.tsx

/**
 * ListItems.tsx sisältää käyttöliittymän ostoslistan näyttämiseen. 
 * Tämä komponentti käyttää FlatList-komponenttia listan tuotteiden renderöimiseen.
 * Käyttäjä voi poistaa tuotteita listalta käyttämällä kunkin rivin poistopainiketta.
 */

import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ShoppingListItem } from '../../../App';

// Props-tyypit määrittävät, mitä tietoja ListItems-komponentti saa käyttää.
interface Props {
  shoppingList: ShoppingListItem[];  // Nykyinen ostoslista
  setShoppingList: (shoppingList: ShoppingListItem[]) => void;  // Funktio ostoslistan päivittämiseen
}

const ListItems: React.FC<Props> = ({ shoppingList, setShoppingList }) => {
  // Funktio yksittäisen tuotteen poistamiseksi listalta sen ID:n perusteella
  const removeItem = (id: string) => {
    const filteredList = shoppingList.filter(item => item.id !== id);
    setShoppingList(filteredList);
  };

  // Renderöintifunktio, jota FlatList käyttää jokaisen listaelementin esittämiseen
  const renderItem = ({ item }: { item: ShoppingListItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.quantityText}>{item.quantity}</Text>
      <Text style={styles.itemText}>{item.item}</Text>
      <IconButton
        icon="delete"  // Poistopainikkeen ikoni react native paper sivulta
        size={20}
        onPress={() => removeItem(item.id)}  // Kutsuu removeItem-funktiota, kun painiketta painetaan
        mode="contained"
        style={styles.deleteButton}
      />
    </View>
  );

  // Komponentti palauttaa FlatListin, joka käsittelee kaikkien listan tuotteiden renderöinnin
  return (
    <FlatList
      data={shoppingList}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
}

// Tyylien määrittely komponentille
const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginLeft: 40,
    marginRight: 40,
  },
  itemText: {
    fontSize: 18,
    color: 'black',
    flex: 1,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  quantityText: {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    minWidth: 20,
    fontSize: 12,
    textAlign: 'center',
  },
  deleteButton: {
    // Tähän voi jotain tyylejä määritellä painikkeelle jos haluaa...
  }
});

export default ListItems;
