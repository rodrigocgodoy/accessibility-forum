import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// #6BBB7E TODO: Color primary

const Forum = () => {
  const { userInfo } = useAuth();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [posts, setPosts] = useState<any>();
  const [valueDescription, setValueDescription] = useState<string>('');

  const saveValue = async () => {
    const userInfoData = {
      title: valueDescription,
      ...userInfo?.data,
      urlProfile: userInfo?.data?.picture?.data?.url,
      id_user: userInfo?.data?.id
    };
    delete userInfoData.picture;
    delete userInfoData.id;
    const { data } = await api.post('posts', userInfoData);
    setPosts([data, ...posts]);
  };

  const name = userInfo?.data?.name;
  const imageUrl = userInfo?.data?.picture?.data?.url;

  useEffect(() => {
    (async () => {
      const { data } = await api.get('posts');
      setPosts(data);
    })();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: windowHeight,
        width: windowWidth,
        backgroundColor: 'white',
        padding: 20
      }}
    >
      <View style={{ padding: 25 }}>
        <Text style={{ fontSize: 25 }}>
          Seja bem vindo,{' '}
          <Text
            style={{
              color: '#6BBB7E',
              fontWeight: 'bold'
            }}
          >
            {name}
          </Text>
        </Text>
        <Text style={{ fontSize: 14, marginTop: 10 }}>
          adicionar um novo post
        </Text>
      </View>
      <View style={{ padding: 25, paddingTop: 5 }}>
        <TextInput
          placeholder="Digite algo..."
          onChangeText={(e) => setValueDescription(e)}
          style={{
            width: windowWidth - 50,
            marginBottom: 10,
            height: 55,
            borderRadius: 5,
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            color: 'gray',
            padding: 15
          }}
        />
      </View>
      <View
        style={{
          width: windowWidth,
          alignItems: 'flex-end',
          paddingRight: 25,
          justifyContent: 'center'
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: valueDescription ? '#6BBB7E' : 'white',
            borderColor: !valueDescription && '#6BBB7E',
            borderWidth: !valueDescription && 0.5,
            width: 'auto',
            height: 40,
            paddingRight: 20,
            paddingLeft: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5
          }}
          onPress={() => saveValue()}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                color: valueDescription ? 'white' : '#6BBB7E'
              }}
            >
              Publicar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          margin: 25,
          marginBottom: 0,
          width: 'auto'
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: 'gray',
            fontWeight: 'bold'
          }}
        >
          Publicações
        </Text>
      </View>
      <FlatList
        style={{
          margin: 25,
          marginTop: 15,
          width: windowWidth - 50,
          flex: 1
        }}
        data={posts}
        keyExtractor={({ _id: idPost }) => idPost}
        renderItem={({ item: { _id: idPost, name: namePost, title } }) => (
          <View
            key={idPost}
            style={{
              flex: 1,
              flexDirection: 'row',
              borderTopWidth: 0.5,
              borderColor: 'gray',
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <Image
              source={{ uri: imageUrl }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                marginRight: 15
              }}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}
              >
                {namePost}
              </Text>
              <Text style={{ fontSize: 14, color: 'gray' }}>{title}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Forum;
