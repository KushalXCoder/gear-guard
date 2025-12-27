"use client";

import { Wrench, Calendar, BarChart3, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {

  const features = [
    {
      icon: Wrench,
      title: "Equipment Tracking",
      description: "Centralize all your equipment data with comprehensive asset management and real-time status updates."
    },
    {
      icon: Users,
      title: "Work Centers",
      description: "Organize teams and resources efficiently with dedicated work center management and automated assignment."
    },
    {
      icon: Calendar,
      title: "Preventive Maintenance",
      description: "Schedule and track preventive maintenance with calendar-driven workflows to minimize downtime."
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "Make informed decisions with analytics on asset health, technician utilization, and maintenance trends."
    }
  ];

  const benefits = [
    "Automated request assignment and routing",
    "Role-based access control for security",
    "Kanban boards for visual workflow management",
    "Real-time equipment status tracking",
    "Comprehensive maintenance history",
    "Performance analytics and reporting"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-primary">


      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Unified Maintenance
            <span className="block text-blue-600">Management System</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Streamline equipment tracking, automate workflows, and gain data-driven insights 
            into asset health and team performance with GearGuard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2 text-lg font-semibold">
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition text-lg font-semibold">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built on Next.js with a modern tech stack for reliability and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition">
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Why Choose GearGuard?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Our full-stack solution eliminates the complexity of managing maintenance 
                operations across multiple tools and spreadsheets.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="text-4xl font-bold mb-2">98%</div>
                  <div className="text-blue-100">Uptime Achievement</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="text-4xl font-bold mb-2">40%</div>
                  <div className="text-blue-100">Reduction in Downtime</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="text-4xl font-bold mb-2">3x</div>
                  <div className="text-blue-100">Faster Request Resolution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Maintenance Operations?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join leading organizations using GearGuard to maximize asset performance
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold inline-flex items-center space-x-2">
            <span>Get Started Today</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Wrench className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-white">GearGuard</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2025 GearGuard. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}