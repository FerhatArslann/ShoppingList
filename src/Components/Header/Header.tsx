// Header.tsx

/**
 * Header.tsx sisältää sovelluksen ylätunnisteen, jossa on valikko ja toimintoja.
 * Se tarjoaa käyttöliittymäelementtejä, kuten info- ja menu painikkeet.
 */

import React, { useState } from 'react';
import { Alert, Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { BackHandler } from 'react-native';  // Tuo BackHandlerin käsittelemään sovelluksen sulkemista Androidilla

interface Props {
  title: string;
  mainStyles: StyleProp<ViewStyle>;  // Tyyli-objekti, jonka voi määritellä komponenttia käytettäessä
}

// Header-komponentti, joka ottaa Props-tyypit vastaan
const Header: React.FC<Props> = ({ title, mainStyles }) => {
  const [menuVisible, setMenuVisible] = useState(false);  // Hallitsee valikon näkyvyyttä

  const openMenu = () => {
    console.log("AppBar menu pressed");
    setMenuVisible(true);  // Avaa valikon
  };

  const closeMenu = () => setMenuVisible(false);  // Sulkee valikon

  const handleExit = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();  // Kutsuu exitApp-metodia sulkeakseen sovelluksen Androidilla
    } else {
      Alert.alert("Exit", "Cannot exit the app.");  // Näyttää ilmoituksen, ettei sovellusta voi sulkea iOS:ssä
    }
  };

  return (
    <Appbar.Header style={[mainStyles, styles.header]} mode="center-aligned">
      <Appbar.Content title={title} titleStyle={styles.headerTitle} />
      <Appbar.Action icon="information" onPress={() => {
        console.log(`AppBar info pressed`); 
        Alert.alert("Developer: Ferhat Arslan", "Welcome to Shopping List App!"); 
      }} />
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="dots-vertical" color="black" onPress={openMenu} />}
      >
        <Menu.Item onPress={handleExit} title="Exit" />
      </Menu>
    </Appbar.Header>
  );
}

// Tyylit Header-komponentille
const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    color: 'blue',
  }
});

export default Header;
