// app/(tabs)/index.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getActivities, getUser } from "../../utils/storage";
import { useRouter } from "expo-router";
import axios from "axios";

export default function HomeScreen() {
  const [todayScore, setTodayScore] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [tip, setTip] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const u = await getUser();
      setUserEmail(u?.email ?? null);
      const acts = await getActivities();
      if (acts && acts.length > 0) {
        setTodayScore(acts[0].score);
      }
      fetchTip();
    };
    load();
  }, []);

  const fetchTip = async () => {
    try {
      // замените API_KEY если используете api-ninjas
      const res = await axios.get("https://api.api-ninjas.com/v1/quotes?category=environmental", {
        headers: { "X-Api-Key": "YOUR_API_NINJAS_KEY" }
      });
      if (res.data && res.data.length > 0) setTip(res.data[0].quote);
    } catch (e) {
      setTip("Сохраняйте энергию — выключайте свет, когда выходите из комнаты.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hi}>Привет, {userEmail ? userEmail.split("@")[0] : "Эко-герой"} 🌿</Text>
      <Text style={styles.small}>EcoScore за сегодня</Text>
      <Text style={styles.score}>{todayScore ?? "-"}</Text>

      <TouchableOpacity style={styles.addBtn} onPress={() => router.push("/(tabs)/tracker")}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Добавить активность</Text>
      </TouchableOpacity>

      <View style={styles.tipBox}>
        <Text style={{ fontWeight: "700", marginBottom: 8 }}>Совет дня</Text>
        <Text>{tip}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  hi: { fontSize: 22, fontWeight: "700", marginBottom: 6 },
  small: { color: "#555" },
  score: { fontSize: 42, fontWeight: "800", marginTop: 10, marginBottom: 16, color: "#2e8b57" },
  addBtn: { backgroundColor: "#2e8b57", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 6 },
  tipBox: { marginTop: 20, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#eee" }
});
