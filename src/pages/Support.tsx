import { MessageCircle, Mail, Phone } from 'lucide-react';

const Support = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">Support Center</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Live Chat Support */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-6 rounded-2xl shadow-xl text-white flex flex-col items-center">
          <div className="flex items-center mb-4">
            <MessageCircle className="w-6 h-6 text-blue-400 mr-3 animate-pulse" />
            <h2 className="text-xl font-semibold">Live Chat</h2>
          </div>
          <p className="text-blue-100 mb-4 text-center">
            Get instant help from our support team through live chat.
          </p>
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-200">
            Start Chat
          </button>
        </div>
        {/* Email Support */}
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 p-6 rounded-2xl shadow-xl text-white flex flex-col items-center">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 text-green-400 mr-3 animate-pulse" />
            <h2 className="text-xl font-semibold">Email Support</h2>
          </div>
          <p className="text-green-100 mb-4 text-center">
            Send us an email and we'll respond within 24 hours.
          </p>
          <button className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-200">
            Send Email
          </button>
        </div>
        {/* Phone Support */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-6 rounded-2xl shadow-xl text-white flex flex-col items-center">
          <div className="flex items-center mb-4">
            <Phone className="w-6 h-6 text-purple-400 mr-3 animate-pulse" />
            <h2 className="text-xl font-semibold">Phone Support</h2>
          </div>
          <p className="text-purple-100 mb-4 text-center">
            Call us directly for immediate assistance.
          </p>
          <button className="w-full bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-200">
            Call Now
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const faqs = [
  {
    question: "How do I deposit funds?",
    answer: "You can deposit funds using various payment methods including credit/debit cards, bank transfers, and cryptocurrencies. Visit the Wallet page for more information."
  },
  {
    question: "What is the minimum withdrawal amount?",
    answer: "The minimum withdrawal amount varies depending on your chosen payment method. Please check the Wallet section for specific details."
  },
  {
    question: "How long do withdrawals take?",
    answer: "Withdrawal processing times vary by method. Crypto withdrawals are typically processed within 1 hour, while bank transfers may take 1-3 business days."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we use industry-standard encryption and security measures to protect your personal and financial information."
  }
];

export default Support;