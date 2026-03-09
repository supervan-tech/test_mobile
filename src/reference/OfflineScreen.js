/**
 * EXTRAIT VERBATIM — App SUPERVAN Driver
 * Source: App/Components/Screens/NonAuth/OfflineScreen.js
 *
 * Écran affiché quand l'app détecte une perte de connexion.
 *
 * PROBLÈME :
 * - Écran bloquant : le chauffeur ne peut rien faire tant qu'il est offline
 * - Pas de queue d'actions hors ligne
 * - Le bouton "RÉESSAYER" navigue simplement vers le splash screen
 * - Aucune tentative automatique de reconnexion
 */

import React, {useState, useEffect} from 'react';

import {Button, Center, Flex, Heading, Text} from 'native-base';
import {Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import {logger} from '../../../Services/Logger';

export default ({navigation}) => {
  logger.debug('rendering screen Offline');
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (pressed === true) {
      logger.debug('navigating Offline -> Splash');
      navigation.navigate('Splash');
    }
  }, [navigation, pressed]);

  return (
    <SafeAreaView>
      <Flex
        h={'100%'}
        bg={'secondary.700'}
        p={10}
        justifyContent={'space-between'}>
        <Image
          style={{
            height: 250,
            width: 300,
            borderRadius: 0,
            marginTop: 50,
            resizeMode: 'contain',
          }}
          source={require('../../../Assets/Images/Large/icon-info.png')}
        />
        <Center>
          <Heading fontSize={30} color={'white'}>
            Oops !
          </Heading>
          <Text fontSize={20}>Connexion perdue avec SUPERVAN</Text>
        </Center>
        <Button
          bg={'primary.200'}
          accessibilityLabel={'offlineRetryButton'}
          onPress={() => setPressed(true)}>
          <Text variant={'dark'} bold fontSize={20}>
            REESSAYER
          </Text>
        </Button>
      </Flex>
    </SafeAreaView>
  );
};
