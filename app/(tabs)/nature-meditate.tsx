import { View, Text, StatusBar, FlatList, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import AppGradient from '@/components/AppGradient'
import {MEDITATION_DATA} from '@/constants/MeditationData'
import MEDITATION_IMAGES from '@/constants/meditation-images'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
const NatureMeditate = () => {
  return (
    <View className='flex-1 '>
      <AppGradient colors={["#161b2e","#0a4d4a","#766e67"]}>
         <View className='my-6' >
         <Text className='text-gray-200 mb-3 text-4xl font-semibold'>Welcome Shoity</Text>
         <Text className='text-gray-200 text-xl font-semibold'>Start your Meditation Practice Today</Text>
         </View>

         <View className='mb-20'>
            <FlatList data={MEDITATION_DATA}
             className='mb-20'
             showsVerticalScrollIndicator={false}
             keyExtractor={(item)=>item.id.toString()}
             renderItem={({item})=>(<Pressable onPress={()=>router.push(`/meditate/${item?.id}`) } className='h-48 my-3 rounded-md overflow-hidden'>

              <ImageBackground 
              source={MEDITATION_IMAGES[item.id-1]}
              resizeMode='cover'
              className='flex-1 rounded-lg justify-center'>
                <LinearGradient className='flex-1 justify-center items-center' colors={["transparent", "rgba(0,0,0,0.8)"]}>
                <Text className='text-3xl text-gray-100 font-bold text-center'>{item.title}</Text>
                </LinearGradient>
                  
              </ImageBackground>
             </Pressable>)}
             />
         </View>
      
      </AppGradient>
      <StatusBar barStyle="light-content"/>
    </View>
  )
}

export default NatureMeditate