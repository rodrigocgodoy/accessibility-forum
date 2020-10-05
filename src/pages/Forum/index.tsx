import React from 'react';
import { Text, View, Image } from 'react-native';

import { useAuth } from '../../contexts/auth';

const Forum = () => {
  const { userInfo } = useAuth();

  const name = userInfo?.data?.name;
  const imageUrl = userInfo?.data?.picture?.data?.url;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={{ uri: imageUrl }}
        style={{ height: 250, width: 250, borderRadius: 125 }}
      />
      <Text>{name}</Text>
    </View>
  );
};

export default Forum;
