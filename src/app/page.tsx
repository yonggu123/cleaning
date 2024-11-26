import CleaningQuoteCalculator from '@/components/cleaning-quote-calculator'

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">청소 서비스 견적 계산기</h1>
        <CleaningQuoteCalculator />
      </div>
    </main>
  )
}