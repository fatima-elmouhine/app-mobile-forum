import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Searchbar,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { getQcms } from "../api/Qcms/getQcms";
import QcmCard from "../component/Qcms/QcmCardHome";



export default function ListQcmScreen ({ navigation }) {
//   const [courses, setCourses] = useState([]);
const [qcmsList, setQcmsList] = useState([]);

  const [activeSearch , setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  useEffect( () => {

    async function getQcmInQcmScreen() {
      const qcmsReq = await getQcms();
    //   console.log(qcmsReq);
      setQcmsList(qcmsReq);
    }
    getQcmInQcmScreen();
  }, []);

//   useEffect( () => {
// //     if (searchQuery.length > 3) {
// //     setActiveSearch(true);
// //       const queryOrder ='search='+searchQuery+'&order=createdAt:DESC';
// //       handleSearch(queryOrder);

// //     } else {
// //       setActiveSearch(false);
// //     }
//   }, [searchQuery]);


//   async function handleSearch(query) {
//       if (activeSearch) {
//       const searchReq = await searchCourse(query);
//       setSearchData(searchReq);
//     }
//   }

  


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["purple", "#02254F", "#2D84EA"]}
        style={styles.containerGradient}
      >
        <Searchbar
          style={{
            borderRadius: 30,
            width: "90%",
            marginTop: 30,
            marginBottom: 30,
            marginHorizontal: "5%",
            // zIndex: 1000,
          }}
          onChangeText={(query) => {
            setSearchQuery(query);
          }}
          placeholder="Rechercher un QCM"
          icon={require("../assets/logo/search.png")}
        />

            <ScrollView>
          <View style={styles.sectionLatestCourse}>
            <Text style={styles.titleSection}>Les derniers QCM</Text>
            <View>
                {qcmsList.map((qcm) => (
                    <QcmCard
                        key={qcm.id}
                        qcm={qcm}
                        navigation={navigation}
                    />  
                ))}
            </View>
            
          </View>
            </ScrollView>
       
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
    // height: 150,
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
  searchInfo: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionLatestCourse: {
    marginTop: 30,
    marginBottom: 40,

  },
  titleSection: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 20,
  }

});

