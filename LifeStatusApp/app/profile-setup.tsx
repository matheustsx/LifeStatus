import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ProfileSetupScreen() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [customGender, setCustomGender] = useState('');
  const [age, setAge] = useState('');
  const [birthDate, setBirthDate] = useState('');

  return (
    <LinearGradient
      colors={['#FAEDCB', '#C9E4DE', '#C6DEF1', '#DBCDF0', '#F2C6DE', '#F7D9C4']}
      style={styles.container}
    >
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.progressText}>Passo 1 de 2</Text>
      </View>
      
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Vamos nos conhecer!</Text>
        <Text style={styles.subtitle}>Adicione uma foto e conte um pouco sobre você</Text>
      </View>
      
      <TouchableOpacity style={styles.photoButton}>
        <Ionicons name="camera" size={40} color="#666" />
      </TouchableOpacity>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        
        <View style={styles.genderContainer}>
          <TouchableOpacity 
            style={[styles.genderButton, gender === 'masculino' && styles.selectedGender]}
            onPress={() => setGender('masculino')}
          >
            <Text style={styles.genderText}>Masculino</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.genderButton, gender === 'feminino' && styles.selectedGender]}
            onPress={() => setGender('feminino')}
          >
            <Text style={styles.genderText}>Feminino</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.genderButton, gender === 'outro' && styles.selectedGender]}
            onPress={() => setGender('outro')}
          >
            <Text style={styles.genderText}>Outro</Text>
          </TouchableOpacity>
        </View>
        
        {gender === 'outro' && (
          <TextInput
            style={styles.input}
            placeholder="Especificar gênero"
            value={customGender}
            onChangeText={setCustomGender}
          />
        )}
        
        <View style={styles.rowInputs}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Idade"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Data de nascimento"
            value={birthDate}
            onChangeText={setBirthDate}
          />
        </View>
        
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Dica</Text>
          <Text style={styles.tipsText}>Essas informações nos ajudam a personalizar sua experiência no LifeStatus</Text>
        </View>
      </View>
      
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Pular</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/questionnaire')}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#8B7BB8',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  photoButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  formContainer: {
    flex: 1,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedGender: {
    backgroundColor: '#8B7BB8',
  },
  genderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  tipsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tipsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    width: 100,
    height: 50,
    backgroundColor: '#8B7BB8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});