//import liraries
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native';
import { styles } from '../../../style';
import { useNavigation } from '@react-navigation/native';

// create a component
const UpdateItem = ({ route }) => {
    const navigation = useNavigation();
    const { itemId } = route.params;
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [data, setData] = useState([]);

    
    // Fetch the single data based on the id
    useEffect(() => {
        async function getSingleData() {
            try {
                const response = await axios.get(`http://10.0.2.2:8000/read/${itemId}`)
                console.log("Data come: ", response.data)
                setTitle(response.data.title)
                setDes(response.data.description)
            } catch (error) {
                console.log("Error is: ", error)
            }
        }
        getSingleData();
    }, []);

    // // Fetch all information to show in webpage after adding new data
    // async function getAllInformation() {
    //     try {
    //         const response = await axios.get('http://10.0.2.2:8000/list/');
    //         setData(response.data);
    //     } catch (error) {
    //         console.log("Something is wrong");
    //     }
    // }

    // Update the information based on the current id
    async function onFormSubmit_for_update() {
        try {
            await axios.put(`http://10.0.2.2:8000/update/${itemId}`, { title: title, description: des });
            navigation.navigate('Items');
        } catch (error) {
            console.log("Something is wrong: ", error);
        }
    }
    // console.log(title, des);

    return (
        <View style={{ marginHorizontal: 30, marginTop: 30 }}>

            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
                <Text style={styles.labelText}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Write Your Title"
                    keyboardType="title"
                />
            </View>

            <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
                <Text style={styles.labelText}>Description</Text>
                <TextInput
                    style={styles.input}
                    value={des}
                    onChangeText={setDes}
                    placeholder="Write Your Description"
                    keyboardType="text-description"
                />
            </View>

            <View style={{ width: 120, alignSelf: 'center', margin: 20 }}>
                <Button title="Update Item" onPress={onFormSubmit_for_update} color="#2980B9" />
            </View>

        </View>
    );
};

// define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     },
// });

//make this component available to the app
export default UpdateItem;
