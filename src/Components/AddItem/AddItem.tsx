// AddItem.tsx

import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Appbar, IconButton, Text, TextInput } from 'react-native-paper';
import { ShoppingListItem } from '../../../App';

interface Props {
    shoppingList: ShoppingListItem[];
    setShoppingList: (shoppingList: ShoppingListItem[]) => void;
    mainStyles: StyleProp<ViewStyle>;    
}

const AddItem: React.FC<Props> = ({shoppingList, setShoppingList, mainStyles}) => {
    const [item, setItem] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')

    const addItem = () => {
        if(!item) {
            console.log("Item cannot be empty")
        } else {
            setShoppingList([...shoppingList, {item, quantity: quantity || '1', id: "ToDo: change this" }])
            setItem('');
            setQuantity('');
        }
    }

    return(
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
          onPress={() => addItem()}
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
        // fontWeight: '600',
        // fontSize: 15,
        // color: 'blue',
  }
});

export default AddItem;
