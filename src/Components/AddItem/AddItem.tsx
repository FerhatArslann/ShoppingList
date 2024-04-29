// AddItem.tsx

import React, { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';
import { ShoppingListItem } from '../../../App';

interface Props {
  shoppingList: ShoppingListItem[];
  setShoppingList: (shoppingList: ShoppingListItem[]) => void;
  mainStyles: StyleProp<ViewStyle>;    
}

const AddItem: React.FC<Props> = ({ shoppingList, setShoppingList, mainStyles }) => {
  const [item, setItem] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');  // Päivitetty olemaan string tilan hallintaa varten

  const addItem = () => {
    if (!item) {
      console.log("Item cannot be empty");
    } else {
      const quantityNumber = parseInt(quantity) || 1;  // Jos syötetty määrä on virheellinen tai tyhjä, oletetaan määräksi 1
      const existingItemIndex = shoppingList.findIndex((listItem) => listItem.item.toLowerCase() === item.toLowerCase());

      if (existingItemIndex > -1) {
        // Tuote on jo listalla, joten päivitetään sen määrää
        const updatedShoppingList = [...shoppingList];
        const existingItem = updatedShoppingList[existingItemIndex];
        existingItem.quantity += quantityNumber;  // Lisätään olemassa olevaan määrään
        setShoppingList(updatedShoppingList);
      } else {
        // Tuotetta ei ole listalla, joten lisätään uusi
        const newItem: ShoppingListItem = {
          item: item,
          quantity: quantityNumber,  // Käytetään muunnettua määrää
          id: shoppingList.length > 0 ? Math.max(...shoppingList.map(i => parseInt(i.id))) + 1 : '1',  // Oletetaan, että ID on string ja muunnetaan se
        };
        setShoppingList([...shoppingList, newItem]);
      }
      setItem('');
      setQuantity('');  // Tyhjennetään syöte uutta lisäystä varten
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
        onChangeText={(item) => setItem(item)}
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
        onPress={addItem}
      />
    </View>
  );
}

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
