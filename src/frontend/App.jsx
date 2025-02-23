import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [participation, setParticipation] = useState('参加')
  const [error, setError] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const eventDetails = {
    name: "宇美町",
    date: "2024年3月30日",
    time: "13:00 - 17:00"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('お名前を入力してください')
      return
    }

    setIsSending(true)
    try {
      const message = `
【宇美町イベント参加登録】
名前: ${name}
参加状況: ${participation}
イベント: ${eventDetails.name}
日時: ${eventDetails.date} ${eventDetails.time}
`.trim()

      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      })

      if (!response.ok) throw new Error('送信に失敗しました')

      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
      alert('送信が完了しました')
      setName('')
      setParticipation('参加')
      setError('')
    } catch (error) {
      console.error('送信エラー:', error)
      alert('送信に失敗しました。もう一度お試しください。')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {showConfetti && <Confetti />}
      <div className="max-w-md mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 mb-8 leading-tight"
          >
            {eventDetails.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl text-gray-600 space-y-2 font-light tracking-wide"
          >
            <p>{eventDetails.date}</p>
            <p>{eventDetails.time}</p>
          </motion.div>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="space-y-12 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl"
        >
          <div className="space-y-10">
            <motion.div className="relative group">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="お名前"
                  className="w-full px-8 py-8 bg-white/30 rounded-3xl border-2 border-gray-100 focus:border-gray-200 focus:ring-0 transition-all duration-300 text-2xl placeholder-gray-400 shadow-lg backdrop-blur-sm"
                  required
                />
              </div>
              {error && (
                <p className="absolute -bottom-6 left-0 text-red-500 text-sm mt-1 pl-2">{error}</p>
              )}
            </motion.div>

            {/* ボタンのデザイン修正 */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 px-2 w-full"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {['参加', '途中参加', '不参加'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setParticipation(option)}
                  className={`relative w-full sm:min-w-[100px] py-4 px-6 rounded-full text-lg font-medium transition-all duration-300 border-2 ${
                    participation === option
                      ? 'border-gray-400 text-gray-700 transform scale-105 shadow-md'
                      : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:scale-105 hover:shadow-sm'
                  }`}
                >
                  {option}
                </button>
              ))}
            </motion.div>
          </div>

          <motion.button
            type="submit"
            disabled={isSending}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-bold py-5 px-8 rounded-2xl shadow-xl transition-all duration-300 text-lg ${
              isSending 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-2xl hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600'
            }`}
          >
            {isSending ? '送信中...' : '送信する'}
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}

export default App
