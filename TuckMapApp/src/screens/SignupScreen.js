/* SignupScreen.js – React Native (Expo / bare RN) */

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import axios from "axios";

const BASE_URL = "http://192.168.195.184:5000/api/auth"; // 👈 your LAN IP + port

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ----------------- helpers ----------------- */
  const isEmail = (x) => /\S+@\S+\.\S+/.test(x.trim());

  const toast = (title, msg) => Alert.alert(title, msg);

  /* ----------------- API calls ---------------- */
  const sendOtp = async () => {
    if (!name || !email) return toast("Error", "Enter name & email first.");
    if (!isEmail(email)) return toast("Invalid Email", "Enter a valid email.");

    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/send-otp`, { email });
      setLoading(false);

      if (data.message) toast("OTP Sent", "Check your mailbox.");
      setOtpSent(true);
    } catch (err) {
      setLoading(false);
      toast("Error", err.response?.data?.message || "OTP send failed.");
      console.log(err.response?.data || err);
    }
  };

  const register = async () => {
    if (!otp || !password || !confirmPassword)
      return toast("Error", "Fill OTP & password fields.");
    if (password !== confirmPassword)
      return toast("Password Mismatch", "Passwords do not match.");

    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/register`, {
        name,
        email,
        otp,
        password,
      });
      setLoading(false);

      if (data.success) {
        toast("Success", "Account created!",);
        navigation.navigate("Login");
      } else {
        toast("Failed", data.message || "Try again.");
      }
    } catch (err) {
      setLoading(false);
      toast("Error", err.response?.data?.message || "Registration failed.");
      console.log(err.response?.data || err);
    }
  };

  /* --------------------- UI ------------------- */
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Create Your Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {!otpSent && (
            <TouchableOpacity style={styles.button} onPress={sendOtp} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? "Sending..." : "Send OTP"}</Text>
            </TouchableOpacity>
          )}

          {otpSent && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={register}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Registering..." : "Verify & Register"}
                </Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* -------------------- styles ------------------ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f9fc" },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 28,
    color: "#222",
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3478f6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 18,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "bold" },
  loginText: { color: "#666", textAlign: "center", fontSize: 15 },
  loginLink: { color: "#3478f6", fontWeight: "600" },
});
