import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MEDITATION_IMAGES from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { router, useLocalSearchParams } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import CustomButton from '@/components/CustomButton'
import { Audio } from 'expo-av'
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData'
import { TimerContext } from '@/context/Timer-Context'
const Meditate = () => {
   const { id } = useLocalSearchParams()
   const {duration:secondsRemaining,setDuration}=useContext(TimerContext)
   // const [secondsRemaining, setSecondsRemaining] = useState(10)
   const [isMeditating, setIsMeditating] = useState(false)
   const [audioSound, setAudioSound] = useState<Audio.Sound>()
   const [isPlayingAudio, setIsPlayingAudio] = useState(false)
   useEffect(() => {
      let timerId: NodeJS.Timeout;

      if (secondsRemaining === 0) {
         setIsMeditating(false)
         return;
      }

      if (isMeditating) {
         timerId = setTimeout(() => setDuration(secondsRemaining - 1), 1000);

      }
      return () => {
         clearTimeout(timerId)
      }

   }, [secondsRemaining, isMeditating])

   useEffect(() => {
      return () => {
         if (audioSound) {
            setDuration(10)
            audioSound.stopAsync() // Explicitly stop the audio
            audioSound.unloadAsync() // Unload the audio to release resources
         }
          
            
        
      };
    }, [audioSound]);

   const toggleMeditatioSessionStatus = async () => {
      if (secondsRemaining === 0) setDuration(10)

      setIsMeditating(!isMeditating)
      await toggleSound()
   }

   const toggleSound = async () => {
      const sound = audioSound ? audioSound : await initializeSound();

      const status = await sound?.getStatusAsync();
      if (status?.isLoaded && !isPlayingAudio) {
         await sound.playAsync()
         setIsPlayingAudio(true)
      } else {
         await sound.pauseAsync();
         setIsPlayingAudio(false);
      }

   }

   const initializeSound = async () => {

      const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
      console.log(audioFileName)
      if (!audioFileName) throw new Error("Audio file not found!");
      const { sound } = await Audio.Sound.createAsync(
         AUDIO_FILES[audioFileName]
      )
      // console.log(sound)
      setAudioSound(sound)
      return sound;


   }

   const handleAdjustDuration=()=>{
      if(isMeditating) toggleMeditatioSessionStatus()
         router.push('/(modal)/adjust-duration')
   }
   const formattedTimeMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, '0')
   const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, '0')
   return (
      <View className='flex-1'>
         <ImageBackground source={MEDITATION_IMAGES[Number(id) - 1]} resizeMode='cover' className='flex-1'>
            <AppGradient colors={['transparent', 'rgba(0,0,0,0.8)']}>
               <Pressable onPress={() => router.back()} className='absolute top-16 left-6'>
                  <Ionicons name="arrow-back-circle" size={50} color="white" />
               </Pressable>
               <View className='flex-1 items-center justify-center'>
                  <View className='mx-auto bg-neutral-200  w-44 h-44 rounded-full justify-center items-center'>
                     <Text className='text-4xl text-blue-800 font font-rmono'>{formattedTimeMinutes}:{formattedTimeSeconds}</Text>
                  </View>
               </View>

               <View className='mb-5'>
                  <CustomButton title='Set Duration' onPress={() => handleAdjustDuration()} />
               </View>
               <View className='my-5'>
                  <CustomButton title={isMeditating? 'Stop':'Start Meditation'} onPress={() => toggleMeditatioSessionStatus()} />
               </View>

            </AppGradient>

         </ImageBackground>

      </View>
   )
}

export default Meditate;