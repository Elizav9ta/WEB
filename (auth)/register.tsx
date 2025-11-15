// app/(auth)/register.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { saveUser } from "../../utils/storage";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async () => {
    if (!email || !password) return Alert.alert("Введите email и пароль");
    try {
      if (auth) {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      await saveUser({ email });
      router.replace("/(tabs)/index");
    } catch (err: any) {
      Alert.alert("Ошибка регистрации", err.message || String(err));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoTrack — Регистрация</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Пароль" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.btn} onPress={onRegister}><Text style={styles.btnText}>Зарегистрироваться</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}><Text style={styles.link}>Назад</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 8, marginBottom: 10 },
  btn: { backgroundColor: "#2e8b57", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 6 },
  btnText: { color: "#fff", fontWeight: "600" },
  link: { marginTop: 12, textAlign: "center", color: "#2e8b57" }
});
