import React from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
  ImageBackground,
  Linking,
} from "react-native";
import { Card, Divider, Button, Surface } from "react-native-paper";

export default function CourseCardComponent(props) {

  const [ themeTitle, setThemeTitle ] = React.useState(props.course.Theme?.title || props.themeTitle)
  const [ themeId, setThemeId ] = React.useState(props.course.Theme?.id || props.course.id_theme)

  const themeColor = {
    1: "#EEA923",
    2: "#3AC49A",
    3: "#FF69B4",
    4: "#FF1493",
    5: "#DB7093",
    6: "#C71585",
    7: "#DA70D6",
  };
  return (
    <Surface
    elevation={3}
      style={{
        ...styles().cardContainer,
        backgroundColor: themeColor[themeId],
      }}
    >
      <View>
        <Text style={styles().themeTitle}>{themeTitle}</Text>
        <Text style={styles().title}>{props.course.title}</Text>
      </View>
      <Surface style={styles().btn} elevation={3}>
        <Button
            icon="download"
            onPress={() => Linking.openURL(props.course.link)}
        >
            Télécharger
        </Button>
      </Surface>
    </Surface>
  );
}
const styles = (bgColor) =>
  StyleSheet.create({
    cardContainer: {
      width: Dimensions.get("window").width - 32,
      marginTop:35,
      marginBottom: 16,
      borderRadius: 10,
      height: 96,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 16,
    },
    themeTitle: {
      fontWeight: "bold",
      left: 16,
    },
    btn: {
      backgroundColor: "white",
      borderRadius: 4,
      right: 16,
      
    },
    title: {
        maxWidth: '80%',
        left: 16,
    }
    // container: {
    //   flexDirection: "row",
    //   marginBottom: 16,
    //   marginHorizontal: 16,
    //   backgroundColor: "yellow",
    // },
    // btn: {
    //   // position: 'absolute',
    //   // right: 0,
    //   // top: 40,
    //   // // flex: 1,
    //   // // backgroundColor: 'white',
    //   // // color: 'black',
    //   // display: 'flex',
    //   // alignItems: 'center',
    // },

    // containerText: {
    //   marginBottom: 10,
    //   flexDirection: "column",
    // },
    // title: {
    //   fontSize: 20,
    //   color: "pink",
    //   fontWeight: "600",
    // },
    // description: {
    //   fontSize: 15,
    // },
  });
