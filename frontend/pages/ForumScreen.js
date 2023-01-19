import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Searchbar,
  IconButton,
  Card,
  Avatar,
  Checkbox,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTheme } from "../api/Forum/forum";
import { getTopics } from "../api/Forum/getTopics";
import { searchAll } from "../api/Forum/searchAll";
import CardMessage from "../component/Forum/CardMessage";
import CardTopic from "../component/Forum/CardTopic";
import CardTheme from "../component/Forum/CardTheme";
import SearchHeaderCard from "../component/Forum/SearchHeaderCard";

const App = ({ navigation }) => {
  const [cards, setCards] = useState({
    theme: [],
    themeMenu: [],
    topic: [],
    message: [],
  });
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [checked, setChecked] = useState({
    Themes: false,
    Topics: false,
    Messages: false,
  });
  const [searchQuery, setSearchQuery] = useState();
  const [expanded, setExpanded] = React.useState({
    theme: true,
    topic: true,
    messages: true,
  });

  const handleSearch = async (string) => {
    if (string.length > 3) {
      setActiveSearch(true);
      let query = string.toLowerCase();
      const datas = await searchAll(
        "search=" + query + "&" + itemQuery(checked)
      );
      setCards({
        ...cards,
        themeMenu: datas.Themes !== null ? datas.Themes : [],
        topic: datas.Topics !== null ? datas.Topics : [],
        message: datas.Messages !== null ? datas.Messages : [],
      });
    } else {
      const Theme = await getTheme();
      const Topic = await getTopics();
      setCards({ ...cards, topic: Topic, themeMenu: Theme });
      setActiveSearch(false);
      setExpanded({
        theme: false,
        topic: false,
        messages: false,
      })
    }
  };

  const checkFilterIsTrue = (string) => {
    let array = [];
    for (let key in checked) {
      if (checked[key] && key === string) {
        return true;
      }
      array.push(checked[key]);
    }
    if (array.every((element) => element === false)) {
      return true;
    }
    return false;
  };

  const itemQuery = (checked) => {
    let string = "item=";
    for (let key in checked) {
      if (checked[key]) {
        string += `${key}` + ",";
      }
    }
    string = string === "item=" ? "" : string.slice(0, -1);
    return string;
  };

  useEffect(() => {
    const fetchInit = async () => {
      const Theme = await getTheme();
      const Topic = await getTopics();
      return setCards({
        ...cards,
        topic: await getTopics(),
        themeMenu: await getTheme(),
      });
    };
    fetchInit();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
    console.log("test", checkFilterIsTrue("Topics"));
  }, [checked]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image source={require('../assets/logo_fond.png')} style={styles.bgTop}/> */}
      <LinearGradient
        colors={["purple", "#02254F", "#2D84EA"]}
        style={styles.containerGradient}
      >
        <Searchbar
          style={{
            borderRadius: 30,
            width: "90%",
            marginTop: 30,
            marginHorizontal: "5%",
            zIndex: 1000,
          }}
          onChangeText={(query) => {
            handleSearch(query);
            setSearchQuery(query);
          }}
          placeholder="Rechercher un sujet"
          icon="filter"
          onIconPress={() => {
            setFilterVisible(!filterVisible);
          }}
        />
        {filterVisible && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "100%",
              top: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                marginLeft: 20,
              }}
            >
              Thèmes
            </Text>
            <Checkbox
              status={checked.Themes ? "checked" : "unchecked"}
              color="orange"
              style={styles.checkbox}
              onPress={() => {
                setChecked({ ...checked, Themes: !checked.Themes });
              }}
            />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                marginRight: 20,
              }}
            >
              Sujets
            </Text>
            <Checkbox
              status={checked.Topics ? "checked" : "unchecked"}
              color="orange"
              onPress={() => {
                setChecked({ ...checked, Topics: !checked.Topics });
              }}
            />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                marginRight: 20,
              }}
            >
              Messages
            </Text>
            <Checkbox
              status={checked.Messages ? "checked" : "unchecked"}
              color="orange"
              onPress={() => {
                setChecked({ ...checked, Messages: !checked.Messages });
              }}
            />
          </View>
        )}
        {activeSearch == false && (
          <View style={{ display: "flex", width: "100%" }}>
            <ScrollView horizontal={true}>
              {cards.themeMenu.map((item) => {
                return (
                  <CardTheme
                    key={item.id}
                    title={item.title}
                    description={item.description}
                  />
                );
              })}
            </ScrollView>
            <ScrollView
              contentContainerStyle={{ display: "flex", flexGrow: 1 }}
            >
              {cards.topic.map((item) => {
                // console.log('item = ',cards.topic)
                return (
                  <CardTopic
                    key={item.id}
                    title={item.title}
                    theme={item.Theme.title}
                    messages={item.Messages}
                  />
                );
              })}
              {cards.topic.map((item) => {
                // console.log('item = ',cards.topic)
                return (
                  <CardTopic
                    key={item.id}
                    title={item.title}
                    theme={item.Theme.title}
                    messages={item.Messages}
                  />
                );
              })}
            </ScrollView>
          </View>
        )}
        {activeSearch === true && (
          <ScrollView style={{marginTop:16}}>
            {checkFilterIsTrue("Themes") && (
              <SearchHeaderCard
                table="Themes"
                count={cards.themeMenu.count}
                handleSetExpanded={() =>
                  setExpanded({ ...expanded, theme: !expanded.theme })
                }
              />
            )}
            {expanded.theme === true && (
              <ScrollView horizontal={true}>
                {cards.themeMenu.count > 0 &&
                  cards.themeMenu.rows.map((item) => {
                    return (
                      <CardTheme
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                      />
                    );
                  })}
              </ScrollView>
            )}
            {checkFilterIsTrue("Topics") && (
              <SearchHeaderCard
                table="Sujets"
                count={cards.topic.count}
                handleSetExpanded={() =>
                  setExpanded({ ...expanded, topic: !expanded.topic })
                }
              />
            )}
            {expanded.topic === true && (
              <ScrollView>
                {cards.topic.count > 0 &&
                  cards.topic.rows.map((item) => {
                    return (
                      <CardTopic
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        theme={item.Theme.title}
                        messages={item.Messages}
                      />
                    );
                  })}
                  {cards.topic.count > 0 &&
                  cards.topic.rows.map((item) => {
                    return (
                      <CardTopic
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        theme={item.Theme.title}
                        messages={item.Messages}
                      />
                    );
                  })}
              </ScrollView>
            )}
            {checkFilterIsTrue("Messages") && (
              <SearchHeaderCard
                table="Messages"
                count={cards.message.count}
                handleSetExpanded={() =>
                  setExpanded({ ...expanded, messages: !expanded.messages })
                }
              />
            )}
            {expanded.messages === true && (
                    <ScrollView style={{
                    }}>
                      {cards.message.count > 0 &&
                        cards.message.rows.map((item) => {
                          return (
                            <CardMessage
                              key={item.id}
                              idTopic={item.Topic.id}
                              theme={item.Topic.Theme.title}
                              text={item.text}
                              topic={item.Topic.title}
                              createdAt={item.createdAt}
                            />
                          );
                        })}
                    </ScrollView>
                  )}
          </ScrollView>
        )}
        {/* CONDITION S'IL YA UNE RECHERCHE*/}
        {/* <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexGrow: 1,
            marginBottom: 50,
          }}
        >
          {activeSearch == true &&
            searchQuery != undefined &&
            (searchQuery.Messages.count != 0 ||
            searchQuery.Themes.count != 0 ||
            searchQuery.Topics.count != 0 ? (
              <View style={{ display: "flex", width: "100%", top: 50 }}>
                <View>
                  <SearchHeaderCard
                    table="Themes"
                    count={searchQuery.Themes.count}
                    handleSetExpanded={() =>
                      setExpanded({ ...expanded, theme: !expanded.theme })
                    }
                  />
                  {expanded.theme === true && (
                    <ScrollView horizontal={true}>
                      {searchQuery.Themes.count > 0 &&
                        searchQuery.Themes.rows.map((item) => {
                          return (
                            <CardTheme
                              key={item.id}
                              id={item.id}
                              title={item.title}
                              description={item.description}
                            />
                          );
                        })}
                    </ScrollView>
                  )}
                </View>
                <View>
                  <SearchHeaderCard
                    table="Sujets"
                    count={searchQuery.Topics.count}
                    handleSetExpanded={() =>
                      setExpanded({ ...expanded, topic: !expanded.topic })
                    }
                  />

                  {expanded.topic === true && (
                    <View>
                      {searchQuery.Topics.count > 0 &&
                        searchQuery.Topics.rows.map((item) => {
                          return (
                            <CardTopic
                              key={item.id}
                              id={item.id}
                              title={item.title}
                              theme={item.Theme.title}
                              messages={item.Messages}
                            />
                          );
                        })}
                    </View>
                  )}
                </View>
                <View>
                  <SearchHeaderCard
                    table="Messages"
                    count={searchQuery.Messages.count}
                    handleSetExpanded={() =>
                      setExpanded({ ...expanded, messages: !expanded.messages })
                    }
                  />
                  {expanded.messages === true && (
                    <View>
                      {searchQuery.Messages.count > 0 &&
                        searchQuery.Messages.rows.map((item) => {
                          return (
                            <CardMessage
                              key={item.id}
                              idTopic={item.Topic.id}
                              theme={item.Topic.Theme.title}
                              text={item.text}
                              topic={item.Topic.title}
                              createdAt={item.createdAt}
                            />
                          );
                        })}
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <View style={{ display: "flex", width: "100%", top: 50 }}>
                <Text style={styles.searchInfo}>Aucun résultat</Text>
              </View>
            ))}
        </ScrollView> */}

        {/* CONDITION SI LE MOT RECHERCHER EST TROP COURT  */}
        {activeSearch == true && searchQuery == undefined && (
          <View style={{ display: "flex", width: "100%", bottom: 550 }}>
            <ScrollView
              contentContainerStyle={{ display: "flex", flexGrow: 1 }}
            >
              <Text style={styles.searchInfo}>
                Votre recherche doit contenir un minimum de 3 caracteres
              </Text>
            </ScrollView>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  bgTop: {
    backgroundSize: "cover",
    borderWidth: 1,
    position: "absolute",
    top: 10,
    height: 150,
    width: "100%",
    zIndex: 1,
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
    width: "100%",
    // padding:10,
  },
  containerGradient: {
    // flex: 6,
    width: "100%",
    height: "100%",
    fontFamily: "Roboto_400Regular",
    margin: 0,
  },
  checkbox: {
    borderColor: "white",
    borderWidth: 1,
  },
  searchInfo: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
export default App;
