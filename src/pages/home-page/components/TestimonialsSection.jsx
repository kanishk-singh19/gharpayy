import React from 'react';
import TestimonialCard from './TestimonialCard';
import Icon from '../../../components/AppIcon';


const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      designation: "Software Engineer",
      location: "Bangalore",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      review: `Moving to Bangalore for my first job was scary, but GharPayy made finding a safe PG so easy! The verification process gave me confidence, and the PG I chose exceeded my expectations. The amenities were exactly as described, and the community of girls here is amazing.`,
      pgName: "Sunrise PG for Girls",
      stayDuration: "Stayed for 8 months",
      isVerified: true
    },
    {
      id: 2,
      name: "Rahul Gupta",
      designation: "Marketing Executive",
      location: "Mumbai",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      review: `As someone who relocated from Delhi to Mumbai, I was worried about finding affordable accommodation. GharPayy's search filters helped me find the perfect PG within my budget. The booking process was seamless, and the PG owner was very cooperative.`,
      pgName: "Green Valley Co-living",
      stayDuration: "Stayed for 1 year",
      isVerified: true
    },
    {
      id: 3,
      name: "Sneha Patel",
      designation: "MBA Student",
      location: "Pune",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 4,
      review: `The detailed photos and honest reviews on GharPayy helped me make an informed decision. The PG I chose had all the amenities I needed for my studies. The 24/7 security and meal facility made my parents feel secure about my stay.`,
      pgName: "Scholar\'s Den PG",
      stayDuration: "Stayed for 6 months",
      isVerified: true
    },
    {
      id: 4,
      name: "Arjun Singh",
      designation: "Data Analyst",
      location: "Hyderabad",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      rating: 5,
      review: `GharPayy's customer support was exceptional throughout my booking journey. They helped me resolve all my queries quickly. The PG I booked had excellent WiFi connectivity, which was crucial for my work-from-home setup.`,
      pgName: "Urban Nest Co-living",
      stayDuration: "Stayed for 10 months",
      isVerified: true
    },
    {
      id: 5,
      name: "Kavya Reddy",
      designation: "Graphic Designer",
      location: "Chennai",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg",
      rating: 5,
      review: `The transparency in pricing and no hidden charges policy of GharPayy impressed me. The PG I selected had a great creative community, and I made lifelong friends here. The location was perfect with easy access to my office.`,
      pgName: "Creative Hub PG",
      stayDuration: "Stayed for 7 months",
      isVerified: true
    },
    {
      id: 6,
      name: "Vikram Joshi",
      designation: "Financial Analyst",
      location: "Delhi",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 4,
      review: `The advanced search filters on GharPayy saved me so much time. I could filter by budget, amenities, and even commute distance to my office. The PG I chose had excellent meal quality and housekeeping services.`,
      pgName: "Metro Boys Hostel",
      stayDuration: "Stayed for 9 months",
      isVerified: true
    }
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            What Our Residents Say
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real experiences from thousands of young professionals who found their perfect home through GharPayy.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="Shield" size={16} />
            All reviews are verified from actual residents
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;