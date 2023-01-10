import React from 'react'
import { StyleSheet, Text,Dimensions, View, ScrollView, ImageBackground, TouchableHighlight} from 'react-native';
import { Button, Card, Divider } from 'react-native-paper';

export default function CourseCardComponent(props) {
    const windowWidth = Dimensions. get('window')
    // console.log(windowWidth)
  return (
    <Card style={styles(props.course.color).container}>
        <Card.Content style={styles.containerText}>
            <Text style={styles.title}>
            {props.course.title}
            </Text>
            <Text style={styles.description}>
                {props.course.description}
            </Text>
        </Card.Content>
        <Divider style={{borderColor:'#e7e7e7' ,borderWidth:0.5, margin:10}} />
        <Card.Actions>

            <Button icon="download" mode='contained-tonal' style={styles.btn}  onPress={() => console.log('Pressed')}>
                Télécharger
            </Button>
        </Card.Actions>


    </Card>
  )
}
const styles = (bgColor) =>  StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        gap:'45px',
        backgroundColor: bgColor,
        // padding: 20,
        margin: 20,
        borderRadius: 8,
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        btn: {
        flex: 1,

            backgroundColor: 'white',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
        },
        // alignItems: 'center',


    },
    containerText: {
        flex: 2,
        borderWidth: 1,
        borderColor: 'red',
        display: 'flex',
        // flexDirection: 'column',
        gap:'10px',
    },
    title: {
        fontSize: 20,
        color: '#434343',
        fontWeight: '600',
    },
    description: {
        fontSize: 15,
    },


});