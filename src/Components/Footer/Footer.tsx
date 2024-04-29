// Footer.tsx

/**
 * Footer.tsx sisältää sovelluksen alatunnisteen toteutuksen.
 * Tämä komponentti käyttää React Native Paperin Appbar-komponenttia otsikon näyttämiseen.
 */

import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Appbar } from 'react-native-paper';

// Props-tyypitys Footer-komponentille, sisältää otsikon ja mahdollisen tyylitiedon
interface Props {
    title: string;
    mainStyles: StyleProp<ViewStyle>;
}

// Komponentti joka renderöi otsikkotiedon käyttäen Appbar-komponenttia
const Footer: React.FC<Props> = ({title, mainStyles}) => {
    return (
      <Appbar.Header style={[mainStyles, styles.footer]} mode="center-aligned">
        {/* Tämä komponentti näyttää ainoastaan otsikon, lisätoimintoja ei ole määritetty */}
        <Appbar.Content title={title} titleStyle={styles.footerTitle} />
      </Appbar.Header>
    );
}

// Tyylitiedot Footer-komponentille
const styles = StyleSheet.create({
  footer: {
      alignItems: 'center',
  },
  footerTitle: {
    fontWeight: '600', 
    fontSize: 15,       
    color: 'blue',      
  }
});

export default Footer;
