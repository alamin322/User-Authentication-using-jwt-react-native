import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native';
import { styles } from '../../../style';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const ItemsPage = () => {
    const navigation = useNavigation();

    const [data, setData] = useState([]);

    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');


    const clearTextInput = () => {
        setTitle('');
        setDes('');
    };

    // =========================== Retrive the information ==============================
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get("http://10.0.2.2:8000/list/")
            console.log(response.data)
            setData(response.data)
        } catch (e) {
            console.log("The error is: ", e)
        }
    };

    // Fetch all information to show in webpage after adding new data
    async function getAllInformation() {
        try {
            const response = await axios.get('http://10.0.2.2:8000/list/');
            setData(response.data);
        } catch (error) {
            console.log("Something is wrong");
        }
    }


    // ============================ Delete functionality ===========================

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://10.0.2.2:8000/delete/${id}`);
            var newInformation = data.filter((item) => {
                return item.id !== id;
            });
            setData(newInformation);
        } catch (error) {
            console.error(error);
        }
    }

    // ========================= Add functionality =========================
    const addItemHandle = async () => {
        clearTextInput();
        try {
            const response = await axios.post("http://10.0.2.2:8000/create/", { title: title, description: des });

            console.log("Response data: ", response.data);

            getAllInformation();

        } catch (error) {
            console.log("An error occurred creating new Items:", error);
        }
    };

    // For automatically updating the information when this page will be focused
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );


    return (
        <ScrollView keyboardShouldPersistTaps="handled">


            <View style={{ marginHorizontal: 30, marginTop: 15 }}>
                {/* ======================== Add Item ========================= */}
                <View style={[mystyle.inputWithLabel, { marginBottom: 10 }]}>
                    <Text style={styles.labelText}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Write Your Title"
                        keyboardType="title"
                    />
                </View>

                <View style={[mystyle.inputWithLabel, { marginBottom: 10 }]}>
                    <Text style={styles.labelText}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={des}
                        onChangeText={setDes}
                        placeholder="Write Your Description"
                        keyboardType="text-description"
                    />
                </View>

                {/* <View style={{ width: 120, alignSelf: 'center', margin: 20 }}>
                    <Button title="Add Item" onPress={addItemHandle} color="#2980B9" />
                </View> */}

                <TouchableOpacity style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: '#157347',
                    borderRadius: 5,
                    marginLeft: 10,
                    width: 120, alignSelf: 'center', margin: 20,
                }} onPress={addItemHandle}>

                    <Text style={{ textAlign: 'center', color: "#fff" }}>Add Item</Text>

                </TouchableOpacity>

                {/* <View style={[mystyle.inputWithLabel, { marginBottom: 10 }]}>
                    <Text style={styles.labelText}>Email</Text>
                    <TextInput
                        style={styles.input}
                        // value={"som"}
                        onChangeText={console.log("object")}
                        placeholder="Write Your Email"
                        keyboardType="email-address"
                    />
                </View> */}

            </View>

            {/* ======================== Show Items ========================= */}

            <View style={mystyle.container}>
                {data.map((card) => (
                    <View style={mystyle.cardContainer} key={card.id}>

                        {/* <Image source={card.image} style={styles.image} /> */}

                        <Text style={mystyle.title}>{card.title}</Text>
                        {/* <View style={{borderBottomWidth:1, borderBottomColor:'black', width:100}}></View> */}
                        <Text style={mystyle.title2}>{card.description}</Text>

                        <View style={mystyle.buttonContainer}>
                            <TouchableOpacity style={mystyle.button} onPress={() => navigation.navigate('UpdateItem', { itemId: card.id })}>
                                <Text style={mystyle.buttonText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={mystyle.deleteButton} onPress={() => handleDelete(card.id)}>
                                <Text style={mystyle.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                ))}
            </View>


        </ScrollView>
    );
};

const mystyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#fff',
    },
    cardContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
        // paddingHorizontal: 20,
        padding: 20,
        backgroundColor: '#f3f3d3',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    title: {
        flex: 1,
        fontSize: 16,
        textAlign: 'justify',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    title2: {
        flex: 1,
        fontSize: 16,
        textAlign: 'justify',
        marginTop: 13,
        // color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'blue',
        borderRadius: 5,
        marginLeft: 10,
    },

    deleteButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#BB2D3B',
        borderRadius: 5,
        marginLeft: 10,
    },

    updateButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'blue',
        borderRadius: 5,
        marginLeft: 10,
    },
    buttonText: {
        color: 'white',
    },
});


export default ItemsPage;
