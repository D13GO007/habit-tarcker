import api from './axios'

const BASE = '/api/habits'

export const getHabits = (userId) => api.get(`${BASE}/user/${userId}`)
export const createHabit = (data) => api.post(BASE, data)
export const updateHabit = (id, data) => api.put(`${BASE}/${id}`, data)
export const completeHabit = (id, userId) => api.put(`${BASE}/${id}/complete`, { userId })
export const failHabit = (id, userId) => api.put(`${BASE}/${id}/fail`, { userId })
export const deleteHabit = (id) => api.delete(`${BASE}/${id}`)
export const getHistory = (userId) => api.get(`${BASE}/history/${userId}`)
