import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet,Text,View,Alert,TextInput,Button,ScrollView,Pressable,} 
from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const registrarCredencial = () => {
    if (nome.trim() === '') {
      Alert.alert('Atenção', 'Digite seu nome de desenvolvedor antes de registrar.');
      return;
    }
    Alert.alert(
      'Credencial registrada!',
      `Desenvolvedor: ${nome.trim()}\nNível: ${isAdmin ? 'Acesso Total (Admin)' : 'Acesso Básico'}`
    );
  };

  const aoSegurarElemento = (n: number) => {
    if (isAdmin) {
      Alert.alert(`Elemento ${n}`, 'Modo Admin: deseja remover este elemento?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => Alert.alert('Removido', `Elemento ${n} removido (simulação).`),
        },
      ]);
    } else {
      Alert.alert('Acesso negado', 'Ative o Modo Admin para executar esta ação.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.headerTitle} selectable={true}>
            DevBadge Profile
          </Text>
        </View>

        <View style={styles.textComposition}>
          <Text style={styles.baseText}>
            Status do sistema: <Text style={styles.highlightText}>Online </Text>
          </Text>
        </View>

        <Text
          style={styles.hint}
          onPress={() => console.log('Pressionamento rapido')}
          onLongPress={() => Alert.alert('Dica', 'Preencha seus dados abaixo.')}
        >
          (Pressione e segure para dicas)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome de desenvolvedor..."
          placeholderTextColor="#8B949E"
          value={nome}
          onChangeText={setNome}
        />

        <View style={styles.buttonWrapper}>
          <Button title="REGISTRAR CREDENCIAL" color="#58A6FF" onPress={registrarCredencial} />
        </View>

        <View style={styles.switchCard}>
          <Text style={styles.baseText}>Ativar Modo Admin?</Text>
          <Switch
            value={isAdmin}
            onValueChange={setIsAdmin}
            trackColor={{ false: '#30363D', true: '#3FB950' }}
            thumbColor="#fff"
          />
        </View>

        <View style={[styles.badge, isAdmin ? styles.badgeAdmin : styles.badgeBasic]}>
          <Text style={[styles.badgeText, isAdmin && styles.highlightText]}>
            {isAdmin ? 'Acesso Total (Admin)' : 'Acesso Básico'}
          </Text>
        </View>

        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Pressable
            key={n}
            style={({ pressed }) => [styles.elemento, pressed && { opacity: 0.6 }]}
            onPress={() => Alert.alert(`Elemento ${n}`, `Você tocou no Elemento ${n}.`)}
            onLongPress={() => aoSegurarElemento(n)}
          >
            <Text style={styles.elementoText}>Elemento {n}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  content: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#58A6FF',
    backgroundColor: '#0D1117',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#3FB950',
  },
  textComposition: {
    marginBottom: 20,
  },
  baseText: {
    color: '#fff',
    fontSize: 16,
  },
  highlightText: {
    color: '#3FB950',
    fontWeight: 'bold',
  },
  hint: {
    color: '#fff',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#58A6FF',
    borderRadius: 8,
    backgroundColor: '#161B22',
    color: '#fff',
    paddingHorizontal: 12,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 14,
    borderRadius: 6,
    overflow: 'hidden',
  },
  switchCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#161B22',
    borderRadius: 10,
    padding: 14,
    marginTop: 24,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: 24,
    marginBottom: 12,
  },
  badgeBasic: {
    borderColor: '#8B949E',
  },
  badgeAdmin: {
    borderColor: '#3FB950',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  elemento: {
    width: 120,
    height: 60,
    borderWidth: 1,
    borderColor: '#58A6FF',
    borderRadius: 8,
    backgroundColor: '#161B22',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  elementoText: {
    color: '#58A6FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});