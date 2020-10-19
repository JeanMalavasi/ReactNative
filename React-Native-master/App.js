import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, StyleSheet , TextInput, Image, ImageBackground, FlatList, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {  createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem,} from '@react-navigation/drawer';
import { TextInput as TextInputPaper, Button } from 'react-native-paper';



//Criação da Tela principal do APP (HomeScreen)
function HomeScreen({ navigation, route }) {
  const [lang] = React.useContext(AppContext);
  //Criação das variaveis utilizadas nos Input Text e inicilização das mesmas com o valor 0;
  const [V1, setV1] = React.useState(0);
  const [V2, setV2] = React.useState(0);
  
  //Sempre que esta tela for focada, os valores dos Input Text, serão zerados;
  React.useEffect(
    () => navigation.addListener('focus', () => 
       setV1(0)),[navigation]
  );
   React.useEffect(
    () => navigation.addListener('focus', () => 
       setV2(0)),[navigation]
  );
  //A função retorna visualmente apartir desse ponto
  return (
    <View style={styles.View}>      
      <ImageBackground style={styles.ImageBackground} source={require('./Imagens/Fundo.jpg')}>
      <TextInputPaper
        style={styles.TextInput}
        keyboardType="numeric"
        mode = 'outlined'
        label={i18n("Digite o 1º numero", lang)}
        onChangeText={(valor) => setV1(valor)}
        value={V1}
      />
      <TextInputPaper
        style={styles.TextInput}
        keyboardType="numeric"
        mode = 'outlined'
        label={i18n("Digite o 2º numero", lang)}
        onChangeText={(valor) => setV2(valor)}
        value={V2}
      />
      <Button style={styles.Button} mode='contained' 
        onPress={() => navigation.navigate('NewsScreen', { V1, V2 })}>
        {i18n('Somar', lang)}
      </Button>
      <Button style={styles.Button} mode='contained' 
        onPress={() => navigation.toggleDrawer()}>
        {i18n('Menu', lang)}
      </Button> 
      <Text style={styles.Text}>
        {i18n('Resultado da Soma', lang)}: {route.params?.post}
      </Text>
      </ImageBackground>
    </View>
  );
}

//Criação da Tela de soma (DetaiScreen)
function NewsScreen({ navigation, route }) {
  const [lang] = React.useContext(AppContext);
  //Variaveis que receberão os valores vindos da Tela Principal(HomeScreen)
  const soma1 = route.params?.V1 || 0;
  const soma2 = route.params?.V2 || 0;
  const operacao = parseFloat(soma1) + parseFloat(soma2); //Transformação de string em float
   //A função retorna visualmente apartir desse ponto
  return (
    <View style={styles.View}>
      <ImageBackground style={styles.ImageBackground} source={require('./Imagens/Fundo.jpg')}>
      <TextInputPaper
        style={styles.TextInput}
        mode = 'outlined'
        value={operacao.toString()}
        editable={false}
      />
      <Text style={styles.Text}>
        {i18n('Soma', lang)}: {operacao} 
      </Text>
      <Button style={styles.Button} mode='contained' 
      onPress={() => navigation.navigate('HomeScreen', { post: operacao })}>
        {i18n('Voltar', lang)}
      </Button>
      </ImageBackground>
    </View>
  );
}

//Criação da Tela de configuraçoes (SettingsScreen)
function SettingsScreen({ navigation }) {
  const [lang] = React.useContext(AppContext);
  return (
    <View style={styles.View}>
      <ImageBackground style={styles.ImageBackground} source={require('./Imagens/Fundo.jpg')}>
      <Image
        style={styles.Image}
        source={require('./Imagens/Config.png')}
      />
      <Text title={i18n('Configurações', lang)} style = {styles.Text}>
      {i18n('Configurações', lang)}
      </Text>
      <Button style={styles.Button} mode='contained' 
       onPress={() => navigation.navigate('LenguageScreen')}>
         {i18n('Linguas', lang)}
        </Button>
      <Button style={styles.Button} mode='contained' 
        onPress={() => navigation.toggleDrawer('')}>
         {i18n('Abrir gaveta', lang)}
      </Button> 
      </ImageBackground>
    </View>  
  );
}

//Criação da Tela de linguas (LenguageScreen)
function LenguageScreen({ navigation }) {
  const [lang, setLang] = React.useContext(AppContext);
  const langList = [
    {
      name: 'en',
      value: i18n('en', lang)
    },
    {
      name: 'pt_br',
      value: i18n('pt_br', lang)
    },
    {
      name: 'es',
      value: i18n('es', lang) 
    },            
    {
      name: 'fr',
      value: i18n('fr', lang) 
    },
    {
      name: 'it',
      value: i18n('it', lang) 
    },
    {
      name: 'al',
      value: i18n('al', lang) 
    }               
  ]
  return (
    <View style={styles.View}>
      <ImageBackground style={styles.ImageBackground} source={require('./Imagens/Fundo.jpg')}>
      <FlatList style  = {styles.FlatList}
      
        data={langList}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.listItem}
            onPress={() => setLang(item.name)}>
            <Text style={styles.listItemText}>{item.value}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name} // item.name eh um identificador unico
      />
      </ImageBackground>
    </View>  
  );
}
const AppContext = React.createContext(); 
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function DashBoard() {
  return (
    
    <Stack.Navigator> 
    <Stack.Screen name="HomeScreen" component={HomeScreen} 
      options={{ title: 'Calculadora',
          headerStyle: {
            

            borderBottomWidth: 0,
            backgroundColor: 'transparent'

          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: {
            alignItems: 'center',
          }
      }} 
    />
    <Stack.Screen name="LenguageScreen" component={LenguageScreen} options={{ title: 'Calculadora',
          headerStyle: {
            backgroundColor: '#3d3293',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: {
            alignItems: 'center',
          }
      }}  
    />
    </Stack.Navigator>
  );
}
function CustomDrawerContent(props) { // ... = me entrega todas as propriedades dentro de props
  const [lang] = React.useContext(AppContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={i18n('Calculadora', lang)}
        onPress={() => props.navigation.navigate('DashBoard')}
      />
      <DrawerItem
        label={i18n('Conta', lang)}
        onPress={() => props.navigation.navigate('NewsScreen')}
      />
      <DrawerItem
        label={i18n('Configurações', lang)}
        onPress={() => props.navigation.navigate('SettingsScreen')}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  const [lang, setLang] = React.useState('pt_br')
  return (
    <AppContext.Provider value={[lang, setLang]}>
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} drawerStyle={{backgroundColor: '#c6cbef', width: 250, }} initialRouteName="DashBoard">
        <Drawer.Screen name="DashBoard" component={DashBoard}/> 
        <Stack.Screen name="NewsScreen" component={NewsScreen} />
        <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  View: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  TextInput: {
    height: 40, 
    width: '80%', 
    paddingHorizontal: 5, 
    marginBottom: 8, 
    marginTop: 2,
  },
  Text: {
    fontSize:15,
    paddingLeft:20,
    paddingRight:20,
    margin: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#483D8B'
  },
  Image: {
    width: '100%', 
    height: '50%'
  },
  Button:{
    marginTop: 7,
    
  },
  ImageBackground: {
    width: '100%',
    height: '130%',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  listItem: {
    backgroundColor: '#483D8B',
    paddingVertical: 10,
    marginBottom: 5,
  },
  FlatList: {
    width: '70%',
    paddingTop:'35%',
  }
})

// Languages: Dicionário das línguas: chave:valor
const en = {
  'Digite o 1º numero': 'Enter the 1st number',
  'Digite o 2º numero': '  Enter the 2st number',
  'Somar': 'Add',
  'Menu': 'Menu',
  'Resultado da Soma': 'Sum Result',
  'Calculadora': 'Calculator',
  'Conta': 'account',
  'Configurações': 'Settings',
  'Soma': 'Sum',
  'Voltar': 'Come back',
  'Linguas': 'Languages',
  'Abrir gaveta': '  Open drawer',
  'en' : 'English',
  'pt_br' :  'Portugues',
  'es'  : 'Spanish',
  'fr' : 'Frances',
  'it' : 'Italian',
  'al' : 'German'
};
const pt_br = {
  'Digite o 1º numero': 'Digite o 1º numero',
  'Digite o 2º numero': 'Digite o 2º numero',
  'Somar':'Somar' ,
  'Menu': 'Menu',
  'Resultado da Soma': 'Resultado da Soma',
  'Calculadora': 'Calculadora',
  'Conta': 'Conta',
  'Configurações': 'Configurações',
  'Soma': 'Soma',
  'Voltar':  'Voltar',
  'Linguas': 'Linguas',
  'Abrir gaveta': 'Abrir gaveta',
  'en' :  'Ingles',
  'pt_br' : 'Portugues',
  'es'  : 'Espanhol',
  'fr' : 'Frances',
  'it' : 'Italiano',
  'al' : 'Alemão'
};
const es ={
  'Digite o 1º numero':  'Ingrese el 1er número',
  'Digite o 2º numero':  'Ingrese el 2do número',
  'Somar':'Agregar',
  'Menu': 'Menú',
  'Resultado da Soma': 'Resultado de la suma',
  'Calculadora': 'Calculadora',
  'Conta': 'cuenta',
  'Configurações': 'Configuración',
  'Soma': 'Suma',
  'Voltar':  'Atras',
  'Linguas': 'idiomas',
  'Abrir gaveta': 'Cajón abierto',
  'en' :  'Inglés',
  'pt_br' : 'Portugues',
  'es'  : 'Español',
  'fr' : 'Francés',
  'it' : 'Italiano',
  'al' : 'Alemán'
};
const fr ={
  'Digite o 1º numero':  'Entrer le 1er numéro',
  'Digite o 2º numero':  'Entrer le 2e numéro',
  'Somar': 'Ajouter',
  'Menu': 'Menú',
  'Resultado da Soma': 'Résultat de somme',
  'Calculadora':'Calculatrice',
  'Conta': 'Compte',
  'Configurações': 'Paramètres',
  'Soma': 'Somme',
  'Voltar':  'Retour',
  'Linguas': 'Langues',
  'Abrir gaveta': 'Tiroir ouvert',
  'en' :  'Anglais',
  'pt_br' : 'Portugues',
  'es'  : 'Espagnol',
  'fr' : 'Français',
  'it' : 'Italien',
  'al' : 'Allemand'
};
const it = {
  'Digite o 1º numero': 'Inserire il 1o numero',
  'Digite o 2º numero': 'Inserire il secondo numero',
  'Somar':'Aggiungi' ,
  'Menu': 'Menu',
  'Resultado da Soma': 'Risultato della somma',
  'Calculadora': 'Calcolatrice',
  'Conta': 'account',
  'Configurações': 'Configurazione',
  'Soma': 'Somma',
  'Voltar':  'Ritorno',
  'Linguas': 'Lingue',
  'Abrir gaveta': 'Cassetto aperto',
  'en' :  'Inglese',
  'pt_br' : 'Portugues',
  'es'  : 'Spagnolo',
  'fr' : 'Francese',
  'it' : 'Italiano',
  'al' : 'Tedesco'
};
const al = {
  'Digite o 1º numero': 'Geben Sie die 1. Nummer ein',
  'Digite o 2º numero': 'Geben Sie die 2. Nummer ein',
  'Somar':'Hinzufügen',
  'Menu': 'Menu',
  'Resultado da Soma': 'Ergebnis der Summe',
  'Calculadora': 'Rechner',
  'Conta': 'Konto',
  'Configurações': 'Konfiguration',
  'Soma': 'Summe',
  'Voltar':  'Komm zurück',
  'Linguas': 'Sprachen',
  'Abrir gaveta': 'Schublade öffnen',
  'en' :  'Englisch',
  'pt_br' : 'Portugues',
  'es'  : 'Spanisch',
  'fr' : 'Französisch',
  'it' : 'Italienisch',
  'al' : 'Deutsch'
};

const i18n = (key, lang) => {
  switch(lang) {
    case 'en':
      return en[key]
    case 'es':
      return es[key]
    case 'fr':
      return fr[key]
    case 'it':
      return it[key]
    case 'al':
      return al[key]
    default:
      return pt_br[key]
  }
}