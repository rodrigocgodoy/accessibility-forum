import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Image } from 'react-native';
import { useAuth } from '../../contexts/auth';

import { Container, LoginButton, LoginText, Title, Space } from './styles.ts';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Home = ({
  navigation
}: StackScreenProps<RootStackParamList, 'Login'>) => {
  const { useSignInFacebook } = useAuth();

  return (
    <Container>
      <Image
        source={require('../../../assets/nature.png')}
        style={{ height: 250, width: 250, borderRadius: 125 }}
      />
      <Title>Seja bem vindo á plataforma Accessibility Fórum</Title>
      <LoginButton
        name="facebook"
        backgroundColor="#3b5998"
        onPress={() => useSignInFacebook(navigation)}
      >
        <LoginText>Entrar com Facebook</LoginText>
      </LoginButton>
      <Space />
      <LoginButton
        name="google"
        backgroundColor="#c94130"
        color="#ccc"
        onPress={() => alert('Funcionalidade não disponivel no momento')}
      >
        <LoginText>Entrar com Google</LoginText>
      </LoginButton>
    </Container>
  );
};

export default Home;
