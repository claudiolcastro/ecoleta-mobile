import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, SafeAreaView, Platform, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { Feather as Icon, FontAwesome as IconAw } from '@expo/vector-icons';
import API from '../../services/api';

interface RouteParams {
  pointId: number
}

interface Data {
  point: {
    image: string,
    name: string,
    email: string,
    whatsapp: string,
    city: string,
    uf: string,
  },
  items: {
    title: string,
  }[]
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [data, setData] = useState<Data>({} as Data);

  const routeParams = route.params as RouteParams;

  useEffect(() => {
    API.get(`/points/${routeParams.pointId}`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  if (!data.point) {
    return false;
  }

  const handleMailCompose = () => {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    })
  };

  const handleWhatsapp = () => {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre a coleta de resíduos`
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={20} color="#34cb79" onPress={() => navigation.goBack()} />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' }} />

        <Text style={styles.pointName}>
         {data.point.name}
        </Text>

        <Text style={styles.pointItems}>
          {data.items.map(item => item.title).join(',')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => handleWhatsapp()}>
          <IconAw name="whatsapp" color="#FFF" size={20} />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={() => handleMailCompose()}>
          <Icon name="mail" color="#FFF" size={20} />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: (Platform.OS === 'ios') ? 20 : 30 + Constants.statusBarHeight,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    paddingBottom: (Platform.OS === 'ios') ? 10 : 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;