// app/(tabs)/profile.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getUser, clearUser } from "../../utils/storage";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const u = await getUser();
      setUser(u);
    })();
  }, []);

  const onLogout = async () => {
    try {
      if (auth) await signOut(auth);
    } catch {}
    await clearUser();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль</Text>
      <Text style={{ marginBottom: 8 }}>Email: {user?.email ?? "-"}</Text>

      <TouchableOpacity style={styles.btn} onPress={onLogout}><Text style={{ color: "#fff", fontWeight: "700" }}>Выйти</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  btn: { marginTop: 20, backgroundColor: "#c0392b", padding: 12, borderRadius: 8, alignItems: "center" }
});
