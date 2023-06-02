import React,{Component}from "react";
import{
    View,
    Text,
    Flatlist,
    Stylesheet,
    Alert,
    Safeareaview,
} from
"react-native";
import{listitem} from "react-native-elements";
import axios from "axios";

export default class Homescreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            listData: [],
            url : "http://localhost:5000/"
        };
    }

    ComponentDidMount(){
        this.getplanets();
        
    }
    getplanets = () => {
        const {url} = this.state;
        axios
        .get(url)
        .then(response =>{
            return this.setState({
                listData: response.data.data
            });
        }) 
.catch(error => {
    Alert.alert(error.message);
});
        
    };

   renderItem = ({item,index})  =>(
    <listitem
    key = {index}
    title = {`planet:${item.name}`}
    subtitle={`Distance from earth : ${item.distance_from_earth}`}
     titleStyle = {Styles.title}
     containerStyle = {Styles.listContainer}
    bottonDivider
    chevron
    onPress = {() => 
        this.props.navigation.navigate("Details", {planet_name: item.name})
    }
   />
    );
keyExtractor = (item,index) => index.toString();

render(){
    const{listData} = this.state;

    if (listData.length === 0){
        return(
            <View Style = {Styles.emptyContainer}>
            <Text>
                loading
              </Text>
                
            </View>
        );
    }
    return(
        <View  Style = {Styles.container}>
        <Safeareaview/>
        <View Style = {StyleSheet.upperContainer}>

            <Text Style = {Styles.headerText}> Planets World     </Text>
            </View>  
          <View Style = {Styles.lowerContainer}>
            <Flatlist/> 
          </View>
          
        </View>
    )
}

    
}
