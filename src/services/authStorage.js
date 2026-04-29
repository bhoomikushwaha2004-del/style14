import  AsyncStorage  from "@react-native-async-storage/async-storage"

export const saveUser = async (user)=> {
    try{
        await AsyncStorage.setItem('user',JSON.stringify(user))
    } catch (e) {
        console.log('Save user error', e);
        
    }
} 

export const getUser = async () => {
    try {
        const data = await AsyncStorage.getItem('user')
        return data ? JSON.parse(data) : null
    } catch (e) {
        console.log('Get user error =', e);
        
    }
}

export const logoutUser = async () => {
    await AsyncStorage.removeItem('user')
}