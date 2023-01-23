import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
  ImageBackground,
  Linking,
} from "react-native";
import {
  List,
  Card,
  Divider,
  Button,
  Avatar,
  TouchableRipple,
} from "react-native-paper";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import API_IP from "../../env";

export default function MessageCardComponent(props) {
  const date = props.message.createdAt;
  const [isLiked, setIsLiked] = React.useState(false);
  function handlePress() {
    setIsLiked(!isLiked);
  }
  var colorThumb = isLiked ? "black" : "white";
  const avatar = props.message.User.avatar ? `${API_IP}/avatars/${props.message.User.avatar}` : `${API_IP}/default/default.png`;
  return (
    <View style={styles.card}>
      <List.Item
        style={{
          backgroundColor: "white",
          marginBottom: 30,
          marginHorizontal: 20,
          borderRadius: 10,
          padding: 10,
        }}
        title={"Par " + props.message.User.firstName}
        description={props.message.text}
        // descriptionEllipsizeMode={false}
        descriptionNumberOfLines={1000}
        right={(props) => (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ fontSize: 10, marginBottom: 10, color: "#9E9E9E" }}>
              {formatDistance(new Date(date), Date.now(), {
                addSuffix: true,
                locale: fr,
              })}
            </Text>
            <View style={{ display: "flex" }}>
              <TouchableRipple
                onPress={() => handlePress()}
                rippleColor="rgba(0, 0, 0, .32)"
              >
                <Avatar.Icon
                  size={40}
                  color={colorThumb}
                  icon={require("../../assets/logo/thumb_black.png")}
                  style={{ backgroundColor: "#FFC107", marginRight: 10 }}
                />
              </TouchableRipple>
            </View>
          </View>
        )}
        left={(props) => (
          <Avatar.Image
            size={70}
            source={{uri : avatar}}
          />
        )}
      />
    </View>
  );
}
const styles = (bgColor) =>
  StyleSheet.create({
    title: {
      fontSize: 14,
      color: "white",
    },
    card: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 30,
      backgroundColor: "red",
    },
    headerCard: {
      position: "absolute",
      top: 0,
      left: 0,

      display: "flex",
      backgroundColor: "red",
    },
    headerCardTitle: {
      backgroundColor: "red",
      // display:'flex',
      // flexDirection:'column',s
    },
    containerText: {
      display: "flex",
    },
  });
