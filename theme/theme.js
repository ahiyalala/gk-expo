
import { StyleSheet} from 'react-native';

const greenkleanYellow = '#e2e100';
const white = '#fff';

export const colors = {
    brandYellow: greenkleanYellow,
    white:white,
    black:'#000',
    offColor:'rgba(255,255,255,0.7)',
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
        backgroundColor:'transparent',
        padding:20,
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