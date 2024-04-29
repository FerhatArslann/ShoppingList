// AddItem.tsx

/**
 * Tämä komponentti tarjoaa käyttöliittymän, jossa käyttäjä voi lisätä uusia tuotteita ostoslistaan.
 * Käyttäjä syöttää tuotteen nimen ja määrän, jotka lisätään listaan tai päivitetään, jos tuote on jo listalla.
 */

import React, { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';
import { ShoppingListItem } from '../../../App';

// Komponentin props-tyypit
interface Props {
  shoppingList: ShoppingListItem[];  // Nykyinen ostoslista
  setShoppingList: (shoppingList: ShoppingListItem[]) => void;  // Funktio ostoslistan päivittämiseksi
  mainStyles: StyleProp<ViewStyle>;  // Tyyli-objekti ulkoasun määrittelyyn
}
// Tuotteen nimen ja määrän tila
const AddItem: React.FC<Props> = ({ shoppingList, setShoppingList, mainStyles }) => {
  const [item, setItem] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  const addItem = () => {
    if (!item) {
      console.log("Item cannot be empty");
    } else {
      const quantityNumber = parseInt(quantity) || 1;  // Muunnetaan määrä numeroksi, oletusarvo on 1
      const existingItemIndex = shoppingList.findIndex((listItem) => listItem.item.toLowerCase() === item.toLowerCase());

      if (existingItemIndex > -1) {
        // Jos tuote on jo listalla, päivitetään sen määrää
        const updatedShoppingList = [...shoppingList];
        const existingItem = updatedShoppingList[existingItemIndex];
        existingItem.quantity += quantityNumber;  // Lisätään määrä olemassa olevaan määrään
        setShoppingList(updatedShoppingList);
      } else {
        // Jos tuotetta ei ole listalla, luodaan uusi
        const newItem: ShoppingListItem = {
          item: item,
          quantity: quantityNumber,
          id: (shoppingList.length > 0 ? Math.max(...shoppingList.map(i => parseInt(i.id))) + 1 : 1).toString(), // Luodaan uusi ID
        };
        setShoppingList([...shoppingList, newItem]);
      }
      setItem('');  // Tyhjennetään kentät uutta syöttöä varten
      setQuantity('');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Add Items to List</Text>
      <TextInput
        label="Item Name"
        value={item}
        mode="outlined"
        style={styles.containerInputText}
        onChangeText={(item) => setItem(item)}  // Päivittää input tilaa
        placeholder='Type name here'
      />
      <TextInput
        label="Quantity"
        value={quantity}
        mode="outlined"
        style={styles.containerInputText}
        onChangeText={(quantity) => setQuantity(quantity)}
        keyboardType='numeric'
        placeholder='Type quantity'
      />
      <IconButton
        icon="plus"
        mode="contained"
        animated={true}
        size={20}
        onPress={addItem}  // Lisää uuden tuotteen listaa
      />
    </View>
  );
}

// Tyylien määrittely
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInputText: {
    width: "80%",
    margin: 10,
  }
});

export default AddItem;
