import * as React from 'react';
import { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";

import { StyleSheet, Text, View, Dimensions, Pressable , Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar, Button, Card , Avatar, Checkbox, List,} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from '../api/Forum/forum';
import { getTopics } from '../api/Forum/getTopics';
import { searchAll } from '../api/Forum/searchAll';


const App = ({ navigation }) => {

  const [cardThemes, setCardThemes] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeSearch , setActiveSearch] = useState(false);
  // console.log('activeSearch out = ',activeSearch);
  const [checked, setChecked] = useState({
    theme: false,
    topic: false,
    messages: false,
  });
  const [searchQuery, setSearchQuery] = useState();
  const [expanded, setExpanded] = React.useState(true);

  // console.log('searchQuery Messages= ',searchQuery.Messages.count);
  // console.log('searchQuery Themes= ',searchQuery.Themes.count);
  // console.log('searchQuery Topics= ',searchQuery.Topics.count);
  // console.log('searchQuery condition = ',((searchQuery.Messages.count != 0 ) && 
  // (searchQuery.Themes.count != 0 ) && 
  // (searchQuery.Topics.count != 0)));
  const handlePress = () => setExpanded(!expanded);
  async function handleSearch(query){
    // console.log('query = ',query.length);
    if (query.length !== 0){
      setActiveSearch(true);
    }else{
      setActiveSearch(false);
    }
    // console.log('activeSearch in = ',activeSearch);
    const data = await searchAll(query);
    // console.log('data = ',data);
    setSearchQuery(data);
  }
  useEffect(() => {
    const fetchThemes = async () => {
      const data = await getTheme();
      setCardThemes(data);
    }

    const fetchTopics = async () => {
      const data = await getTopics();
      setTopics(data);
    }

    fetchThemes();
    fetchTopics();
  }, [])

  const CardTopic = ({id, title, theme, messages}) => {
    const numberMessage = messages.length
    return (
      <Card style={{marginBottom :10, margin:20}} onPress={()=> 
        messages[0]  && navigation.navigate('ForumDetailScreen',{id: messages[0].id_topic})}
        >
        <Card.Content style={{ flexDirection:"row", }}>
          <View style={{width:"30%", justifyContent:"center"}}>
            <Text variant="titleLarge">{theme}</Text>
            <Text variant="titleLarge">{title}</Text>
          </View>
          <View style={{alignItems: "flex-end", left: 0, width:"70%"}}>
            <Text variant="bodyMedium">Contient </Text>
            <Text variant="bodyMedium"> {numberMessage} message{numberMessage >0 &&'s'}</Text>

          </View>
        </Card.Content>
      </Card>
    )
}

  const CardTest = ({id, title, description, topics}) => {
      return (
        <View style={{display:'flex', alignItems:'center', marginTop:30}}>
          <Pressable  onPress={()=>{
          console.log('bouton rediriger vers theme topic ')
        }}>
          <Avatar.Text size={80} style={{marginLeft:15, marginBottom:20, backgroundColor:'#caca'}} label={
            <Text >
              {title}
            </Text>
          } />

          </Pressable>
          <Text style={{marginLeft:15, marginBottom:50, color:'white', fontWeight:'bold', fontSize:16}}>{title}</Text>
        </View>
          

            
      )
  }

  const CardMessage = ({id, title, description, topics}) => {
    return (
      <Card style={{marginBottom :10, margin:20}} onPress={()=> 
        // messages[0]  && navigation.navigate('ForumDetailScreen',{id: messages[0].id_topic})
        console.log('redirection vers message')}
        >
        <Card.Content style={{ flexDirection:"row", }}>
          <View style={{width:"30%", justifyContent:"center"}}>
            {/* <Text variant="titleLarge">{theme}</Text> */}
            {/* <Text variant="titleLarge">{title}</Text> */}
          </View>
          <View style={{alignItems: "flex-end", left: 0, width:"70%"}}>
            <Text variant="bodyMedium">Contient </Text>


          </View>
        </Card.Content>
      </Card>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/logo_fond.png')} style={styles.bgTop}/>
      <LinearGradient
        colors={['purple', '#02254F','#2D84EA']}
        style={styles.containerGradient}
        >
        <Searchbar
        style= {{borderRadius:30, width: "100%", top: 50, marginRight: 40, right: 8,
        marginBottom: 30, marginTop: 30}}
        onChangeText={(query)=>{
          handleSearch(query)
        }}
        placeholder="Rechercher un sujet"
        icon="filter"
        onIconPress={() => {
          setFilterVisible(!filterVisible);
        }}
        // onChangeText={onChangeSearch}
        // value={searchQuery}
        />
        {filterVisible &&
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', width:'100%', top: 50}}>
            <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginLeft:20}}>Thèmes</Text>
                <Checkbox
                status={checked.theme ? 'checked' : 'unchecked'}
                color='orange'
                style={styles.checkbox}
                onPress={() => {
                  setChecked({...checked, theme: !checked.theme});
                  console.log('checked theme', checked.theme)
                  console.log('checked theme')
                }}
              />
            <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginRight:20}}>Sujets</Text>
            <Checkbox
                status={checked.topic ? 'checked' : 'unchecked'}
                color='orange'
                onPress={() => {
                  setChecked({...checked, topic: !checked.topic});
                  console.log('checked sujet', checked.topic)
                  console.log('checked sujet')
                }}
              />
            <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginRight:20}}>Message</Text>
            <Checkbox
                status={checked.messages ? 'checked' : 'unchecked'}
                color='orange'
                onPress={() => {
                  setChecked({...checked, messages: !checked.messages});
                  console.log('checked messages', checked.messages)
                  console.log('checked messages')
                }}
              />
          </View>
        }
        {activeSearch == false &&
        <View style={{ display:'flex',width:'100%',top: 50}}>
              <ScrollView horizontal={true}>
                  {cardThemes.map((item) => {
                    return <CardTest key={item.id} title={item.title} description={item.description} />
                  })}
                  {cardThemes.map((item) => {
                    return <CardTest key={item.id} id={item.id} title={item.title} description={item.description} />
                  })}

              </ScrollView>
            <ScrollView contentContainerStyle={{display:'flex' , flexGrow:1 }}>
              
            {topics.map((item) => {
              return <CardTopic key={item.id} title={item.title} theme={item.Theme.title} messages={item.Messages} />
            })}
              {topics.map((item) => {
              return <CardTopic key={item.id} id={item.id} title={item.title} theme={item.Theme.title} messages={item.Messages} />
            })}
            {topics.map((item) => {
            return <CardTopic key={item.id} id={item.id} title={item.title} theme={item.Theme.title} messages={item.Messages} />
            })}
          </ScrollView>
        </View>
        }

        {(activeSearch == true && searchQuery != undefined )  &&(
          ((searchQuery.Messages.count != 0 ) || 
          (searchQuery.Themes.count != 0 ) || 
          (searchQuery.Topics.count != 0)) 
           ?
          
          <View style={{ display:'flex',width:'100%',top: 50}}>
            <ScrollView contentContainerStyle={{display:'flex' , flexGrow:1 }}>
              {/* {searchQuery.map((item) => { */}
              <View>
                <Text style={styles.searchInfo}>
                  #Themes : {searchQuery.Themes.count} correspondance{searchQuery.Themes.count>0 && 's'}
                </Text>
                  <View>
                  {searchQuery.Themes.count>0 && searchQuery.Themes.rows.map((item) => {
                    return <CardTest key={item.id} id={item.id} title={item.title} description={item.description} />
                  })}

                  </View>

              </View>
              <View>
                <Text style={styles.searchInfo}>
                  #Topics : {searchQuery.Topics.count} correspondance{searchQuery.Topics.count>0 && 's'}
                </Text>
                <View>
                  {searchQuery.Topics.count>0 && searchQuery.Topics.rows.map((item) => {
                    return <CardTopic key={item.id} id={item.id} title={item.title} theme={item.Theme.title} messages={item.Messages} />
                  })}
              </View>
              </View>
              <View>
                <Text style={styles.searchInfo}>
                  #Messages : {searchQuery.Messages.count} correspondance{searchQuery.Messages.count>0 && 's'}
                </Text>
                <View>
                  {searchQuery.Messages.count>0 && searchQuery.Messages.rows.map((item) => {
                    return <CardMessage key={item.id} id={item.id} title={item.title} topic={item.Topic.title} />
                  })}
                </View>
              </View>
              {/* })} */}
            </ScrollView>
          </View>
          :
          <View style={{ display:'flex',width:'100%',top: 50}}>

          <Text style={styles.searchInfo}>
            Aucun résultat
          </Text>
          </View>

        )
        }

        {(activeSearch == true && searchQuery == undefined )  &&
          <View style={{ display:'flex',width:'100%',top: 50}}>
            <ScrollView contentContainerStyle={{display:'flex' , flexGrow:1 }}>
              <Text style={styles.searchInfo}>Aucun résultat</Text>
            </ScrollView>
          </View>
        }

      </LinearGradient>
    </SafeAreaView>
  );

};
  const styles = StyleSheet.create({
    bgTop: {
      backgroundSize: 'cover',
      borderWidth: 1,
      borderColor: 'red',
      position: 'absolute',
      top: 10,
      height:150,
      zIndex: -1,
      width: '100%',
      // backgroundPosition: 'bottom',
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
      backgroundImage: "url(../assets/img-test/image1.png)",
    },
    container: {
      flex: 1,
      // padding:10,
    },
    containerGradient: {
      // flex: 6,
      width: '100%',
      height: '100%',
      display: 'flex',
      fontFamily: "Roboto_400Regular",
      paddingLeft: 28,
      margin: 0,
    },
    checkbox: {
      borderColor:'white', borderWidth:1
    },
    searchInfo: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  })  
export default App;