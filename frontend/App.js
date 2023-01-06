import React from 'react'
import Index from './index'
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
    return(
        <React.StrictMode>
            <View>
                <Index />
            </View>
        </React.StrictMode>
    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals