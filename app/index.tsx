import { ImageBackground, Image, StyleSheet, Platform, View, Text, SafeAreaView ,StatusBar} from 'react-native';
import '../global.css'
import beachImage from '@/assets/meditation-images/beach.webp'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import AppGradient from '@/components/AppGradient';

const App = () => {
  const router=useRouter()
  return (
    <View className='flex-1'>
      <ImageBackground source={beachImage} resizeMode='cover' className='flex-1'>
        <AppGradient  colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
        <SafeAreaView className='flex-1 px-1 justify-between'>
            <View>
              <Text className='text-center text-4xl text-white font-bold'>
                Simple Meditation
              </Text>
              <Text className='text-center text-2xl text-white font-regular'>
                Simplifying  Meditation to Everyone
              </Text>
            </View>

            <View>
              <CustomButton onPress={()=>router.push('/nature-meditate')} title='Get Started'/>
            </View>
            <StatusBar style="light"/>
          </SafeAreaView>
        </AppGradient>
        

      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
});

export default App;