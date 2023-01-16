import React from 'react'
import { Text, View, StyleSheet} from 'react-native';
import {  IconButton} from 'react-native-paper';

export default function SearchHeaderCard({table, count, handleSetExpanded}) {
    const [ expanded, setExpanded ] = React.useState(false)

    React.useEffect(() => {
        handleSetExpanded(expanded)
    }, [expanded])
        return (
          <View style={{ 
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'baseline',
            justifyContent: 'space-around',
            }}>
     
          <Text style={styles.searchInfo}>
            #{table} : {count} correspondance{count>1 && 's'}
          </Text>
          <IconButton
              style={{
                bottom: 5, right: 0, transition: 'all 0.1s ease-in-out',
                transform: [{ rotate: expanded === false? '0deg' : '180deg' }]}
              }
              icon="triangle"
              iconColor={count>0 ? 'orange' : 'transparent'}
              size={17}
              onPress={() => setExpanded(!expanded)}
            />
          </View>
        )
}
const styles = StyleSheet.create({
    searchInfo: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  })  