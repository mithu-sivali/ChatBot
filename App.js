import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from "react";
import axios from 'axios';
import {OpenAI} from "openai";


function App() {
  const [prompt, setPrompt] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);
  const openai = new OpenAI(
    {
      apiKey: 'dummy-key',
      dangerouslyAllowBrowser: true,
    }
  );
  async function generateAnswer() {
    setIsLoading(true);
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant. " + prompt }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0].message.content);
    setResponse(completion.choices[0].message.content);

    setIsLoading(false);

  }
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={newText => setPrompt(newText)}
        value={prompt}
      />
      <Pressable
        title={isLoading ? "Generating..." : "Generate Convo"}
        disabled={isLoading}
        onPress={() => generateAnswer()}
        style={styles.button}
      >
        <Text style={styles.buttontext}>{isLoading ? "Generating..." : "Generate Answer"}</Text>
      </Pressable>
      {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
      {isLoading && <ActivityIndicator size="large" />}
      <Text>{response}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default App;
