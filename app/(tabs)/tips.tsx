// app/(tabs)/tips.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

export default function TipsScreen() {
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTips = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.api-ninjas.com/v1/quotes?category=environmental", {
        headers: { "X-Api-Key": "YOUR_API_NINJAS_KEY" }
      });
      if (Array.isArray(res.data)) {
        setTips(res.data.map((it: any) => it.quote));
      }
    } catch (e) {
      setTips(["Не удалось получить советы — проверьте ключ API", "Старайтесь сокращать использование пластика"]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTips(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Советы по экологии</Text>
      {loading ? <ActivityIndicator /> : (
        tips.map((t, i) => <View key={i} style={styles.card}><Text>{t}</Text></View>)
      )}
      <TouchableOpacity onPress={fetchTips} style={styles.btn}><Text style={{ color: "#fff" }}>Обновить советы</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  card: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#eee", marginBottom: 10 },
  btn: { backgroundColor: "#2e8b57", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 }
});
