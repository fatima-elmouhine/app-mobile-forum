import * as React from 'react';
import { useState, useEffect } from 'react';
import { LinearGradient } from "expo-linear-gradient";

import { StyleSheet, Text, View, Dimensions, Pressable , Image, ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar, IconButton, Card , Avatar, Checkbox} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from '../api/Forum/forum';
import { getTopics } from '../api/Forum/getTopics';
import { searchAll } from '../api/Forum/searchAll';
import CardMessage from '../component/Forum/CardMessage';
import CardTopic from '../component/Forum/CardTopic';
import CardTheme from '../component/Forum/CardTheme';
import SearchHeaderCard from '../component/Forum/SearchHeaderCard';

const App = ({ navigation }) => {

  const [cardThemes, setCardThemes] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeSearch , setActiveSearch] = useState(false);
  const [querySearched, setQuerySearched] = useState("");

  // console.log('activeSearch out = ',activeSearch);
  const [checked, setChecked] = useState({
    Themes: false,
    Topics: false,
    Messages: false,
  });
  const [searchQuery, setSearchQuery] = useState();
  const [searchQueryFiltered, setSearchQueryFiltered] = useState();
  const [expanded, setExpanded] = React.useState({
    theme: true,
    topic: true,
    messages: true,
  });


  async function handleSearch(query){
    setQuerySearched(query);

    if (query.length !== 0){
      setActiveSearch(true);
    }else{
      setActiveSearch(false);
    }

    // console.log('checked theme, topic, message = ',checked.Themes, checked.Topics, checked.Messages);
    // checked.map((item)=>{
    //   console.log(`item = `,item);
    // })
    // console.log('query length = ',query.length);

    // var stringQuery = query.length === 0 ? `` : `search=${query}` ;
    var stringQuery =`search=${query}` ;
    // console.log('query = ',query)
    // if(query.length !== 0){
for (const [key, value] of Object.entries(checked)) {
  // console.log(`${key}: ${value}`);
  if(value === true){
    stringQuery += `&item=${key}`;
    
    }
  }
  // console.log('queryFiltered =',stringQuery);
// }
    const data = await searchAll(stringQuery);
    if(stringQuery.includes('item')){
      setSearchQueryFiltered(data);
      console.log('data = ',data);
      console.log('queryFiltered =',stringQuery);

    }else{
      setSearchQuery(data);
    }
  }

  async function handleSearchFiltered(){
    
    var stringQuery =`search=${querySearched}` ;
    // console.log('query = ',querySearched)
    if(querySearched.length === 0){
      setSearchQuery(undefined);
    }else{
    for (const [key, value] of Object.entries(checked)) {
      console.log(`${key}: ${value}`);
      if(value === true){
        stringQuery += `&item=${key}`;
        
        }
    }
  }

  console.log('query = ',querySearched)


      // if(stringQuery.includes('item')){
    //     const data = await searchAll(stringQuery);
    //     console.log('data = ',data);
    //     console.log('queryFiltered =',stringQuery);
    //     setSearchQueryFiltered(data);
    //   }else{
    //     setSearchQuery(undefined);
    //   }
    //   // console.log('queryFiltered =',stringQuery);
    //   // setSearchQuery(data);
    // }
    
  }


  useEffect(() => {
    const fetchThemes = async () => {
      const data = await getTheme();
      
      data && setCardThemes(data);
    }

    const fetchTopics = async () => {
      const data = await getTopics();
      setTopics(data);
    }

    fetchThemes();
    fetchTopics();
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      {/* <Image source={require('../assets/logo_fond.png')} style={styles.bgTop}/> */}
      <LinearGradient
        colors={['purple', '#02254F','#2D84EA']}
        style={styles.containerGradient}
        >
        <Searchbar
        style= {{borderRadius:30, width: "90%", marginTop: 30, marginHorizontal:'5%', zIndex:1000}}
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
          <View style={{display:'flex', flexDirection:'row',alignItems:'center', justifyContent:'space-evenly', width:'100%', top: 10}}>
            <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginLeft:20}}>Thèmes</Text>
                <Checkbox
                status={checked.Themes ? 'checked' : 'unchecked'}
                color='orange'
                style={styles.checkbox}
                onPress={() => {
                  setChecked({...checked, Themes: !checked.Themes});
                  handleSearchFiltered()
                }}
              />
            <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginRight:20}}>Sujets</Text>
            <Checkbox
                status={checked.Topics ? 'checked' : 'unchecked'}
                color='orange'
                onPress={() => {
                  setChecked({...checked, Topics: !checked.Topics});
                }}
              />
            <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginRight:20}}>Message</Text>
            <Checkbox
                status={checked.Messages ? 'checked' : 'unchecked'}
                color='orange'
                onPress={() => {
                  setChecked({...checked, Messages: !checked.Messages});
                }}
              />
          </View>
        }
        {activeSearch == false &&
        <View style={{ display:'flex',width:'100%'}}>
              <ScrollView horizontal={true}>
                  {cardThemes.map((item) => {
                    return <CardTheme key={item.id} title={item.title} description={item.description} />
                  })}
                  {cardThemes.map((item) => {
                    return <CardTheme key={item.id} id={item.id} title={item.title} description={item.description} />
                  })}

              </ScrollView>
            <ScrollView contentContainerStyle={{display:'flex' , flexGrow:1 }}>
              
            {topics.map((item) => {
              return <CardTopic key={item.id} idTopic={item.id} title={item.title} theme={item.Theme.title} messages={item.Messages} navigation={navigation}/>
            })}
              {topics.map((item) => {
              // console.log('item2 = ',item.id)

              return <CardTopic key={item.id} idTopic={item.id} title={item.title} theme={item.Theme.title} messages={item.Messages}  navigation={navigation}/>
            })}
            {topics.map((item) => {
              // console.log('item3 = ',item.id)

            return <CardTopic key={item.id} idTopic={item.id} title={item.title} theme={item.Theme.title} messages={item.Messages}  navigation={navigation}/>
            })}
          </ScrollView>
        </View>
        }
        {/* CONDITION S'IL YA UNE RECHERCHE*/}
        <ScrollView contentContainerStyle={{display:'flex' , flexGrow:1, marginBottom:50 }}>
        {(activeSearch == true && searchQuery != undefined )  &&(
          ((searchQuery.Messages.count != 0 ) || 
          (searchQuery.Themes.count != 0 ) || 
          (searchQuery.Topics.count != 0)) 
           ?
          
          <View style={{ display:'flex',width:'100%',top: 50}}>
              <View>
                
                <SearchHeaderCard table="Themes"
                count={searchQuery.Themes.count}  
                handleSetExpanded={
                  () => setExpanded({...expanded, theme: !expanded.theme})
                }
                />
                {expanded.theme === true &&
                  <ScrollView horizontal={true}>
                  {searchQuery.Themes.count>0 && searchQuery.Themes.rows.map((item) => {
                    return <CardTheme key={item.id} id={item.id} title={item.title} description={item.description} />
                  })}
                  </ScrollView>
                }
              </View>
              <View>
              <SearchHeaderCard table="Sujets"
                count={searchQuery.Topics.count}  
                handleSetExpanded={
                  () => setExpanded({...expanded, topic: !expanded.topic})
                }
                />

                {expanded.topic === true &&
                  <View>
                    {searchQuery.Topics.count>0 && searchQuery.Topics.rows.map((item) => {
                      return <CardTopic key={item.id} id={item.id} title={item.title} theme={item.Theme.title} messages={item.Messages} />
                    })}
                  </View>
                }
              </View>
              <View>
              <SearchHeaderCard table="Messages"
                count={searchQuery.Messages.count}  
                handleSetExpanded={
                  () => setExpanded({...expanded, messages: !expanded.messages})
                }
                />
                {expanded.messages === true &&
                  <View>
                    {searchQuery.Messages.count>0 && searchQuery.Messages.rows.map((item) => {
                      return <CardMessage key={item.id} idTopic={item.Topic.id} theme={item.Topic.Theme.title}  text={item.text} 
                      topic={item.Topic.title}   createdAt={item.createdAt}
                      />
                    })}
                  </View>
                }
              </View>
          </View>
          :
          <View style={{ display:'flex',width:'100%',top: 50}}>
          <Text style={styles.searchInfo}>
            Aucun résultat
          </Text>
          </View>

        )
        }
        </ScrollView>

        {/* CONDITION SI LE MOT RECHERCHER EST TROP COURT  */}
        {(activeSearch == true && searchQuery == undefined )  &&
          <View style={{ display:'flex',width:'100%',bottom:550}}>
            <ScrollView contentContainerStyle={{display:'flex' , flexGrow:1 }}>
              <Text style={styles.searchInfo}>Votre recherche doit contenir un minimum de 3 caracteres</Text>
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
      position: 'absolute',
      top: 10,
      height:150,
      width: '100%',
      zIndex:1,
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
      fontFamily: "Roboto_400Regular",
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