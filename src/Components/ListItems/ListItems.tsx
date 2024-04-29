// ListItems.tsx

import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ShoppingListItem } from '../../../App';

interface Props {
  shoppingList: ShoppingListItem[];
  setShoppingList: (shoppingList: ShoppingListItem[]) => void;
}

const ListItems: React.FC<Props> = ({ shoppingList, setShoppingList }) => {
  const removeItem = (id: string) => {
    const filteredList = shoppingList.filter(item => item.id !== id);
    setShoppingList(filteredList);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.quantityText}>{item.quantity}</Text>
      <Text style={styles.itemText}>{item.item}</Text>
      <IconButton
        icon="delete"
        size={20}
        onPress={() => removeItem(item.id)}
        mode="contained"
        style={styles.deleteButton}
      />
    </View>
  );

  return (
    <FlatList
      data={shoppingList}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
}

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
    fontSize:12,
    textAlign: 'center',
  },
  deleteButton: {
    // Ei tarvita muutoksia tähän, mutta voit säätää tarvittaessa
  }
});

export default ListItems;
