import * as React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useEffect, useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getTheme } from "../api/Themes/getTheme";
import { getThemeQcms } from "../api/Themes/getThemeQcm";
import CardTopic from "../component/Forum/CardTopic";
import CourseCardComponent from "../component/CourseCard/CourseCardComponent";
import QcmCard from "../component/Qcms/QcmCardHome";

export default function SearchByThemeScreen({ route, navigation }) {
  const { title, id, type } = route.params;
  const [topics, setTopics] = useState([]);
  const [theme, setTheme] = useState([]);
  const [qcm, setQcm] = useState([]);

  useEffect(() => {
    async function getThemeInScreen() {
      const themeReq = await getTheme(id);
      setTheme(themeReq);
      setTopics(themeReq.Topics);
      if (type == "qcm") {
        const qcmReq = await getThemeQcms(id);
        setQcm(qcmReq);
      }
    }
    getThemeInScreen();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["purple", "#02254F", "#2D84EA"]}
        style={styles.containerGradient}
      >
        <Image
          source={require("../assets/logo_fond.png")}
          style={styles.bgTop}
        />
        <Text
          style={{
            fontSize: 27,
            color: "white",
            marginTop: 110,
            marginLeft: 40,
            fontWeight: "bold",
          }}
        >
          Résultats pour le theme :
        </Text>
        <Text
          style={{
            fontSize: 27,
            color: "white",
            fontStyle: "italic",
            marginLeft: 40,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>

        <ScrollView>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {type == "topic" ? (
              topics?.length != 0 ? (
                topics.map((item) => {
                  return (
                    <CardTopic
                      key={item.id}
                      idTopic={item.id}
                      title={item.title}
                      theme={title}
                      navigation={navigation}
                    />
                  );
                })
              ) : (
                <Text
                  style={{
                    fontSize: 27,
                    color: "white",
                    marginTop: 110,
                    marginLeft: 40,
                    fontWeight: "bold",
                  }}
                >
                  Aucun résultat
                </Text>
              )
            ) : theme.Courses?.length != 0 ? (
              type == "course" &&
              theme.Courses?.map((item, i) => {
                return (
                  <>
                    <CourseCardComponent
                      key={i}
                      themeTitle={theme.title}
                      course={item}
                    />
                  </>
                );
              })
            ) : <Text
                style={{
                  fontSize: 27,
                  color: "white",
                  marginTop: 110,
                  marginLeft: 40,
                  fontWeight: "bold",
                }}
              >
                Aucun résultat
              </Text> ? (
              <Text
                style={{
                  fontSize: 27,
                  color: "white",
                  marginTop: 110,
                  marginLeft: 40,
                  fontWeight: "bold",
                }}
              >
                Aucun résultat
              </Text>
            ) : topics?.length != 0 ? (
              topics?.map((item) => {
                return (
                  <CardTopic
                    key={item.id}
                    idTopic={item.id}
                    title={item.title}
                    theme={title}
                    navigation={navigation}
                  />
                );
              })
            ) : (
              <Text
                style={{
                  fontSize: 27,
                  color: "white",
                  marginTop: 110,
                  marginLeft: 40,
                  fontWeight: "bold",
                }}
              >
                Aucun résultat
              </Text>
            )}
            {type === "qcm" &&
              qcm?.length != 0 &&
              qcm?.map((item) => {
                return (
                  <QcmCard key={item.id} qcm={item} navigation={navigation} />
                );
              })}
            {qcm?.length === 0 
            && type === "qcm" &&
              <Text
                style={{
                  fontSize: 27,
                  color: "white",
                  marginTop: 110,
                  marginLeft: 40,
                  fontWeight: "bold",
                }}
              >
                Aucun résultat
              </Text>
            }
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgTop: {
    backgroundSize: "cover",
    borderWidth: 1,
    // borderColor: 'red',
    position: "absolute",
    height: 150,
    width: "100%",
    // backgroundPosition: 'bottom',
  },
  bgBottom: {
    backgroundSize: "cover",
    borderWidth: 1,
    // borderColor: 'red',
    position: "absolute",
    bottom: 0,
    height: 150,
    // transform: [{ rotate: "180deg" }],
    width: "100%",
    // backgroundPosition: 'bottom',
  },

  linearGradient: {
    flex: 1,
    backgroundImage: "url(../assets/img-test/image1.png)",
  },

  container: {
    // flex: 6,
    width: "100%",
    height: "100%",
    // paddingLeft: 28,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  containerGradient: {
    // flex: 6,
    width: "100%",
    height: "100%",
  },

  profileImgContainer: {
    marginHorizontal: 16,
    marginTop: 50,
    justifyContent: "space-between",
    marginBottom: 64,
  },

  image: {
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#50F4E1",
  },

  containerText: {},

  name: {
    fontSize: 20,
    color: "#fff",
  },

  paragraphe: {
    fontSize: 15,
    color: "#fff",
  },

  progress: {
    width: 150,
    height: 20,
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 20,
    marginHorizontal: 16,
    color: "#fff",
    marginBottom: 24,
  },
});
