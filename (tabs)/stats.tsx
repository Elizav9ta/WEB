// app/(tabs)/stats.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getActivities } from "../../utils/storage";

export default function StatsScreen() {
  const [activities, setActivities] = useState<any[]>([]);
  useEffect(() => {
    const load = async () => {
      const a = await getActivities();
      setActivities(a.slice(0, 14).reverse()); // last 14 days for display
    };
    load();
  }, []);

  const labels = activities.map((a) => new Date(a.date).toLocaleDateString().slice(0,5));
  const data = activities.map((a) => a.score);

  const screenWidth = Dimensions.get("window").width - 32;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Статистика</Text>
      {activities.length === 0 ? (
        <Text>Нет данных — добавьте активности в Tracker.</Text>
      ) : (
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data }]
          }}
          width={screenWidth}
          height={220}
          yAxisSuffix=""
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            propsForDots: { r: "4" },
            color: (opacity = 1) => `rgba(46,139,87, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`
          }}
          bezier
          style={{ borderRadius: 8 }}
        />
      )}
      <View style={{ height: 24 }} />
      <Text style={{ fontWeight: "700" }}>Средний за период: {activities.length ? Math.round(activities.reduce((s, a) => s + a.score, 0) / activities.length) : "-"}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "700", marginBottom: 10 }
});
