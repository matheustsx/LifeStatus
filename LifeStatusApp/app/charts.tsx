import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

export default function ChartsScreen() {
  const [selectedMonth, setSelectedMonth] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2024');

  const months = [
    { label: 'Janeiro', value: '1' },
    { label: 'Fevereiro', value: '2' },
    { label: 'Março', value: '3' },
    { label: 'Abril', value: '4' },
    { label: 'Maio', value: '5' },
    { label: 'Junho', value: '6' },
    { label: 'Julho', value: '7' },
    { label: 'Agosto', value: '8' },
    { label: 'Setembro', value: '9' },
    { label: 'Outubro', value: '10' },
    { label: 'Novembro', value: '11' },
    { label: 'Dezembro', value: '12' },
  ];

  const years = ['2022', '2023', '2024', '2025'];

  return (
    <LinearGradient
      colors={['#FAEDCB', '#C9E4DE', '#C6DEF1', '#DBCDF0', '#F2C6DE', '#F7D9C4']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Estatísticas</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            Acompanhe suas estatísticas de atividades realizadas ao longo do tempo. 
            Selecione o mês e ano para visualizar seus dados.
          </Text>

          <View style={styles.selectorsContainer}>
            <View style={styles.selectorWrapper}>
              <Text style={styles.selectorLabel}>Mês:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedMonth}
                  onValueChange={setSelectedMonth}
                  style={styles.picker}
                >
                  {months.map(month => (
                    <Picker.Item key={month.value} label={month.label} value={month.value} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.selectorWrapper}>
              <Text style={styles.selectorLabel}>Ano:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedYear}
                  onValueChange={setSelectedYear}
                  style={styles.picker}
                >
                  {years.map(year => (
                    <Picker.Item key={year} label={year} value={year} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>
              Atividades - {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
            </Text>
            <View style={styles.chartPlaceholder}>
              <View style={styles.chartBar}>
                <View style={styles.barLabel}>
                  <Text style={styles.barText}>Aceitas</Text>
                  <Text style={styles.barPercentage}>75%</Text>
                </View>
                <View style={styles.barContainer}>
                  <View style={[styles.bar, styles.acceptedBar, { width: '75%' }]} />
                </View>
              </View>
              
              <View style={styles.chartBar}>
                <View style={styles.barLabel}>
                  <Text style={styles.barText}>Recusadas</Text>
                  <Text style={styles.barPercentage}>25%</Text>
                </View>
                <View style={styles.barContainer}>
                  <View style={[styles.bar, styles.rejectedBar, { width: '25%' }]} />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.mascotContainer}>
            <Text style={styles.mascotEmoji}>🤖</Text>
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>
                O ícone de gráfico mostra em dados, mensalmente e anualmente, 
                quantas vezes em porcentagem você aceitou ou não realizar as atividades propostas
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  selectorsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  selectorWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  picker: {
    height: 50,
  },
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    minHeight: 300,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
  },
  chartBar: {
    marginBottom: 30,
  },
  barLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  barText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  barPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B7BB8',
  },
  barContainer: {
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 15,
  },
  acceptedBar: {
    backgroundColor: '#4ECDC4',
  },
  rejectedBar: {
    backgroundColor: '#FF6B6B',
  },
  mascotContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 15,
    padding: 20,
  },
  mascotEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  speechBubble: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    position: 'relative',
  },
  speechText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});