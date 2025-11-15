// app/(auth)/login.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { saveUser } from "../../utils/storage";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    if (!email || !password) return Alert.alert("Введите email и пароль");
    try {
      // попытка через Firebase (если настроен)
      if (auth) {
        await signInWithEmailAndPassword(auth, email, password);
        await saveUser({ email });
        router.replace("/(tabs)/index");
      } else {
        // fallback local
        await saveUser({ email });
        router.replace("/(tabs)/index");
      }
    } catch (err) {
      // fallback: если не удалось — сохраняем локально
      await saveUser({ email });
      router.replace("/(tabs)/index");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoTrack — Вход</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Пароль" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.btn} onPress={onLogin}><Text style={styles.btnText}>Войти</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/register")}><Text style={styles.link}>Нет аккаунта? Регистрация</Text></TouchableOpacity>
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
