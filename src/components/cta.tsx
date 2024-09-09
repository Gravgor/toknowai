import { Button } from '@/components/ui/button'
import { RocketIcon } from '@radix-ui/react-icons'

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your AI Journey?</h2>
        <p className="text-xl text-purple-200 mb-8">Join thousands of students already learning with ToKnowAI</p>
        <Button size="lg" className="bg-white text-purple-900 hover:bg-white/90">
          <RocketIcon className="mr-2" /> Get Started Now
        </Button>
      </div>
    </section>
  )
}

export default CTA