import { useState } from 'react';
import { Heading, Text, VStack, useToast } from 'native-base';

import Logo from '../assets/logo.svg'
import { api } from '../services';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export default function New() {
  const [pollTitle, setPollTitle] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const toast = useToast();

  async function handlePollCreate() {
    if(!pollTitle.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão!',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
    try {
      setisLoading(true)

      await api.post('/polls', { title: pollTitle.toUpperCase() })

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      setPollTitle('')

    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível criar o bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setisLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão"/>
      <VStack mt={8} mx={5} alignItems="center">

        <Logo />
        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da copa{'\n'} e compartilhe entre amigos!
        </Heading>


        <Input mb={2} value={pollTitle} placeholder="Qual o nome do seu bolão?" onChangeText={setPollTitle}/>
        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handlePollCreate}
          isLoading={isLoading}
        />

        <Text>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}
