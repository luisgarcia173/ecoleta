import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import ibgeApi from '../../services/ibgeApi';
import RNPickerSelect from 'react-native-picker-select';

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

interface PickerSelectMap {
  label: string,
  value: string
}

const Home = () => {

  const [ufs, setUfs] = useState<PickerSelectMap[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');

  const [cities, setCities] = useState<PickerSelectMap[]>([]);
  const [selectedCity, setSelectedCity] = useState('0');

  const navigation = useNavigation();

  useEffect(() => {
    ibgeApi.get<IBGEUFResponse[]>('estados?orderBy=nome').then(response => {
      const ufInitials = response.data.map(uf => ({ label: uf.sigla, value: uf.sigla }));
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    ibgeApi.get<IBGECityResponse[]>(`estados/${selectedUf}/municipios?orderBy=nome`).then(response => {
      const cityNames = response.data.map(city => ({ label: city.nome, value: city.nome }));
      setCities(cityNames);
    });

  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUf, 
      city: selectedCity
    });
  }

  function handleSelectUf(value: string) {
    setSelectedUf(value);
  }

  function handleSelectCity(value: string) {
    setSelectedCity(value);
  }

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >

      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coletas de forma eficiente.</Text>

        <Text style={styles.comboTitle}>Estado (UF)</Text>
        <RNPickerSelect
          placeholder={{
            label: 'Selecione uma UF',
            value: null,
          }}
          items={ufs}
          onValueChange={(value) => handleSelectUf(value)}
          style={pickerStyle}
        />
        <Text style={styles.comboTitle}>Cidade</Text>
        <RNPickerSelect
          placeholder={{
            label: 'Selecione uma Cidade',
            value: null,
          }}
          items={cities}
          onValueChange={(value) => handleSelectCity(value)}
          style={pickerStyle}
        />
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>

    </ImageBackground>
  );
};

export default Home;

const pickerStyle = {
	inputIOS: {
    color: '#6C6C80',
    fontSize: 18,
    fontFamily: 'Roboto_400Regular',
		paddingTop: 13,
		paddingHorizontal: 10,
    paddingBottom: 12,
    backgroundColor: 'white',
    borderRadius: 5
	},
	placeholderColor: '#322153',
	underline: { borderTopWidth: 0 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#F0F0F5'
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  comboTitle: {
    color: '#322153',
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 48,
    marginBottom: 8
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});