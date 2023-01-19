import React from 'react'
import { Text, View, Pressable } from 'react-native';
import { Avatar, Button} from 'react-native-paper';
import { getTheme } from '../../api/Themes/getTheme';

export default function CardTheme({id, title, description, navigation, num, key}) {
  // console.log('card theme description', description)
  // console.log('card theme id', id)

  const [isClick, setIsClick] = React.useState(false)
  const themeInfo = {
    id: id,
    title: title,
    description: description
  }
    // async function getOneTheme() {
    //   const themeReq = await getTheme(id)
    //   setTheme(themeReq)
    // }
  React.useEffect(() => {



  }, [isClick])

  if(isClick){
    console.log('card theme isClick', isClick)
    console.log('card theme isClick themeInfo', themeInfo)
    // chooseTheme(themeInfo)
    // chooseTheme(themeInfo)
  }
  const [themeState, setThemeState] = React.useState(null)




  function chooseTheme(themeInfo) {
    console.log('card theme themeInfo', themeInfo)
    navigation.navigate('SectionChoiceScreen', {theme: themeInfo})
  }

  function click(){
    setIsClick(true)
  }
  // console.log('card theme themeInfo', theme)
        return (
          <View style={{display:'flex', alignItems:'center', marginTop:30}}>
            {console.log('card theme themeInfo 2', themeInfo)}
            <Pressable  onPress={()=>chooseTheme(themeInfo)}>
                <Avatar.Text size={num ? 120 : 80} style={{marginLeft:15, marginBottom:20, backgroundColor:'#caca'}} label={
                <Text >
                    {title}
                </Text>
                } />
    
            </Pressable>
            <Text style={{marginLeft:15, marginBottom:50, color:'white', fontWeight:'bold', fontSize:16}}>{title}</Text>
          </View>
            
  
              
        )
}
