import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { registerUser, loginUser } from '../api/auth';
import { logoutUser } from '../api/auth'

const useAuthStore = create(persist((set) => ({
    user: null,
    isAuthenticated: false,
    error: '',
    showModalLogin: false,

    setError: (value)=> set({error: value}),

    setShowModalLogin: ()=> set((state)=> ({showModalLogin: !state.showModalLogin})),

    setUser: (user) => set({ user }), // Actualización correcta del estado

    signUp: async ({ username, email, password, userImage }) => {
      try {
        // Lógica de registro de usuario
        await registerUser({ name: username, email, password, userImage });
      } catch (err) {
        set({error: err.response.data.error})
      }
    },

    login: async (values) => {
      try {
        const res = await loginUser(values);
        if (res.data.user) {
          set({ user: res.data.user, isAuthenticated: true });
        }
      } catch (err) {
        set({error: err.response.data.error})
      }
    },

    logout: async () => {
      await logoutUser()
      set({ user: null, isAuthenticated: false })
      window.location.replace('/')
    }
  }),
  {
    name: "AuthStorage",
    storage: createJSONStorage(()=> localStorage)
  }
));

export default useAuthStore;
