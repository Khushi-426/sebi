import { create } from 'zustand'

export type Screen = 'landing' | 'ingest' | 'workspace'
export type StepId = 'base' | 'kyc' | 'eligibility' | 'synthesis' | 'gaps' | 'final'

export type ChatMsg = {
  id: number
  role: 'ai' | 'user'
  text: string
  callout?: { kind: 'warn' | 'ok'; text: string }
  quicks?: string[]
}

type State = {
  screen: Screen
  step: StepId
  crawlDone: boolean
  chat: ChatMsg[]
  typing: boolean
  toast: string | null
  goScreen: (s: Screen) => void
  goStep: (s: StepId) => void
  setCrawlDone: (b: boolean) => void
  pushChat: (m: Omit<ChatMsg, 'id'>) => void
  setTyping: (b: boolean) => void
  showToast: (t: string) => void
}

let cid = 100

export const useStore = create<State>((set) => ({
  screen: 'landing',
  step: 'base',
  crawlDone: false,
  chat: [],
  typing: false,
  toast: null,
  goScreen: (s) => set({ screen: s }),
  goStep: (s) => set({ step: s }),
  setCrawlDone: (b) => set({ crawlDone: b }),
  pushChat: (m) => set((st) => ({ chat: [...st.chat, { ...m, id: cid++ }] })),
  setTyping: (b) => set({ typing: b }),
  showToast: (t) => {
    set({ toast: t })
    setTimeout(() => set((st) => (st.toast === t ? { toast: null } : {})), 3200)
  },
}))
