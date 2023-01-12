import React from 'react'
import { StyleSheet, Text,Dimensions, View, ScrollView, ImageBackground, Linking} from 'react-native';
import { List, Card, Divider, Button, Avatar, TouchableRipple } from 'react-native-paper';
import { set } from 'react-native-reanimated';

export default function MessageCardComponent(props) {
    const [isLiked, setIsLiked] = React.useState(false);
    function handlePress(){
        setIsLiked(!isLiked)
        console.log(isLiked)
        // console.log('handlePress')
    }
    var colorThumb = isLiked ? 'black' : 'white'

    // console.log('COURSEEEEE',props.message.User.firstName)
    // const windowWidth = Dimensions. get('window')
    // console.log(windowWidth)
  return (
    <View style={styles.card}>
          <List.Item
            style={{backgroundColor:'white', marginBottom:30, marginHorizontal:20, borderRadius:10, padding:10, }}
            title={"Par "+ props.message.User.firstName}
            description={props.message.text}
            // descriptionEllipsizeMode={false}
            descriptionNumberOfLines={1000}
            right={ props => 
                <View style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                    <Text style={{fontSize:12, color:'#9E9E9E'}}>
                        IL YA 20 JRS
                    </Text>
                    <View style={{display:'flex'}}>
                        {/* <Button icon={
                            <Avatar.Icon size={40} color='white' icon={require('../../assets/logo/thumb_black.png')}/>
                        }></Button> */}
                          <TouchableRipple
                            onPress={() =>
                                handlePress()
                            }
                            rippleColor="rgba(0, 0, 0, .32)"
                        >

                            <Avatar.Icon size={40} color={colorThumb} icon={require('../../assets/logo/thumb_black.png')}
                                style={{backgroundColor:'#FFC107', marginRight:10}}
                                

                            />

                        </TouchableRipple>
                    </View>
                </View>
            }
            left={props => <Avatar.Image size={70} source={require('../../assets/img-test/image1.png')}  />}
  />
        {/* <Card style={styles().container}>
                <Card.Content style={styles.containerText}>
                    <View style={styles.headerCard}>
                        <Avatar.Image size={70} source={require('../../assets/img-test/image1.png')}  />
                        <Text style={styles.headerCardTitle}>
                            <Text>
                                {props.message.User.firstName}
                            </Text>
                            <Text  style={styles.title}>
                            IL YA 20 JRS
                            </Text>
                        </Text>
                    </View>
                    <Text style={styles.title}>
                        {props.message.text}
                        
                    </Text>
            
                </Card.Content>
        </Card> */}
    </View>
  )
}
const styles = (bgColor) =>  StyleSheet.create({
    title: {
        fontSize: 14,   
        color: 'white',
    },
    card:{
        display:'flex',
        flexDirection:'row',
        marginBottom:30,
        backgroundColor:'red',
    },
    headerCard:{
        position:'absolute',
        top:0,
        left:0,

        display:'flex',
        backgroundColor:'red',

    },
    headerCardTitle:{
        backgroundColor:'red',
        // display:'flex',
        // flexDirection:'column',s

    },
    containerText:{
        display:'flex',
    }


});