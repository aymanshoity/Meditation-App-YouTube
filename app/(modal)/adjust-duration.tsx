import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import AppGradient from '@/components/AppGradient'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { TimerContext } from '@/context/Timer-Context'

const AdjustDuration = () => {
   const {setDuration}=useContext(TimerContext)
   const handleDuration=(duration:number)=>{
      setDuration(duration)
      router.back()
   }
  return (
    <View className='flex-1 relative'>
      <AppGradient colors={['#161b2e','#0a4d4a','#766e67']}>
      <Pressable onPress={() => router.back()} className='absolute top-16 left-6'>
                  <Ionicons name="arrow-back-circle" size={50} color="white" />
               </Pressable>
               <View className='justify-center h-4/5'>
                     <Text className='text-3xl my-5 font-bold text-white text-center mb-8'>Adjust Meditation Duration</Text>
                     <View className='my-5'>
                  <CustomButton containerStyles='mb-5' title='10sec' onPress={() => handleDuration(10)} />
                  <CustomButton containerStyles='mb-5' title='5 minutes' onPress={() => handleDuration(5*60)} />
                  <CustomButton containerStyles='mb-5' title='10 minutes' onPress={() => handleDuration(10*60)} />
                  <CustomButton title='15 minutes' onPress={() => handleDuration(15*60)} />
               </View>
               
               </View>

               
      
      </AppGradient>
      
    </View>
  )
}

export default AdjustDuration