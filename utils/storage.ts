// utils/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "user";
const ACTIVITIES_KEY = "activities";

export const saveUser = async (user: object) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async () => {
  const raw = await AsyncStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};

export const saveActivity = async (activity: any) => {
  const raw = await AsyncStorage.getItem(ACTIVITIES_KEY);
  const list = raw ? JSON.parse(raw) : [];
  list.unshift(activity); // add to start
  await AsyncStorage.setItem(ACTIVITIES_KEY, JSON.stringify(list));
  return list;
};

export const getActivities = async () => {
  const raw = await AsyncStorage.getItem(ACTIVITIES_KEY);
  return raw ? JSON.parse(raw) : [];
};
