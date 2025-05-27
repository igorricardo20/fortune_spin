import React from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';

const Support = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Support Center</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Live Chat Support */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <MessageCircle className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold">Live Chat</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Get instant help from our support team through live chat.
          </p>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200">
            Start Chat
          </button>
        </div>

        {/* Email Support */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 text-green-500 mr-3" />
            <h2 className="text-xl font-semibold">Email Support</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Send us an email and we'll respond within 24 hours.
          </p>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-200">
            Send Email
          </button>
        </div>

        {/* Phone Support */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Phone className="w-6 h-6 text-purple-500 mr-3" />
            <h2 className="text-xl font-semibold">Phone Support</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Call us directly for immediate assistance.
          </p>
          <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition duration-200">
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