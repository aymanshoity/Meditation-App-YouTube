import { View, Text, ImageBackground, Pressable, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams,router } from 'expo-router'
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory'
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallary'
import AppGradient from '@/components/AppGradient'
import Ionicons from '@expo/vector-icons/Ionicons';
const AffirmationPractice = () => {
   const {itemId}=useLocalSearchParams()
   const [affirmation,setAffirmation]=useState<GalleryPreviewData>()
   const [sentence,setSentences]=useState<string[]>([])
   useEffect(()=>{
      // console.log(itemId)
      for(let idx=0;idx<AFFIRMATION_GALLERY.length;idx++){
         const affirmationData=AFFIRMATION_GALLERY[idx].data;
         const affirmationtoStart=affirmationData.find((a)=>a?.id ===Number(itemId))
         if(affirmationtoStart){
            // console.log('paisi')
             setAffirmation(affirmationtoStart)
             const affirmationArray=affirmationtoStart.text.split(".")
             if(affirmationArray[affirmationArray.length-1]===""){
               affirmationArray.pop()
             }
             setSentences(affirmationArray)
             return;
            
         }
      }
   },[])
  return (
    <View className='flex-1'>
      
      <ImageBackground 
       source={affirmation?.image}
        resizeMode='cover'
        className='flex-1'>

         <AppGradient colors={['rgba(0,0,0,.3)','rgba(0,0,0,.9)']}>
            
            <Pressable onPress={()=>router.back()} className='absolute left-6 z-10 my-5'>
            <Ionicons name="arrow-back-circle" size={50} color="white" />
            </Pressable>
            <ScrollView className='mt-20' showsVerticalScrollIndicator={false}>
               <View className='h-full justify-center'>
                  <View className=' justify-center'>
                  {sentence?.map((sentence,index)=>(
                     <Text key={index} className='text-white text-2xl mb-12 font-semibold text-justify'>{sentence}</Text>
                     
                  ))}
                        
                  </View>
               </View>
            </ScrollView>
         </AppGradient>
        </ImageBackground>
    </View>
  )
}

export default AffirmationPractice