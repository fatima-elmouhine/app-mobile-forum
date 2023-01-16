import React from 'react'
import { StyleSheet, Text,Dimensions, View, ScrollView, ImageBackground, Linking} from 'react-native';
import {  Card, Divider, Button } from 'react-native-paper';

export default function CourseCardComponent(props) {
    // console.log('COURSEEEEE',props.course.Theme.title)
    // const windowWidth = Dimensions. get('window')
    // console.log(windowWidth)
  return (
    
    <Card style={styles().container}>
            <Card.Content style={styles.containerText}>
                <Text style={styles.title}>
                    {props.course.Theme.title}
                </Text>
                <Text color='pink' style={styles.title}>
                    {props.course.title}
                </Text>
            <Divider style={{borderColor:'#e7e7e7' ,borderWidth:0.5, margin:10}} />
            </Card.Content>
            <View>

                <Button icon="eye" mode='contained-tonal'    onPress={() => Linking.openURL(props.course.link)} >Voir</Button>
            </View>
      


    </Card>
  )
}
const styles = (bgColor) =>  StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
        marginHorizontal: 16,
    },
    btn: {
        // position: 'absolute',
        // right: 0,
        // top: 40,
        // // flex: 1,
        // // backgroundColor: 'white',
        // // color: 'black',
        // display: 'flex', 
        // alignItems: 'center',
    },

    containerText: {
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        color: 'pink',
        fontWeight: '600',
    },
    description: {
        fontSize: 15,
    },


});