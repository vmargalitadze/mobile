import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { auth, db } from '../config/firebase';
import { registerSchema } from '../config/validation';
import { signUp } from '../services/auth';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleRegister = async () => {
    const result = registerSchema.safeParse({ name, email, password, confirmPassword });
    if (!result.success) {
      const errorMessages = result.error.issues.map(issue => issue.message);
      setErrors(errorMessages);
      return;
    }

    setErrors([]);
    setLoading(true);

    try {
      const { user, error } = await signUp(email, password);
      if (error) {
        setErrors([error]);
      } else if (user) {

        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          createdAt: new Date(),
        });


        await signOut(auth);


        setTimeout(() => {
          router.replace('/login');
        }, 300);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors(['An unexpected error occurred.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        {errors.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            {errors.map((err, idx) => (
              <Text key={idx} style={{ color: 'red', fontSize: 14 }}>{err}</Text>
            ))}
          </View>
        )}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#000' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 40, color: '#666' },
  form: { width: '100%' },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 15,
    marginBottom: 15, fontSize: 16, backgroundColor: '#f9f9f9'
  },
  button: {
    backgroundColor: '#000', padding: 15, borderRadius: 8,
    alignItems: 'center', marginTop: 10,
  },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: '#666', fontSize: 14 },
  linkText: { color: '#000', fontSize: 14, fontWeight: 'bold' },
});
