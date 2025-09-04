import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function QuestionnaireScreen() {
  const [hobbies, setHobbies] = useState([]);
  const [customHobby, setCustomHobby] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [customReminder, setCustomReminder] = useState('');

  const hobbyOptions = ['Ler', 'Escrever', 'Desenhar', 'Jogar', 'Colorir', 'Correr'];
  const reminderOptions = [
    { label: '1h', value: '1h' },
    { label: '2h', value: '2h' },
    { label: '3h', value: '3h' },
    { label: 'Personalizar', value: 'custom' }
  ];

  const toggleHobby = (hobby) => {
    if (hobbies.includes(hobby)) {
      setHobbies(hobbies.filter(h => h !== hobby));
    } else {
      setHobbies([...hobbies, hobby]);
    }
  };

  return (
    <LinearGradient
      colors={['#FAEDCB', '#C9E4DE', '#C6DEF1', '#DBCDF0', '#F2C6DE', '#F7D9C4']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>Passo 2 de 2</Text>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Olá usuário, falta pouco para acessar o LiS</Text>
          <Text style={styles.subtitle}>Responda o questionário para começar</Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>O que você gosta de fazer no tempo livre?</Text>
          <View style={styles.hobbiesContainer}>
            {hobbyOptions.map((hobby, index) => (
              <TouchableOpacity
                key={hobby}
                onPress={() => toggleHobby(hobby)}
                style={[
                  styles.hobbyButton,
                  hobbies.includes(hobby) && styles.selectedHobby
                ]}
              >
                <Text style={[
                  styles.hobbyText,
                  hobbies.includes(hobby) && styles.selectedHobbyText
                ]}>
                  {hobby}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Outro (especifique)"
            value={customHobby}
            onChangeText={setCustomHobby}
          />
        </View>

        <View style={styles.mascotContainer}>
          <Text style={styles.mascotText}>🤖 Aqui ficará a mascote do app</Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>De quantas em quantas horas gostaria de um lembrete para pausa?</Text>
          <View style={styles.reminderContainer}>
            {reminderOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setReminderTime(option.value)}
                style={[
                  styles.reminderButton,
                  reminderTime === option.value && styles.selectedReminder
                ]}
              >
                <Text style={[
                  styles.reminderText,
                  reminderTime === option.value && styles.selectedReminderText
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {reminderTime === 'custom' && (
            <TextInput
              style={[styles.input, styles.customInput]}
              placeholder="Ex: 30 minutos, 1.5 horas"
              value={customReminder}
              onChangeText={setCustomReminder}
            />
          )}
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Dica</Text>
          <Text style={styles.tipsText}>Suas respostas nos ajudam a personalizar lembretes e sugestões para melhorar seu bem-estar digital</Text>
        </View>

      </ScrollView>
      
      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/dashboard')}>
        <Text style={styles.nextButtonText}>Finalizar</Text>
      </TouchableOpacity>
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
    width: '100%',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  hobbyButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  selectedHobby: {
    backgroundColor: '#8B7BB8',
    borderColor: '#8B7BB8',
  },
  hobbyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedHobbyText: {
    color: '#fff',
  },
  reminderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  reminderButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  selectedReminder: {
    backgroundColor: '#8B7BB8',
    borderColor: '#8B7BB8',
  },
  reminderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedReminderText: {
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  customInput: {
    marginTop: 15,
  },
  tipsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
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
  mascotContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  mascotText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  nextButton: {
    width: 100,
    height: 50,
    backgroundColor: '#8B7BB8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});