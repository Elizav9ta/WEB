// app/(tabs)/tracker.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { calculateEcoScore } from "../../utils/ecoScoreCalc";
import { saveActivity, getUser } from "../../utils/storage";
import { useRouter } from "expo-router";
import { db } from "../../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function TrackerScreen() {
  const [transport, setTransport] = useState<string>("walk");
  const [diet, setDiet] = useState<string>("vegan");
  const [plastic, setPlastic] = useState<number>(0);
  const router = useRouter();

  const transports = [
    { id: "walk", label: "🚶 Пешком" },
    { id: "bike", label: "🚲 Велосипед" },
    { id: "public", label: "🚆 Транспорт" },
    { id: "car", label: "🚗 Авто" }
  ];

  const diets = [
    { id: "vegan", label: "🥗 Веган" },
    { id: "vegetarian", label: "🌱 Вегетарианец" },
    { id: "meat", label: "🍖 Мясо" }
  ];

  const onSave = async () => {
    const score = calculateEcoScore(transport, diet, plastic);
    const user = await getUser();
    const activity = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      transport,
      diet,
      plastic,
      score,
      user: user?.email ?? null
    };
    // save locally
    await saveActivity(activity);

    // try to save to Firestore (if configured)
    try {
      if (db) {
        const col = collection(db, "activities");
        await addDoc(col, activity);
      }
    } catch (e) {
      // ignore Firestore errors (offline fallback)
    }

    router.replace("/(tabs)/index");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добавить активность</Text>

      <Text style={styles.section}>Транспорт</Text>
      <View style={styles.row}>
        {transports.map((t) => (
          <TouchableOpacity key={t.id} style={[styles.option, transport === t.id && styles.selected]} onPress={() => setTransport(t.id)}>
            <Text>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>Питание</Text>
      <View style={styles.row}>
        {diets.map((d) => (
          <TouchableOpacity key={d.id} style={[styles.option, diet === d.id && styles.selected]} onPress={() => setDiet(d.id)}>
            <Text>{d.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>Использование пластика: {plastic}</Text>
      <View style={{ flexDirection: "row", gap: 10, marginVertical: 8 }}>
        <TouchableOpacity style={styles.stepBtn} onPress={() => setPlastic(Math.max(0, plastic - 1))}><Text>-</Text></TouchableOpacity>
        <TouchableOpacity style={styles.stepBtn} onPress={() => setPlastic(Math.min(5, plastic + 1))}><Text>+</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={onSave}><Text style={{ color: "#fff", fontWeight: "700" }}>Сохранить день</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  section: { marginTop: 12, fontWeight: "600" },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  option: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd", marginRight: 8, marginBottom: 8 },
  selected: { backgroundColor: "#e6f4ea", borderColor: "#2e8b57" },
  stepBtn: { padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
  saveBtn: { marginTop: 20, backgroundColor: "#2e8b57", padding: 12, borderRadius: 8, alignItems: "center" }
});
