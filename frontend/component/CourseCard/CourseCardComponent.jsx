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
  // console.log('COURSEEEEE',props.course.Theme.title)
  // const windowWidth = Dimensions. get('window')
  // console.log(windowWidth)
  const themeColor = {
    1: "red",
    2: "yellow",
    3: "#FF69B4",
    4: "#FF1493",
    5: "#DB7093",
    6: "#C71585",
    7: "#DA70D6",
  };
  console.log(themeColor[props.course.Theme.id]);
  return (
    <Surface
    elevation={3}
      style={{
        ...styles().cardContainer,
        backgroundColor: themeColor[props.course.Theme.id],
      }}
    >
      <View>
        <Text style={styles().themeTitle}>{props.course.Theme.title}</Text>
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
    // <Card style={styles().container}>
    //   <Card.Content style={styles.containerText}>
    //     <View
    //       style={{
    //         backgroundColor: "red",
    //         flexDirection: "row",
    //       }}
    //     >
    //       <View>
    //         <Text style={styles.title}>{props.course.Theme.title}</Text>
    //         <Text color="pink" style={styles.title}>
    //           {props.course.title}
    //         </Text>
    //       </View>
    //     </View>
    //     <Button
    //       icon="eye"
    //       mode="contained-tonal"
    //       onPress={() => Linking.openURL(props.course.link)}
    //     >
    //       Voir
    //     </Button>
    //   </Card.Content>
    // </Card>
  );
}
const styles = (bgColor) =>
  StyleSheet.create({
    cardContainer: {
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
