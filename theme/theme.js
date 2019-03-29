
import { StyleSheet} from 'react-native';

const greenkleanYellow = '#e2e100';
const white = '#fff';

export const colors = {
    brandYellow: greenkleanYellow,
    white:white,
    black:'#000',
    offColor:'#ddd',
}

const remValue = 16;

function rem(value){
    return value * remValue;
}
export const inputs = StyleSheet.create({
    brandBtn: {
        backgroundColor:greenkleanYellow,
        padding:10
    }
});

export const layouting = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    loginContainer:{
        flex: 1,
        backgroundColor: greenkleanYellow,
        paddingTop:100,
        paddingLeft: 50,
        paddingRight:50
    },
    loginBox:{
        height:300,
        backgroundColor:white,
        padding:20,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 5,
    }
  });

export const typography = StyleSheet.create({
    header:{
        fontSize:rem(1.5),
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:15
    }
})