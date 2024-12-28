import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Context from './Context';

const AppGradient = ({children,colors}:{children:any;colors:string[]}) => {
  return (
    <LinearGradient colors={colors} className='flex-1'>
      <Context>{children}</Context>
    </LinearGradient>
  )
}

export default AppGradient