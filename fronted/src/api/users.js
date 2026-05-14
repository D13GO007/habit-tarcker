import axios from 'axios'
import api from './axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const BASE = '/api/users'

export const loginUser = (data) => axios.post(`${API_URL}${BASE}/login`, data)
export const registerUser = (data) => axios.post(`${API_URL}${BASE}`, data)
export const fetchUser = (userId) => api.get(`${BASE}/${userId}`)
export const buyItem = (userId, cost) => api.post(`${BASE}/${userId}/buy`, { cost })
export const cheatGold = (userId, amount = 1000) => api.post(`${BASE}/${userId}/cheat-gold`, { amount })
export const saveCharacterState = (userId, data) => api.put(`${BASE}/${userId}/character-state`, data)
export const usePotion = (userId, type) => api.post(`${BASE}/${userId}/use-potion`, { type })
export const fetchAchievements = (userId) => api.get(`${BASE}/${userId}/achievements`)
